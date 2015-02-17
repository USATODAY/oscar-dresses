define(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/TagView',
    'dataManager'
  ],
  function(jQuery, _, Backbone, TagView, dataManager) {
    return Backbone.View.extend({
        initialize: function() {
           this.listenTo(Backbone, 'tags:filter-ready', this.throttledFilter);
           this.listenTo(Backbone, 'video:set', this.advanceSub);
           this.listenTo(Backbone, 'tags:reset', this.onTagsReset);
           this.render();
        },
        events: {
            
        },
        el: '.iapp-filters-wrap',
        
        
        render: function(data) {

            //temp remove once config is in place
            var config = { isMobile: false};

            var _this = this;
            // this.$el.html(this.template({tag_text: dataManager.data.tag_text, greeting: this.getGreeting()}));
            
            this.collection.each(function(tagModel) {
                 var tagView = new TagView({model: tagModel});
                 _this.$el.append(tagView.render().el);
            });

            _.defer(function() {
                    
                    _this.$el.isotope({
                        itemSelector: '.iapp-filter-button',
                        transitionDuration: (!config.isMobile) ? '0.4s' : 0,
                        layoutMode: 'fitRows'

                });
            });

            this.$el.append('<div class="iapp-filter-button-clear">Clear Filters</div>');
            
            return this;
        },
        
        filter: function() {
            var _this = this;

            console.log('filtering');
            this.$el.isotope({filter: ':not(.unavailable)'});

            


            
            
        },
        
        throttledFilter: _.throttle(function() {
                this.filter();
            }, 100, {leading: false}
        ),
        
       
        onTagsReset: function() {
            this.$('.iapp-tag-container').isotope('layout');
        }
    });


});