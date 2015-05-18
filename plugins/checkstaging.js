var moment = require('moment');

var checkStaging = function(cb) {
	var self = this,
		CheckStaging = this.getCheckStaging();
	
	var sendMessage = function(user, userCreatedAt) {
		var now = new Date();
		var lastKnown = new Date(moment(userCreatedAt).format());
		var diffHours = Math.abs(now - lastKnown) / 36e5;
		
		if( diffHours > 2 ) {
			cb(null, '@' +user + ' is the last known person and it has been more than 2 hours, if the person hasn not responded please go ahead and switch it');
		} else {
			cb(null, '@' + user + ', is the last known person on staging and it has been ' + diffHours + ' hour(s)');
		}

	};
	
	CheckStaging.findOne(function(err, record) {
		if (err) return console.error(err);

		if(record) {
			record.user = self.user.id;
			record.createdAt = new Date();
			record.save();
			sendMessage(record.user, record.createdAt);
		} else {
			new CheckStaging({
				user: self.user.id
			}).save(function(err) {				
				if (err) return console.error(err);
				cb(null, 'It is ok to switch');
			});
		}	

	});
	
}


exports.checkStaging = checkStaging;
