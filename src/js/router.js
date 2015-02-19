 define([
  "jquery",
  "underscore",
  'lib/BackboneRouter',
  ], 
  function($, _, Backbone) { 
    var Router = Backbone.Router.extend({

      routes: {
        "": "home",
        'likes/:likestring': 'like',
        'dislikes/:dislikestring': 'dislike',
        'likes/:likestring/dislikes/:dislikestring': 'both' 
        
      },

      home: function() {
         this.trigger("homeRoute");
      },


      like: function(likestring) {
        Backbone.trigger('route:share');
        Backbone.trigger('route:like', likestring);
      },

      dislike: function(dislikestring) {
        Backbone.trigger('route:share');
        Backbone.trigger('route:dislike', dislikestring);
      },

      both: function(likestring, dislikestring) {
        Backbone.trigger('route:share');
        Backbone.trigger('route:both', likestring, dislikestring);
      }

    });

   _.extend(Router, Backbone.Events);

   return new Router();
});