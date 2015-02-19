define([
    "jquery",
    "underscore",
    "backbone",
    "analytics",
    "templates"
  ],
  function(jQuery, _, Backbone, Analytics, templates) {

    return Backbone.View.extend({
      tagName: "div",

      initialize: function() {
        this.listenTo(this.model, 'change:isLiked', this.onLikedChange);
        this.listenTo(this.model, 'change:isDisliked', this.onLikedChange);
      },

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
        "click": "setHighlight",
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

      onLikeClick: function(e) {

        console.log('like click'); 
        this.model.undislike();
        if (!this.model.get('isLiked')) {
          
          this.model.like();
        } else {
        
          this.model.unlike();
        }
        
        e.stopImmediatePropagation();
        
      },

      onDislikeClick: function(e) {
        
        this.model.unlike();

        if (!this.model.get('isDisliked')) {
          
          this.model.dislike();
        } else {
          
          this.model.undislike();
        }
        e.stopImmediatePropagation();
        
      },

      onLikedChange: function() {
        
          
          if (this.model.get('isLiked')) {
            this.$el.addClass('iapp-liked');
          } else {
            this.$el.removeClass('iapp-liked');
          }

          if (this.model.get('isDisliked')) {
            this.$el.addClass('iapp-disliked');
          } else {
            this.$el.removeClass('iapp-disliked');
          }
          console.log('like change');
      }
    });

  });