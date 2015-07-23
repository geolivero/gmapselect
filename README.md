# Gmapselect
A Google maps widget that return the lat and long data, and the ability to post these to the server.


## How to use
Just call the plugin, and require the plugin


```
var $ = require('jquery'),
  Maps = require('./map_select');

$(function () {
  $(element).mapSelect({
    initial_lat: 51.931922,
    initial_long: 4.459878,
    postURL: 'ajaxposturl',
    callback: function (data) {

    }
  });
});
```
