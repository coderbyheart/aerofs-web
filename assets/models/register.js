define([ 'remote' ], function(Remote) {
	return Backbone.Model.extend({
		urlRoot : Remote.apiUrlBase + 'register',
		defaults : {
			email : '',
		}
	});
});