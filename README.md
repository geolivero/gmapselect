# Gmapselect
A Google maps widget that return the lat and long data, and the ability to post these to the server.


## How to use
Just call the plugin, its 
var $ = require('jquery'),
  Maps = require('./map_select');
  
$(function () {
  $(element).mapSelect({
    postURL: 'ajaxposturl',
    callback: function (data) {
      
    }
  });
});
