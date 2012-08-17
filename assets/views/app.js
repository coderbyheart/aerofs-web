define([ 'events', 'vm', 'views/menu' ], function(Events, Vm, MenuView) {
	return Backbone.View.extend({
		el : $('#app'),
		render : function() {
			Vm.create(this, 'mainmenu', MenuView);
		}
	});
});