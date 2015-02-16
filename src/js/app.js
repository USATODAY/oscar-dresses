define([
  'require',
  'jquery',
  'brightcove',
  'isotope',
  'underscore',
  'lib/BackboneRouter',
  'views/appView',
  'dataManager',
  'jquery_ui_touch_punch'
  ], 
  function(require, jQuery, brightcove, Isotope, _, Backbone, appView, dataManager) {


  return {
    init: function() {
      require( [ 'jquery-bridget/jquery.bridget' ],
        function() {
          // make Isotope a jQuery plugin
          $.bridget( 'isotope', Isotope );

          //Make data request
          
          dataManager.getData();

          appview = new appView();
          Backbone.history.start();
        }
      );   
    }
  };
});
