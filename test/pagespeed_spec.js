var perfModule = require('../plugins/pagespeed'),
    sinon = require('sinon'),
    request = require('request'),
    expect = require('expect.js');

describe('Performance', function() {
	var server;
	beforeEach(function(done) {
		sinon.stub(request, 'get').yields(null, null, JSON.stringify({ruleGroups : { SPEED: {score:10}} }));
		done();
	});

	it('should send performance stats to chat room', function(done) {
		perfModule.pagespeed(function(donotknow, msg) {
			done();
			expect(msg).to.eql('desktop speed is 10 and mobile speed is 10');
		});
	});
});
