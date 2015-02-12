 define([
  "jquery",
  "underscore",
  'lib/BackboneRouter',
  ], 
  function($, _, Backbone) { 
    var Router = Backbone.Router.extend({

      routes: {
        "": "home",
        "movie": "home",
        "movie/:id":                 "highlight",    // #/1
        
      },

      home: function() {
         this.trigger("homeRoute");
      },

      highlight: function(id) {
        this.trigger("highlight", id);
      }

    });

   _.extend(Router, Backbone.Events);

   return new Router();
});