var units = 'imperial';
var tempC, tempF;

var Coordinates = function(lat, lon) {
  this.latitude = lat;
  this.longitude = lon;
};

var coord = new Coordinates(0, 0);

function getLocation() {
  // Request location consent from user
  var display = document.getElementById('weather');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    display.innerHTML = 'Geolocation is not supported by this browser.';
  }
};

function showPosition(position) {
  // Stores in global variables.
  coord.latitude = position.coords.latitude;
  coord.longitude = position.coords.longitude;
  callWeatherAPI(coord.latitude, coord.longitude, units);
};

function callWeatherAPI(lat, lon, units) {
  var mainURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat + '&lon=' + lon + '&units=' + units + '&type=accurate' +
    '&APPID=78528f5973c16d9e83af96994c7eae5b';
  //console.log('main url: '+mainURL);

  $.getJSON(mainURL, function(a) {
    showElements();
    tempC = a.main.temp.toFixed(1);
    tempF = ((tempC - 32) * (5 / 9)).toFixed(1);
    $("#temperature").html(tempC+'&deg;C')
    $("#city").html(a.name)
        
    var iconSRC = "http://openweathermap.org/img/w/" + a.weather[0].icon  + ".png"
    $("#temp-img").attr("src", iconSRC);
  });
}

function hideElements() {
    $('#spinner').html('<i class="fa fa-spinner fa-pulse fa-3x"></i>');
    $('#city').hide();
    $('#temperature').hide();
    $('#temp-img').hide();
    $('#toggle-div').hide();
}

function showElements() {
    $('#spinner').html('');
    $('#city').show();
    $('#temperature').show();
    $('#temp-img').show();
    $('#toggle-div').show();
}

$(document).ready(function () {
  hideElements();
  // OpenWeatherMap only works over HTTP. Check if using HTTPS
  // and present an error with a link to a HTTP version of the page.
  if (window.location.protocol != 'http:') {
    $('#error').html('This page is not supported over https yet.<br />' +
      'Please try again over http.');
    $('#spinner').html('');
  } else {
    getLocation();
    
    $("#toggle-trigger").change(function() {
      if($(this).prop('checked')) {
        $("#temperature").html(tempF+'&deg; F')
      } else {
        $("#temperature").html(tempC+'&deg; C')
      }
    });
  }
  
});