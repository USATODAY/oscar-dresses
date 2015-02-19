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
                "click .iapp-menu-button": "onMenuClick",
                'click .iapp-top-button': 'onTopClick'
            },
            initialize: function() {
                this.listenTo(this.model, 'change:isMenuOpen', this.updateState);
                this.listenTo(this.model, 'change:dislikesRemaining', this.onDislikeChange);
                this.listenTo(this.model, 'change:likesRemaining', this.onLikeChange);
                this.listenTo(Backbone, 'window:scroll', this.onWindowScroll);
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
                // $('body,html').removeClass('iapp-no-scroll');
            },
            onMenuClick: function() {
                this.model.set({isMenuOpen: true});
                console.log(this.model.mobileThreshhold);
                if (window.innerWidth < this.model.mobileThreshhold) {
                     // $('body,html').addClass('iapp-no-scroll');
                }
            },
            onLikeChange: function() {
                var numLikesRemaining = this.model.get('likesRemaining');
                this.$('.iapp-menu-scoreboard-likes').find('.iapp-menu-scoreboard-score').text(numLikesRemaining);
            },
            onDislikeChange: function() {
                var numDislikesRemaining = this.model.get('dislikesRemaining');
                this.$('.iapp-menu-scoreboard-dislikes').find('.iapp-menu-scoreboard-score').text(numDislikesRemaining);
            },
            onWindowScroll: _.throttle(function() {
               if (this.checkIsVisible()) {
                    this.$el.addClass('iapp-menu-scrolled');
               } else {
                    this.$el.removeClass('iapp-menu-scrolled');
               }
            }, 500),
            onTopClick: function() {
                $('body,html').animate({scrollTop: 0}, 500);
            },

            checkIsVisible: function() {

                var $elem = this.$('.iapp-menu-panel');
                var $window = $(window);

                var docViewTop = $window.scrollTop();
                var docViewBottom = docViewTop + $window.height();

                var elemTop = $elem.offset().top;
                var elemBottom = elemTop + $elem.height();


                return docViewTop > elemBottom;

            }

        });
});