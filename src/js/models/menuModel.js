define(
  [
    'jquery',
    'underscore',
    'backbone',
    'models/config'
  ],
  function(jQuery, _, Backbone, config){

    return Backbone.Model.extend( {
        defaults: {
            isMenuOpen: false,
            numlikes: 0,
            numdislikes: 0
        },

        initialize: function() {
            
            this.on('change', this.onChange);
            this.listenTo(Backbone, 'window:resize', this.onResize);
            this.listenTo(Backbone, 'liked:update', this.onLikeUpdate);
            this.listenTo(Backbone, 'disliked:update', this.onDislikeUpdate);
        },
        onChange: function() {
            if (this.get('isMenuOpen')) {
                Backbone.trigger('menu:show');
            } else {
                 Backbone.trigger('menu:hide');
            }
        },
        onResize: _.throttle(function(e) {
            if (window.innerWidth < this.mobileThreshhold) {
                this.set({isMenuOpen: false});
            } 
        }, 500),

        onDislikeUpdate: function(dislikeArray) {
            var numDislikes = dislikeArray.length;
            this.set({'numdislikes': numDislikes});
        },

        onLikeUpdate: function(likeArray) {
            var numLikes = likeArray.length;
            this.set({'numlikes': numLikes});
        },
        

        mobileThreshhold: 1000
    });

});