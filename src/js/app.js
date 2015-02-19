define([
  'require',
  'jquery',
  'brightcove',
  'isotope',
  'underscore',
  'lib/BackboneRouter',
  'models/config',
  'views/appView',
  'dataManager',
  'jquery_ui_touch_punch'
  ], 
  function(require, jQuery, brightcove, Isotope, _, Backbone, config, appView, dataManager) {


  return {
    init: function() {
      require( [ 'jquery-bridget/jquery.bridget' ],
        function() {
          // make Isotope a jQuery plugin
          $.bridget( 'isotope', Isotope );


          if (config.isTablet || config.isMobile) {
            $('.iapp-page-wrap').addClass('iapp-touch-device');
          }

          $(window).on('resize', function(e) {
            Backbone.trigger('window:resize');
          });

          $(window).on('scroll', function() {
            Backbone.trigger('window:scroll');
          });


          //Make data request
          
          dataManager.getData();

          appview = new appView();
          Backbone.history.start();
        }
      );   
    }
  };
});
