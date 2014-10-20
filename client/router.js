var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var UserListPage = require('./pages/user-list');
var UserViewPage = require('./pages/user-view');
var UserCreatePage = require('./pages/user-create');
var UserEditPage = require('./pages/user-edit');

module.exports = Router.extend({
  routes: {
    '': 'home',
    'users': 'users',
    'users/create': 'userCreate',
    'users/:id': 'userView', 
    'users/:id/edit': 'userEdit'
  },

  home: function() {
    this.trigger( 'page', new HomePage() );
  },

  users: function() {
    this.trigger( 'page', new UserListPage({
      //comment out if want to do the render subviews thing in user-list.js
      collection: app.persons
    }) );
  }, 

  userView: function(id) {
    this.trigger('page', new UserViewPage({
      id: Number(id), 
      collection: app.persons
    }))
  }, 

  userCreate: function() {
    this.trigger('page', new UserCreatePage());
  }, 

  userEdit: function(id) {
    this.trigger('page', new UserEditPage({
      id: Number(id), 
      collection: app.persons
    }));
  }
});