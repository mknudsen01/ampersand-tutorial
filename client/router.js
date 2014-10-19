var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var UserListPage = require('./pages/user-list');

module.exports = Router.extend({
  routes: {
    '': 'home',
    'users': 'users'
  },

  home: function(){
    this.trigger( 'page', new HomePage() );
  },

  users: function(){
    this.trigger( 'page', new UserListPage({
      //comment out if want to do the render subviews thing in user-list.js
      collection: app.persons
    }) );
  }
});