
/*

  Mapper.js

  Jquery plugin for simple google maps implementation

  Author: Sydney Hake
  Date: 02 Feb 2015

  Dependencies:
    Google maps API

  Usage:

    $('.map-wrapper').mapper({ ... }) // Pass in you options (see defaults)
    or see all options at: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    
    <div class="map-wrapper" data-address="1120 Hamilton Street, Vancouver" data-marker="true"></div>
    
    Note: if the location is not set in the data-address field, it will default to the lat & long specified in defaults

*/

(function ($) {

  $.fn.mapper = function(options) {

    var defaults = {
      center: new google.maps.LatLng(49.2755723, -123.1214724), // Drive Office location
      mapTypeId: 'satellite',
      zoom: 20,
      mapTypeControl: false,
      zoomControl: false,
      panControl: false,
      streetViewControl: false,
      backgroundColor: 'black',
      disableDoubleClickZoom: true,
      keyboardShortcuts: false,
      noClear: false,
      scrollwheel: false,
    };

    // give the ability to overwrite the defaults
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var opts = $.extend( {}, defaults, options );

    // use HTML DOM Object
    var selector = $(this)[0];

    map = new google.maps.Map(selector, opts);

    // Geocoder
    var geocoder   = new google.maps.Geocoder(); // Create an instance of the google maps geocoder
    var address    = selector.getAttribute('data-address');
    var dataMarker = selector.getAttribute('data-marker');

    // if address is set in html using data-address, use geocoder to add a marker
    if ( address ) {

      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

          // In this case it creates a marker, but you can get the lat and lng from the location.LatLng
          map.setCenter(results[0].geometry.location);
          
          // if we are adding a marker, set it in the geocoder

          if ( dataMarker === 'true' ) { 
          
            var marker = new google.maps.Marker({
              map: map, 
              position: results[0].geometry.location
            });

          }
          
        } 
      });
      
    }

    // add a class to the map once it's loaded, to add a nice css transition
    var container = $(this);
    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //this part runs when the mapobject is created and rendered
        container.addClass('js-map-loaded');
    });

  }

}( jQuery ));
