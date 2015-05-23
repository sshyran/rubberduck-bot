var request = require('request'),
    Promise = require('promise');


var getSpeed = function(strategy) {
	var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=http%3A%2F%2Ffusion.net&strategy='+ strategy + '&fields=ruleGroups&key=AIzaSyCvwmlzu3wKrFkv53fuGv4LEREVm9LtsBI'
	return new Promise(function(resolve, reject) {
		request.get(url, function (error, response, body) {
			if(error) reject(error);
			
			console.log(body);
			resolve(JSON.parse(body).ruleGroups.SPEED.score);
		});
	});
};

var pagespeed = function(cb) {
	Promise.all([getSpeed('desktop'), getSpeed('mobile')]).then(function(speed) {
		var desktop = speed[0];
		var mobile = speed[1];
		
		cb(null, 'desktop speed is ' + desktop + ' and mobile speed is ' + mobile);
	}).catch(function(error) {
		console.log(error);
	});
};

exports.pagespeed = pagespeed;


