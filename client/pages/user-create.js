var View = require('ampersand-view');
var templates = require('../templates');
var UserForm = require('../forms/user');

module.exports = View.extend({
  template: templates.pages['user-create'], 
  subviews: {
  	form: {
  	  hook: 'user-form',
  	  prepareView: function(el) {
  	  	return new UserForm({
  	  		el: el, 
  	  		submitCallback: function(data) {
  	  		  app.persons.create(data, {
              success: function() {
                app.navigate('/users');
              }
            });
  	  		}
  	  	});
  	  }
  	}
  }
});