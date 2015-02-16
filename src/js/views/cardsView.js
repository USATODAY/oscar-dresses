define([
  'jquery',
  'imagesloaded',
  'isotope',
  'analytics',
  'underscore',
  'lib/BackboneRouter',
  'templates',
  'models/tags',
  'models/config',
  'views/cardView',
  'views/detailView',
  'router',
  'jquery_ui_touch_punch'
  ], 
  function(jQuery, imagesLoaded, Isotope, Analytics, _, Backbone, templates, tags, config, cardView, detailView, router) {

  return Backbone.View.extend({
    el: "#card-wrap",
    events: {
  
    },

    initialize: function() {
      // this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'change', this.showDetail);
      this.listenTo(router, "highlight", this.onHighlightRoute);
      this.listenTo(router, "homeRoute", this.onHomeRoute);
      this.listenTo(Backbone, "filters:update", this.filter);
      this.render();
      
    },

    addOne: function(question) {
      var view = new cardView({model: question});
      this.$el.append(view.render().el);
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

    onHomeRoute: function() {
       var highlightModel = _.find(this.collection.models, function(model) {
         return model.get("highlight") === true;
       });
       if (highlightModel) {
        highlightModel.set({"highlight": false});
       }
    },
    showDetail: function(model) {

      if(model.get("highlight")) {
        this.detailView =  new detailView({model: model});

        $(".iapp-page-wrap").append(this.detailView.render().el);
        
      }

      

    },

    // template: templates["cards-view.html"], 

    render: function() {
      this.$el.empty();
      this.collection.each(this.addOne, this);
      
      var $el = this.$el;
      
      $el.imagesLoaded( function() {
        $el.isotope( {
          itemSelector: '.card',
          transitionDuration: (!config.isMobile) ? '0.4s' : 0,
          // layoutMode: 'fitRows'
        });
        $el.isotope("on", "layoutComplete", function(iso) {
          if (iso.filteredItems.length === 0) {
            if ($(".iapp-no-results-wrap").length === 0) {
              $el.after("<div class='iapp-no-results-wrap'><h3>You think a movie like that exists? Try again.</h3></div>");
            }
          } else {
            $(".iapp-no-results-wrap").remove();
          }
        });
      });
    },

    $cardWrap: {},

    addAll: function() {
      
    },

    removeHighlight: function() {
      Analytics.click("closed card");
     this.detailView.model.set({"highlight": false});
    },
    addTimeStamp: function() {
      var objData = this.collection.toJSON();
      this.$el.find(".time-stamp").html(objData[0].timestamp);
    },

    filter: function(filterArray) {
      console.log('filter');
      console.log(filterArray);

      
        filterArray = _.map(filterArray, function(filter) {
          return '.' + filter;
        });
        var filterStr = filterArray.join('');
       
        console.log(filterStr);
      this.$el.isotope({ filter: filterStr });
    },

    setFilter: function(e) {
      var $target = $(e.target);
      var newFilter = "." + $target.attr("data-filter");
      if (_.contains(this.currentFilter, newFilter)) {
        $target.removeClass("iapp-selected");
        this.currentFilter = _.without(this.currentFilter, newFilter);
      } else {
        
        $target.addClass("iapp-selected");

        this.currentFilter.push(newFilter);
        
      }
      var filterStr = "";
        _.each(this.currentFilter, function(filter) {
          filterStr += filter;
        });
      this.$el.isotope({ filter: filterStr });


      if (this.currentFilter.length > 0) {
          this.$el.find(".iapp-filter-button-clear").addClass("show");
        } else {
          this.$el.find(".iapp-filter-button-clear").removeClass("show");
        }   
    },
    clearFilters: function(e) {
      this.currentFilter = [];
      this.$el.find(".iapp-filter-button-clear").removeClass("show");
      this.$el.find(".iapp-filters-wrap").find(".iapp-filter-button").removeClass("iapp-selected");
      this.$el.isotope({ filter: "" });
    }
  });

});