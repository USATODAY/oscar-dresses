define([
  'require',
  'jquery',
  'brightcove',
  'isotope',
  'underscore',
  'lib/BackboneRouter',
  'collections/movies',
  'views/appView',
  'jquery_ui_touch_punch'
  ], 
  function(require, jQuery, brightcove, Isotope, _, Backbone, moviesCollection, appView) {


  return {
    init: function() {
      require( [ 'jquery-bridget/jquery.bridget' ],
        function() {
          // make Isotope a jQuery plugin
          $.bridget( 'isotope', Isotope );

          appview = new appView({collection: new moviesCollection()});
          Backbone.history.start();
        }
      );   
    }
  }
});
