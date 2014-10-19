var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
	template: templates.includes.user,
	bindings: {
		'model.fullName': {
			type: 'text', 
			hook: 'user-name'
		}, 
		'model.viewUrl': {
			type: 'attribute',
			name: 'href',
			hook: 'action-view-user'
		}
	}, 
	events: {
		'click [data-hook=action-delete-user]': 'handleDeleteClick'
	}, 

	handleDeleteClick: function() {
		this.model.destroy();
	}
})