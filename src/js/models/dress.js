define([
    "jquery",
    "underscore",
    "backbone"
], function($, _, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            highlight: false,
            isLiked: false,
            isDisliked: false
        },
        initialize: function() {


            // this.set({
            //     'photo_url': 'http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/' + this.get('photo_filename') + '.jpg'
            // });
        }
    });
});