define(
  [
    'jquery',
    'underscore',
    'backbone',
    'models/TagModel'
  ], function(jQuery, _, Backbone, TagModel){

    return Backbone.Collection.extend({
        model: TagModel,
        initialize: function() {
            
            this.on('change:isActive', this.onActiveChange); 
            this.listenTo(Backbone, 'items:filtered', this.onItemsFiltered);
            this.listenTo(Backbone, 'tags:reset', this.onTagsReset);
            this.listenTo(Backbone, 'liked:update', this.onLikedUpdate);
            this.listenTo(Backbone, 'disliked:update', this.onDislikedUpdate);
        },

        onActiveChange: function() {
            var filterArray = _.map(this.where({'isActive': true}), function(model) {
                return model.get('tagName');
            });

            

            Backbone.trigger('filters:update', filterArray);
        },

        onItemsFiltered: function(availableTags) {
            
            
            this.each(function(model) {

                // show all the tags that dont show up in the remaining available tags
                if (_.contains(availableTags, model.get('tagName'))) {
                    
                    model.set({'isAvailable': true});
                    
                } else {

                    //don't hide the liked and disliked filters even though they don't show up in the available tags
                    if (model.get('tagName') != 'iapp-liked' && model.get('tagName') != 'iapp-disliked') {
                        model.set({'isAvailable': false});
                    }
                }
            });

            
        },
        onTagsReset: function() {
            this.each(function(tag) {
                tag.set({'isActive': false});
            });
        },
        onLikedUpdate: function(likeArray) {
            var numLiked = likeArray.length;
            var likedTag = this.find(function(tag) {
               return tag.get('tagName') == 'iapp-liked';
            });
            if (numLiked > 0) {
                likedTag.set({'isAvailable': true});
            } else {
                likedTag.set({'isAvailable': false});
            }
        },
        onDislikedUpdate: function(dislikeArray) {
            var numDisliked = dislikeArray.length;
            var dislikedTag = this.find(function(tag) {
               return tag.get('tagName') == 'iapp-disliked';
            });
            if (numDisliked > 0) {
                dislikedTag.set({'isAvailable': true});
            } else {
                dislikedTag.set({'isAvailable': false});
            }
        }
             
        
    });

});