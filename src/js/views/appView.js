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
  'views/detailView',
  'views/cardsView',
  'views/menuView',
  'collections/DressCollection',
  'router',
  'dataManager',
  'jquery_ui_touch_punch'
  ], 
  function(jQuery, imagesLoaded, Isotope, Analytics, _, Backbone, templates, config, MenuModel, detailView, CardsView, MenuView, DressCollection, router, dataManager) {

  return Backbone.View.extend({
    el: ".iapp-page-wrap",
    events: {
      
      // "click .iapp-filter-button": "setFilter",
      // "click .iapp-filter-button-clear": "clearFilters"
    },

    initialize: function() {

      // this.listenTo(router, "highlight", this.onHighlightRoute);
      // this.listenTo(router, "homeRoute", this.onHomeRoute);
      this.listenTo(Backbone, 'data:ready', this.onDataReady);
      this.render();
      
    },


    onHighlightRoute: function(id) {
      if (this.collection.toJSON().length === 0) {
       this.collection.once("reset", function() {
          var detailModel = _.find(this.collection.models, function(model) {
            return model.get("rowNumber") == id;
          });
          detailModel.set({"highlight": true});
        }, this);
      } else {
        var detailModel = _.find(this.collection.models, function(model) {
          return model.get("rowNumber") == id;
        });
        detailModel.set({"highlight": true});
      }
    },

    

    template: templates["app-view.html"], 

    render: function() {
      this.$el.html(this.template({}));
      
    },

    addSubViews: function() {
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
    }
    
  });

});