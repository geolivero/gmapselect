var $ = require('jquery');


$.fn.maps = function(options) {
  var Vid, MAPS, defaults, mapObj, markerObj, theMAP;

  defaults = $.extend({
    lat: 51.811006,
    long: 4.655015,
    marker: false,
    zoom: 14,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
    draggable: false,
    alternativeId: '',
    scrollwheel: false,
    icon: ''
  }, options);

  MAPS = function(el) {
    var self = this;
    this.$el = $(el);
    this.el = el;
    this.elID = this.$el.attr('id');

    google.maps.event.addDomListener(window, 'load', function () {
      self.view();
    });  
  };

  MAPS.prototype.view = function() {

    var latLong = new google.maps.LatLng(defaults.lat, defaults.long),
      styles = [{
        stylers: [{
          hue: ''
        }]
      }],
      highResIcon;

    this.map = new google.maps.Map(this.el, {
      center: latLong,
      zoom: 14,
      draggable: defaults.draggable,
      scrollwheel: defaults.scrollwheel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.map.setOptions({
      styles: styles
    });

    if (defaults.marker) {
      if (!defaults.icon.length) {
        this.marker = new google.maps.Marker({
          position: latLong,
          map: this.map,
        });
      } else {
        highResIcon = new google.maps.MarkerImage(defaults.icon, null, null, null, new google.maps.Size(32,47));
        this.marker = new google.maps.Marker({
          position: latLong,
          map: this.map,
          icon: highResIcon
        });
      }
    }
  };

  this.each(function() {
    theMAP = new MAPS(this);
  });

  return function () {
    return theMAP;
  };

};

module.exports = $;
