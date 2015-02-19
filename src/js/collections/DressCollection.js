  // Questions Collection
  // ---------------

define([
    "jquery",
    "underscore",
    "backbone",
    'models/dressModel',
], function($, _, Backbone, dressModel) {

   

    // The collection of questions is backed by json file
    return Backbone.Collection.extend({

      initialize: function() {

        this.listenTo(Backbone, "filters:update", this.onFilterUpdate);
        this.on('change:isLiked', this.onLikedChange);
        this.on('change:isDisliked', this.onDislikedChange);
        this.listenTo(Backbone, 'route:like', this.onRouteLike);
        this.listenTo(Backbone, 'route:dislike', this.onRouteDislike);
        this.listenTo(Backbone, 'route:both', this.onRouteBoth);
        this.listenTo(Backbone, 'app:reset', this.onResetApp);
      },

      // Reference to this collection's model.
      model: dressModel,

      onFilterUpdate: function(filterArray) {
           this.filterByTagArray(filterArray);
           var availableTags = this.getAvailableTags();
           Backbone.trigger("items:filtered", availableTags);
      },

      filterByTagArray: function(filterArray) {
            function arrContains(array1, array2) {
                var diff = _.difference(array1, array2);
                if (diff.length === 0) {
                    return true;
                } else {
                    return false;
                }
            }

            this.each(function(model) {
                var modelTags = model.get('tags');
                var isAvailable = arrContains(filterArray, modelTags);

                if (isAvailable) {
                    model.set({'isAvailable': true});
                } else {
                    model.set({'isAvailable': false});
                }
            });

            //cache a copy of filtered vids
            this._availableItems = this.where({'isAvailable': true});

        },

        getAvailableTags: function() {
            availableTags = [];

            _.each(this._availableItems, function(model) {
                availableTags = _.union(availableTags, model.get('tags'));
            });
            return availableTags;
        },

        onLikedChange: function() {
          
          var liked = this.filter(function(model) {
            return model.get('isLiked');
          });
          
          this.numLiked = liked.length;

          Backbone.trigger('liked:update', liked);
        },

        onDislikedChange: function() {
          var disliked = this.filter(function(model) {
            return model.get('isDisliked');
          });
          
          this.numDisliked = disliked.length;

          Backbone.trigger('disliked:update', disliked);
        },

        numLiked: 0,

        numDisliked: 0,

        onRouteLike: function(likestring) {
          
          
          var uidArray = likestring.split('-');
          var filteredModels = this.filter(function(model) {
            return _.contains(uidArray, model.get('uid'));
          });

          _.each(filteredModels, function(model) {
            model.like();
          });
        },

        onRouteDislike: function(dislikestring) {
          
          
          var uidArray = dislikestring.split('-');
          var filteredModels = this.filter(function(model) {
            return _.contains(uidArray, model.get('uid'));
          });

          _.each(filteredModels, function(model) {
            model.dislike();
          });
        },

        onRouteBoth: function(likestring, dislikestring) {
         
          
          var likeuidArray = likestring.split('-');
          var likefilteredModels = this.filter(function(model) {
            return _.contains(likeuidArray, model.get('uid'));
          });

          _.each(likefilteredModels, function(model) {
            model.like();
          });

           var dislikeuidArray = dislikestring.split('-');
          var dislikefilteredModels = this.filter(function(model) {
            return _.contains(dislikeuidArray, model.get('uid'));
          });

          _.each(dislikefilteredModels, function(model) {
            model.dislike();
          });
        },

        onResetApp: function() {
          this.each(function(dressModel) {
            dressModel.unlike();
            dressModel.undislike();
          });
        }



    });

  });