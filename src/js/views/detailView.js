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
          "click .close-card": "removeHighlight",
          "click .facebook-share": "facebookShare",
          "click .twitter-share": "twitterShare"
         
        },

        initialize: function() {

          router.navigate("movie/" + this.model.get("rowNumber"));
          this.listenTo(this.model, 'change', this.removeCard);
        },
        render: function() {
          this.$el.empty();
          
          this.$el.html(this.template(this.model.attributes));   
          this.postRender(this.$el);
          return this;
        },

        postRender: function(element) {

          _.defer(function() {
            $(".modal-overlay").addClass("show");

            element.addClass("modal-show");
          }, element);
            
        },

        removeCard: function() {
          
          if(!this.model.get("highlight")) {
            
            $(".modal-overlay").removeClass("show");
            this.$el.removeClass("modal-show");
            _.defer(function() { router.navigate("movie"); });
            var _this = this;
            _.delay(function() {
              _this.remove();
            }, 500);
          }
          
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