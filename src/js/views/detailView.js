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
          "click .iapp-detail-bg": "removeCard" 
        },

        initialize: function() {

          // router.navigate("movie/" + this.model.get("rowNumber"));
          this.listenTo(Backbone, "highlight:remove", this.removeCard);
          // this.listenTo(this.model, 'change:highlight', this.removeCard);
        },
        render: function() {
          this.$el.empty();
          $('body').addClass('iapp-no-scroll');
          
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

        facebookShare: function(e) {
            Analytics.click('facebook share clicked');

            var shareURL = config.share_url;
            var picture = this.model.get("basepath") + "fb-post.jpg";
            var description = "You should probably watch… " + this.model.get("movietitle") + ", filtered just for you by @usatoday’s #2014movieguide";

            
            if (window.FB) {

               e.preventDefault(); 

               window.FB.ui({
                  method: 'feed',
                  href: window.location.href,
                  picture: "",
                  name: "2014 Oscar-nominated (and not-so-nominated) Movie Guide",
                  caption: shareURL,
                  description: description
                }, function(response){});
                
            }
        },
        twitterShare: function(e) {
          Analytics.click('twitter share clicked');

            if (!config.isMobile) {
                e.preventDefault();

                window.open(e.currentTarget.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=550,height=420');
            }
        }

    });
});