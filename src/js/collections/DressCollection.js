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

        numDisliked: 0



    });

  });