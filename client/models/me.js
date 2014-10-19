var Model = require('ampersand-model');

module.exports = Model.extend({
  url: '/api/me',
  initialize: function() {
    this.fetch();
  },
  props: {
    id: 'number',
    givenName: 'string',
    familyName: 'string',
    email: 'string'
  },
  derived: {
    fullName: {
      deps: ['givenName', 'familyName'],
      fn: function() {
        if(!this.givenName) return '';
        return this.givenName + ' ' + this.familyName;
      }
    }
  }
});