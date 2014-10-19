var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.pages.userView,
  initialize: function(spec) {
    var self = this;
    this.collection.getOrFetch(spec.id, function(err, model) {
      if(err) throw err;
        self.model = model;
    })
  },
  bindings: {
    'model.avatarUrl': {
      type: 'attribute',
      name: 'src', 
      hook: 'user-avatar'
    }, 
    'model.fullName': {
      type: 'text',
      hook: 'user-name'
    }
  },
  autoRender: true,
  render: function() {
  	this.renderWithTemplate();
  }
});