define(
		[ 'views/page/base', 'models/register', 'text!templates/page/home.html' ],
		function(PageViewBase, Model, PageTemplate) {
			return PageViewBase.extend({
				template : PageTemplate,
				initialize : function() {
					this.model = new Model();
				},
				events : {
					'submit form' : 'submitForm',
				},
				render : function() {
					$(this.el).html(this.template);
					return this;
				},
				submitForm : function(ev) {
					ev.preventDefault();
					var form = $(this.el).find('form');
					form.addClass('hidden');
					$('#progress').removeClass('hidden');
					this.model.save({
						'email' : $('#email').attr('value')
					}, {
						success : function(model) {
							$('#progress').addClass('hidden');
							$('#success').removeClass('hidden');
						},
						error : function(ev) {
							$('#progress').addClass('hidden');
							$('#error').removeClass('hidden');
						}
					});
				}
			});
		});