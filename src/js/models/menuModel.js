define(
  [
    'jquery',
    'underscore',
    'backbone',
    'models/config'
  ],
  function(jQuery, _, Backbone, config){

    return Backbone.Model.extend( {
        defaults: {
            isMenuOpen: true,
            likesRemaining: 10,
            dislikesRemaining: 10
        },

        initialize: function() {
            if (config.isMobile) {
                this.set({
                    isMenuOpen: false
                });
            }
            this.on('change', this.onChange);
            this.listenTo(Backbone, 'window:resize', this.onResize);
        },
        onChange: function() {
            if (this.get('isMenuOpen')) {
                Backbone.trigger('menu:show');
            } else {
                 Backbone.trigger('menu:hide');
            }
        },
        onResize: _.throttle(function(e) {
            if (window.innerWidth < this.mobileThreshhold) {
                this.set({isMenuOpen: false});
            } else {
                this.set({isMenuOpen: true});
            }
        }, 500),
        

        mobileThreshhold: 1000
    });

});