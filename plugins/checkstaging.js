var moment = require('moment');

var checkStaging = function(cb) {
	var self = this,
		mongoose = this.getMongoose();
	var CheckStagingSchema = mongoose.Schema({
		user: String,
		createdAt: { type: Date, default: Date.now }
	});

	var CheckStaging = mongoose.model('CheckStaging', CheckStagingSchema);
	
	CheckStaging.findOne(function(err, record) {
		if (err) return console.error(err);
		var currentUser = record;
		if(record) {
			record.user = self.user.id;
			record.createdAt = new Date();
			record.save();
		} else {
			var lastPersonMentionedStaging = new CheckStaging({
				user: self.user.id
			}).save(function(err, lastPersonMentionedStaging) {				
				if (err) return console.error(err);
				currentUser = lastPersonMentionedStaging;
			});
		}
		
		var now = new Date();
		var lastKnown = new Date(moment(currentUser.createdAt).format());
		var diffHours = Math.abs(now - lastKnown) / 36e5;
		
		if( diffHours > 2 ) {
			cb(null, '@' +record.user + ' is the last known person and it has been more than 2 hours, if the person hasn not responded please go ahead and switch it');
		} else {
			cb(null, '@' + record.user + ', is the last known person on staging and it has been ' + diffHours + ' hour(s)');
		}
		

	});
	
}


exports.checkStaging = checkStaging;
