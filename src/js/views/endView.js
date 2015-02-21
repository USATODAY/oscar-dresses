define([
    "jquery",
    "underscore",
    "backbone",
    "analytics",
    "templates"
],
    function(jQuery, _, Backbone, Analytics, templates) {
        return Backbone.View.extend({
            el: '.iapp-end-modal-wrap',
            template: templates['share-end.html'],
            events: {
                'click .iapp-end-modal-bg': 'onClickClose',
                'click .iapp-end-modal-close': 'onClickClose',
                'click .iapp-share-popup': 'onShareButtonClick'
            },
            initialize: function() {
                this.render();
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(Backbone, 'end:show', this.show);
                this.listenTo(Backbone, 'route:share', this.quickHide);
                this.listenTo(Backbone, 'app:reset', this.quickHide);
            },
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            onClickClose: function() {
                
                this.hide();
            },
            onShareButtonClick: function(e) {
                e.preventDefault();
                

              this.windowPopup(e.currentTarget.href, 500, 300);
            },
            show: function() {
                console.log('show modal');
                this.$el.fadeIn();
            },
            hide: function() {
                this.$el.fadeOut();
            },
            windowPopup: function(url, width, height) {
                // Calculate the position of the popup so
                // it’s centered on the screen.
                var left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

                window.open(
                    url,
                    "",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
                );
            },
            quickHide: function() {
                this.$el.hide();
            }

        });
});
