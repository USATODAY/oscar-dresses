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
                'click .iapp-menu-close': 'onCloseClick',
                "click .iapp-menu-button": "onMenuClick"
            },
            initialize: function() {
                this.listenTo(this.model, 'change:isMenuOpen', this.updateState);
                this.listenTo(this.model, 'change:dislikesRemaining', this.onDislikeChange);
                this.listenTo(this.model, 'change:likesRemaining', this.onLikeChange);
                this.render();
            },
            render: function() {
                this.updateState();
                this.$el.html(this.template(this.model.toJSON()));
                this.addSubViews();
                return this;
            },
            addSubViews: function() {
                this.tagsCollection = new TagCollection(dataManager.data.tags);
                this.tagsView = new TagsView({collection: this.tagsCollection});
                this.shareModel = new ShareModel();
                this.shareView = new ShareView({model: this.shareModel});
            },
            updateState: function() {
                if (this.model.get('isMenuOpen')) {
                    this.$el.addClass('iapp-menu-show').removeClass('iapp-menu-hide');
                } else {
                    this.$el.addClass('iapp-menu-hide').removeClass('iapp-menu-show');
                }
            },
            onCloseClick: function() {
                this.model.set({isMenuOpen: false});
            },
            onMenuClick: function() {
                this.model.set({isMenuOpen: true});
            },
            onLikeChange: function() {
                var numLikesRemaining = this.model.get('likesRemaining');
                this.$('.iapp-menu-scoreboard-likes').find('.iapp-menu-scoreboard-score').text(numLikesRemaining);
            },
            onDislikeChange: function() {
                var numDislikesRemaining = this.model.get('dislikesRemaining');
                this.$('.iapp-menu-scoreboard-dislikes').find('.iapp-menu-scoreboard-score').text(numDislikesRemaining);
            }

        });
});