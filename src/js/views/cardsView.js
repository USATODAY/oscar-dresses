define([
  'jquery',
  'imagesloaded',
  'isotope',
  'analytics',
  'underscore',
  'lib/BackboneRouter',
  'templates',
  'models/config',
  'views/cardView',
  'views/detailView',
  'router',
  'unveil',
  'jquery_ui_touch_punch'
  ], 
  function(jQuery, imagesLoaded, Isotope, Analytics, _, Backbone, templates, config, cardView, detailView, router) {

  return Backbone.View.extend({
    el: ".iapp-card-wrap",
    
    events: {
  
    },

    initialize: function() {
      this.listenTo(this.collection, 'change:highlight', this.showDetail);
      this.listenTo(this.collection, 'change:isLiked', this.sortByLiked);
      this.listenTo(this.collection, 'change:isDisliked', this.sortByLiked);
      this.listenTo(router, "homeRoute", this.onHomeRoute);
      this.listenTo(Backbone, "filters:update", this.filter);
      this.listenTo(Backbone, 'menu:show', this.onMenuShow);
      this.listenTo(Backbone, 'menu:hide', this.onMenuHide);
      this.listenTo(Backbone, 'route:share', this.onRouteShare);
      this.listenTo(Backbone, 'app:reset', this.onAppReset);
      this.render();

    },

    addOne: function(question) {
      var view = new cardView({model: question});
      this.$el.append(view.render().el);
    },

    showDetail: function(model) {
      if(model.get('highlight')) {
        this.detailView =  new detailView({model: model});
        this.$el.append(this.detailView.render().el);
      }
      
    },

    render: function() {
      this.$el.empty();
      this.collection.each(this.addOne, this);
      this.$el.addClass('iapp-card-wrap-full-width');
      
      var $el = this.$el;
      var _this = this;
      $el.isotope( {
          itemSelector: '.card',
          transitionDuration: (!config.isMobile) ? '0.5s' : 0,
          getSortData: {
            liked: function(itemElem) {
              if (jQuery(itemElem).hasClass('iapp-liked')) {
                return 'liked';
              } else {
                return 'not-liked';
              }
            }
          }
        });
      
      $el.imagesLoaded( function() {
        _this.relayout();
        _this.unveilImages();
    
      });
    },

    unveilImages: function() {

      var _this = this;

      this.$('.cover-img').unveil(500, function() {
        $(this).imagesLoaded(function() {
          _this.relayout();
        });
      });
    }, 

    removeHighlight: function() {
      Analytics.click("closed card");
     this.detailView.model.set({"highlight": false});
    },

    filter: function(filterArray) {
          
        filterArray = _.map(filterArray, function(filter) {
          return '.' + filter;
        });
        var filterStr = filterArray.join('');
        this.$el.isotope({ filter: filterStr });
        _.delay(function() {
          $(window).trigger('scroll');
        }, 1000);

        _.delay(function() {
          $(window).trigger('scroll');
        }, 2000);
    },

    relayout: _.throttle(function() {
      this.$el.isotope('layout');
      _.delay(function() {
          $(window).trigger('scroll');
        }, 1000);
    }, 500),

    clearFilters: function(e) {
      this.currentFilter = [];
      this.$el.find(".iapp-filter-button-clear").removeClass("show");
      this.$el.find(".iapp-filters-wrap").find(".iapp-filter-button").removeClass("iapp-selected");
      this.$el.isotope({ filter: "" });
    },

    onMenuShow: function() {
      this.$el.removeClass('iapp-card-wrap-full-width');
      this.relayout();
    },

    onMenuHide: function() {
      this.$el.addClass('iapp-card-wrap-full-width');
      this.relayout();
    },

    sortByLiked: function() {

      this.$el.isotope('updateSortData').isotope({sortBy: 'liked'});

    },

    onRouteShare: function() {
      var _this = this;
      _.defer(function() {
        _this.$el.isotope({filter: '.iapp-liked, .iapp-disliked'});
        _this.sortByLiked();
      });
    },

    onAppReset: function() {
      this.clearFilters();
      this.relayout();
    }
  });

});