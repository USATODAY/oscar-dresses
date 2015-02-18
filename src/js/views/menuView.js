define([
    "jquery",
    "underscore",
    "backbone",
    "analytics",
    "dataManager",
    "templates",
    "models/config",
    'models/shareModel',
    'collections/TagCollection',
    'views/tagsView',
    'views/shareView',
    "router"
],
    function(jQuery, _, Backbone, Analytics, dataManager, templates, config, ShareModel, TagCollection, TagsView, ShareView, router) {
        return Backbone.View.extend({
            el: '.iapp-menu',
            template: templates['menu.html'],
            events: {
                'click .iapp-menu-close': 'onCloseClick'
            },
            initialize: function() {
                this.listenTo(Backbone, 'menu:show', this.onMenuShow);
                this.listenTo(Backbone, 'menu:hide', this.onMenuHide);
                this.render();
            },
            render: function() {

                this.$el.html(this.template({}));
                this.addSubViews();
                return this;
            },
            addSubViews: function() {
                this.tagsCollection = new TagCollection(dataManager.data.tags);
                this.tagsView = new TagsView({collection: this.tagsCollection});
                this.shareModel = new ShareModel();
                this.shareView = new ShareView({model: this.shareModel});
            },
            onMenuShow: function() {
                console.log('on menu show');
                this.$el.addClass('iapp-menu-show').removeClass('iapp-menu-hide');
            },
            onMenuHide: function() {
                this.$el.removeClass('iapp-menu-show').addClass('iapp-menu-hide');
            },
            onCloseClick: function() {
                Backbone.trigger('menu:hide');
            }

        });
});