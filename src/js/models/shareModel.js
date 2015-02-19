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
            'default_share_language': 'share language',
            'stillimage': 'http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/fb-post.jpg',
            'likePath': '',
            'dislikePath': ''

            
        },

        initialize: function() {
            var baseURL = window.location.origin + window.location.pathname;
           this.set({
                'baseURL': baseURL,
                'fbShare': this.createFbShareURL(baseURL),
                'twitterShare': this.createTwitterShareURL(baseURL),
                'share_language': this.get('default_share_language'),  
                'encodedShare': encodeURIComponent(this.get('default_share_language')),
                'fb_id': config.facebook.app_id,
                'fb_redirect': 'http://' + window.location.hostname + '/pages/interactives/fb-share/',
                'email_link': this.createEmailLink(baseURL)
                
            }); 
           this.listenTo(Backbone, 'liked:update', this.onLiked);
           this.listenTo(Backbone, 'disliked:update', this.onDisliked);
           
        },

        createFbShareURL: function(url) {   
            return encodeURI(url); 
        },

        createTwitterShareURL: function(url) {

            return encodeURIComponent(url); 
        },

        createEmailLink: function(url) {
            return "mailto:?body=" + encodeURIComponent(this.get('sharelanguage')) +  "%0d%0d" + this.createTwitterShareURL(url) + "&subject=";
        },

        updateLanguage: function(newShareStr) {

        },

        updateUrls: function() {
            var shareUrl;
            var baseURL = this.get('baseURL');
            if (this.get('dislikePath') !== '' && this.get('likePath') !== '') {
                shareUrl = baseURL + '#likes/' + this.get('likePath') + '/dislikes/' + this.get('dislikePath');
            } else if (this.get('dislikePath') !== '') {
                shareUrl = baseURL + '#dislikes/' + this.get('dislikePath');
            } else if (this.get('likePath') !== '') {
                shareUrl = baseURL + '#likes/' + this.get('likePath');
            } else {
                shareUrl = baseURL;
            }

            this.set({
                'fbShare': this.createFbShareURL(shareUrl),
                'twitterShare': this.createTwitterShareURL(shareUrl),
                'email_link': this.createEmailLink(shareUrl)
            });

        },

        onDisliked: function(dislikeArray) {
            
            this.set({'dislikePath': this.createPath(dislikeArray)});
            this.updateUrls();
        },

        onLiked: function(likeArray) {
            this.set({'likePath': this.createPath(likeArray)});
            this.updateUrls();
        },

        createPath: function(array) {
            var uids = [];
            _.each(array, function(dressModel) {
                var uid = dressModel.get('uid');
                uids.push(uid);
            });
            return uids.join('-');
        }
    });

});