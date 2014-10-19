var View = require('ampersand-view');
var templates = require('../templates');
var UserView = require('../views/user')
//uncomment to use subviews
//var CollectionView = require('ampersand-collection-view');

module.exports = View.extend({
  template: templates.pages.users,
  initialize: function() {
  	// comment to use subviews
  	this.collection.fetch();
  	// if we want to use subviews, uncomment: 
  	// app.persons.fetch();
  	// var self = this;
  	// setTimeout(function() {
  	// 	self.collection = app.persons;
  	// }, 2000);
  },
  autoRender: true,
  //uncomment to use subviews, if not sure that the data will be retrieved when we get here
  // subviews: {
  // 	users: {
  // 		waitFor: 'collection',
  // 		hook: 'user-list',
  // 		prepareView: function(el) {
  // 			return new CollectionView({
  // 				el: el,
  // 				collection: this.collection,
  // 				view: UserView
  // 			})
  // 		}
  // 	}
  // }, 
  //comment out if we want to use subviews to render
  render: function() {
  	this.renderWithTemplate();
  	this.renderCollection(this.collection, UserView, this.queryByHook('user-list'))
  }
});