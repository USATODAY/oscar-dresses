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
      }
    });

  });