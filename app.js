var $ = require('jquery'),
  Maps = require('./map_select');


  $(function () {
    $('#map').mapSelect({
      url: 'http://www.cakesplaza.com',
      callback: function () {
        alert('done');
      }
    });
  });