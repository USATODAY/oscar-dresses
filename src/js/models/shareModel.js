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
            'share_language': '',
            'stillimage': ''

            
        },

        initialize: function() {
           this.set({
                'fbShare': this.createFbShareURL(),
                'twitterShare': this.createTwitterShareURL(),
                'encodedShare': encodeURIComponent(this.get('sharelanguage')),
                'fb_id': config.fb_app_id,
                'fb_redirect': 'http://' + window.location.hostname + '/pages/interactives/fb-share/',
                'email_link': this.createEmailLink()
            }); 
        },

        createFbShareURL: function() {
            // var videoID = this.get('video_clip');
            var baseURL = window.location.origin + window.location.pathname;
            // return encodeURI(baseURL + "%23video/" + videoID); 
            return encodeURI(baseURL); 
        },

        createTwitterShareURL: function() {
            // var videoID = this.get('video_clip');
            var baseURL = window.location.origin + window.location.pathname;
            // return encodeURIComponent(baseURL + "#video/" + videoID); 
            return encodeURIComponent(baseURL); 
        },

        createEmailLink: function() {
            return "mailto:?body=" + encodeURIComponent(this.get('sharelanguage')) +  "%0d%0d" + this.createTwitterShareURL() + "&subject=";
        }
    });

});