define([
    "jquery", 
    "underscore", 
    "backbone", 
    "analytics", 
    "templates",
    "models/config",
    "router"
    ], 
    function(jQuery, _, Backbbone, Analytics, templates, config, router) {
      return Backbone.View.extend({
        tagName: "div",
        className: "modal",
        template: templates["card-back.html"],

        events: {
          "click .close-card": "removeCard",
          "click .facebook-share": "facebookShare",
          "click .twitter-share": "twitterShare",
          "click .iapp-detail-bg": "removeCard",
          'click .iapp-like-button': 'onLikeClick',
          'click .iapp-dislike-button': 'onDislikeClick' 
        },

        initialize: function() {

          // router.navigate("movie/" + this.model.get("rowNumber"));
          this.listenTo(Backbone, "highlight:remove", this.removeCard);
          // this.listenTo(this.model, 'change:highlight', this.removeCard);
        },
        render: function() {
          this.$el.empty();
          $('body').addClass('iapp-no-scroll');

          if (this.model.get('isLiked')) {
            this.$el.addClass('iapp-liked');
          } else if (this.model.get('isDisliked')) {
            this.$el.addClass('iapp-disliked');
          }

          
          this.$el.html(this.template(this.model.attributes));   
          this.postRender(this.$el);
          return this;
        },

        postRender: function(element) {

          _.defer(function() {

            element.addClass("modal-show");
          }, element);
            
        },

        removeCard: function() {
            this.model.set({highlight: false}); 
            $('body').removeClass('iapp-no-scroll');
          
            
            this.$el.removeClass("modal-show");
            var _this = this;
            console.log('detail View remove card');
            console.log(_this);
            _.delay(function() {
              _this.remove();
            }, 500);
        
          
        },


        removeHighlight: function() {
          this.model.set({"highlight": false});
        },

        onLikeClick: function() {
          this.model.set({'isLiked': !this.model.get('isLiked'), 'isDisliked': false});
            if (this.model.get('isLiked')) {
              this.$el.addClass('iapp-liked').removeClass('iapp-disliked');
            } else {
              this.$el.removeClass('iapp-liked')
            }
        },

        onDislikeClick: function() {
          this.model.set({'isDisliked': !this.model.get('isDisliked'), 'isLiked': false});
          if (this.model.get('isDisliked')) {
            this.$el.addClass('iapp-disliked').removeClass('iapp-liked');
          } else {
            this.$el.removeClass('iapp-disliked')
          }  
        }

    });
});