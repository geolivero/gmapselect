var $ = require('jquery'),
  m = require('./map');


$.fn.mapSelect = function (options) {
  var MAP, defaults;

  defaults = $.extend({
    postURL: '',
    callback: function () {
      return;
    }
  }, options);

  MAP = function (el) {
    this.$el = $(el);
    this.createTemplate();
    this.createMap();
  };


  MAP.prototype.geolocate = function () {
    var self = this;
    if (navigator.geolocation) {
      console.log(navigator.geolocation );
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        self.lat = position.coords.latitude;
        self.long = position.coords.longitude;
        self.updateLocation();
        self.updateFields();
        //self.autoComplete.setBounds(circle.getBounds());
      }, function (error) {
        alert('We konden jouw adres niet vinden. Omdat locatie delen uit staat.');
        console.log(error);
      }, {timeout: 10000 });

    }
  };

  MAP.prototype.createTemplate = function () {
    var html = [
      '<div class="map__widget">',
      '</div>',
      '<div class="search_field"><input class="map_widget__search" placeholder="Zoek op adres of postcode" type="text" /></div>',
      '<div class="map__widget_info">',
      '<span class="map__widget_lat"></span>',
      '<span class="map__widget_long"></span>',
      '</div>',
      '<div class="map__widget_btns"><button class="btn">Bewaren</button></div>'
    ].join('');

    this.$el.append(html);
    this.$lat = this.$el.find('.map__widget_lat');
    this.$long = this.$el.find('.map__widget_long');
    this.$btn = this.$el.find('.map__widget_btns .btn');

    this.$btn.on('click', function () {
      console.log(defaults);
      if (defaults.url.length) {
        defaults.callback();
      }
    });
  };

  MAP.prototype.createMap = function () {
    var self = this;
    this.searchEl = this.$el.find('.map_widget__search')[0];
    this.preMapObj = this.$el.find('.map__widget').maps({
      lat: 51.931922,
      long: 4.459878,
      marker: true,
      zoom: 14,
      panControl: true,
      zoomControl: true,
      scaleControl: false,
      draggable: true,
      scrollwheel: true
    });
    this.mapObj = this.preMapObj();

    setTimeout(function () {
      self.addMapActions();
      self.geolocate();
    }, 100);
    
  };

  MAP.prototype.updateFields = function() {
    this.$lat.html(this.lat);
    this.$long.html(this.long);
  };

  MAP.prototype.addMapActions = function () {
    var self = this;
    this.mapObj.marker.setDraggable(true);
    this.autoComplete = new google.maps.places.Autocomplete(
      this.searchEl
    );
    google.maps.event.addListener(this.autoComplete, 'place_changed', function() {
      self.changeAddress();
    });

    google.maps.event.addListener(this.mapObj.marker, "dragend", function(e) { 
      self.lat = e.latLng.lat(); 
      self.long = e.latLng.lng(); 
      self.updateLocation();
      self.updateFields();
    });
  };

  MAP.prototype.updateLocation = function() {
    this.mapObj.marker.setPosition(new google.maps.LatLng(this.lat, this.long));
    this.mapObj.map.panTo( new google.maps.LatLng(this.lat, this.long) );
  };

  MAP.prototype.changeAddress = function() {
    this.place = this.autoComplete.getPlace();
    this.lat = this.place.geometry.location.A;
    this.long = this.place.geometry.location.F;
    this.updateLocation();
    this.updateFields();
  };

  

  this.each(function () {
    new MAP(this);
  });
};


exports = $;
