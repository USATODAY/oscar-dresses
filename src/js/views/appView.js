define([
  'jquery',
  'imagesloaded',
  'isotope',
  'analytics',
  'underscore',
  'lib/BackboneRouter',
  'templates',
  'models/config',
  'models/menuModel',
  'models/shareModel',
  'views/detailView',
  'views/cardsView',
  'views/menuView',
  'views/shareView',
  'collections/DressCollection',
  'router',
  'dataManager',
  'jquery_ui_touch_punch'
  ], 
  function(jQuery, imagesLoaded, Isotope, Analytics, _, Backbone, templates, config, MenuModel, ShareModel, detailView, CardsView, MenuView, ShareView, DressCollection, router, dataManager) {

  return Backbone.View.extend({
    el: ".iapp-page-wrap",
    events: {
      
      // "click .iapp-filter-button": "setFilter",
      // "click .iapp-filter-button-clear": "clearFilters"
    },

    initialize: function() {

      this.listenTo(Backbone, 'route:share', this.onRouteShare);
      this.listenTo(Backbone, 'data:ready', this.onDataReady);
      this.listenTo(Backbone, 'app:reset', this.onAppReset);
      this.render();
      
    },
    

    template: templates["app-view.html"], 

    render: function() {
      this.$el.html(this.template({}));
      
    },

    addSubViews: function() {
      this.shareModel = new ShareModel();
      this.shareView = new ShareView({model: this.shareModel});
      this.menuView = new MenuView({model: new MenuModel()});
      this.dressCollection = new DressCollection(dataManager.data.dresses); 
      this.cardsView = new CardsView({collection: this.dressCollection});
      Backbone.history.start();
    },

    onDataReady: function() {
      this.addSubViews();
    },

    onMenuClick: function() {
      Backbone.trigger('menu:show');
    },

    onRouteShare: function() {
      this.$el.addClass('iapp-share-route');
    },

    onAppReset: function() {
      this.$el.removeClass('iapp-share-route');
    }
    
  });

});