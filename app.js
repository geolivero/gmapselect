var $ = require('jquery'),
  Maps = require('./map_select');


  $(function () {
    $('#map').mapSelect({
      postURL: 'http://www.ajaxpost.com',
      callback: function () {
        alert('done');
      }
    });
  });
