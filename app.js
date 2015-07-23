var $ = require('jquery'),
  Maps = require('./map_select');


  $(function () {
    $('#map').mapSelect({
      initial_lat: 51.931922,
      initial_long: 4.459878,
      postURL: 'http://www.ajaxpost.com',
      callback: function () {
        alert('done');
      }
    });
  });
