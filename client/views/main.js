var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.body,
  autoRender: true,
  events: {
    'click a[href]': 'handleLinkClick'
  },
  initialize: function(){
    this.listenTo(app.router, 'page', this.handleNewPage);
  },

  render: function(){
    this.renderWithTemplate();
    //instantiate a view switcher, passing it <main> element
    this.pages = new ViewSwitcher(this.queryByHook('page-container'));
  },

  handleNewPage: function(page){
    this.pages.set(page);
  },

  handleLinkClick: function(e){
    var linkTag = e.target;
    if(linkTag.host == window.location.host) {
      //this is a local click
      app.router.history.navigate(linkTag.pathname, {trigger: true});
      e.preventDefault();
    }
  }
});