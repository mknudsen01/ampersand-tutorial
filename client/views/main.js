var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var dom = require('ampersand-dom');
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
    this.updateActiveNav();
  },

  handleLinkClick: function(e){
    var linkTag = e.target;
    if(linkTag.host == window.location.host) {
      //this is a local click
      app.router.history.navigate(linkTag.pathname, {trigger: true});
      e.preventDefault();
    }
  },

  updateActiveNav: function(){
    var pathname = window.location.pathname;
    var homeLinkTag = this.query('.navbar-header a');
    this.queryAll('nav a').forEach(function (linkTag){
      var parent = linkTag.parentNode;
      if( pathname.indexOf(linkTag.pathname) === 0){
        dom.addClass(parent,'active');
      } else {
        dom.removeClass(parent, 'active');
      }
    });
    if (pathname !== homeLinkTag.pathname ){
      dom.removeClass(homeLinkTag.parentNode, 'active');
    }
  }
});