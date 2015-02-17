define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["app-view.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 class="iapp-page-header">Headline</h1>\n<p class="iapp-page-chatter">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi molestias placeat, aliquid eos ea, eaque odio a? Tenetur obcaecati iusto similique ullam quasi officiis mollitia ut dolores, architecto porro saepe.</p>\n<p class="time-stamp"></p>\n<div class="iapp-filters-wrap"></div> \n<div id="card-wrap"></div>\n';

}
return __p
};

this["templates"]["card-back.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n      <div class="card card-detail">\n      \n        <div class="iapp-detail-image-wrap">\n            <img src="' +
((__t = (photo_url)) == null ? '' : __t) +
'" alt="' +
((__t = (person_name)) == null ? '' : __t) +
'" class="iapp-detail-image">\n        </div>\n      \n        <div class="close-card"></div>\n      \n      \n      \n        <div class="iapp-detail-info">\n            <h2 class="card-back-header">' +
((__t = ( person_name )) == null ? '' : __t) +
' </h2>\n            <p class="iapp-summary">' +
((__t = ( photo_caption )) == null ? '' : __t) +
'</p>\n        </div>\n      \n      \n      </div>\n      \n        <div class="iapp-detail-bg"></div> \n\n';

}
return __p
};

this["templates"]["card-front.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img class="cover-img" src="' +
((__t = (photo_url)) == null ? '' : __t) +
'" alt="' +
((__t = ( person_name)) == null ? '' : __t) +
'">\n<div class="iapp-card-status iapp-card-status-liked"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/like.svg" alt="" class="iapp-card-status-icon"></div>\n<div class="iapp-card-status iapp-card-status-disliked"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/dislike.svg" alt="" class="iapp-card-status-icon"></div>\n<div class="iapp-card-info">\n    <h2 class="iapp-card-info-header">' +
((__t = ( person_name)) == null ? '' : __t) +
'</h2>\n    <p class="iapp-card-info-text">' +
((__t = ( photo_caption)) == null ? '' : __t) +
'</p>\n    <div class="iapp-feedback-buttons">\n        <h4 class="iapp-like-button iapp-feedback-button"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/like.svg" class="iapp-feedback-icon" alt="Like"></h4>\n        <h4 class="iapp-dislike-button iapp-feedback-button"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/dislike.svg" class="iapp-feedback-icon" alt="Dislike"></h4>     \n    </div>\n</div>\n';

}
return __p
};

this["templates"]["tags.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(tags, function(tag) {
  var tagClass;
    tag == ":(" ? tagClass="sad" : tagClass = tag.toLowerCase().replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"").replace(/\s+/g, "-");
    
  ;
__p += '\n\n<div class="iapp-filter-button" data-filter="' +
((__t = ( tagClass )) == null ? '' : __t) +
'">' +
((__t = ( tag )) == null ? '' : __t) +
'</div>\n\n\n';
 }); ;
__p += '\n\n<div class="iapp-filter-button-clear">Clear Filters</div>';

}
return __p
};

  return this["templates"];

});