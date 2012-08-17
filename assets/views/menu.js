define(
		[ 'vm', 'views/menu/group', 'models/menu/group',
				'collections/menu/group', 'models/menu/item',
				'collections/menu/item' ], function(Vm, MenuGroupView,
				MenuGroup, MenuGroupCollection, MenuItem, MenuItemCollection) {
			return Backbone.View.extend({
				el : '#mainmenu',
				initialize : function() {
					this.model = new MenuGroupCollection();
					this.model.bind("change", this.render, this);

					var leftMenuItems = new MenuItemCollection();
					leftMenuItems.add(new MenuItem({
						id : 'map',
						label : 'Karte',
						'icon' : 'icon-flag icon-white',
						authOnly : true
					}));
					leftMenuItems.add(new MenuItem({
						href : 'https://github.com/tacker/aerofs-web',
						label : 'Quellcode',
						'icon' : 'icon-gift icon-white'
					}));
					var leftGroup = new MenuGroup({
						'align' : 'left',
						children : leftMenuItems
					});
					this.model.add(leftGroup);
				},
				render : function() {
					$(this.el).empty();
					_.each(this.model.models, function(menuGroup) {
						$(this.el).append(new MenuGroupView({
							model : menuGroup
						}).render().el)
					}, this);
					return this;
				}
			});
		});