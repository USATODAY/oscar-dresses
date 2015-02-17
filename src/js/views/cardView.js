define([
    "jquery",
    "underscore",
    "backbone",
    "analytics",
    "templates"
  ],
  function(jQuery, _, Backbbone, Analytics, templates) {

    return Backbone.View.extend({
      tagName: "div",

      className: function() {
        var tags = this.model.get("tags");
        var classes = "card small-card";
        _.each(tags, function(tag) {
          var tagClass = tag;
          
          classes += (" " + tagClass);
        });
        return classes;
      },

      events: {
        // "click": "setHighlight",
        'click .iapp-like-button': 'onLikeClick',
        'click .iapp-dislike-button': 'onDislikeClick'
      },

      template: templates["card-front.html"],

      render: function() {
        this.$el.html(this.template(this.model.attributes));
        _.each(this.model.attributes.category, function(v, i) {
          this.$el.addClass(v);
          this.$el.attr('data-category', v);
        }, this);

        return this;
      },

      setHighlight: function() {
        Analytics.click("opened card");
        this.model.set({
          "highlight": true
        });
      },

      onLikeClick: function() {
        this.model.set({'isLiked': true, 'isDisliked': false});
        this.$el.addClass('iapp-liked').removeClass('iapp-disliked');
      },

      onDislikeClick: function() {
        this.model.set({'isDisliked': true, 'isLiked': false});
        this.$el.addClass('iapp-disliked').removeClass('iapp-liked');
      }
    });

  });