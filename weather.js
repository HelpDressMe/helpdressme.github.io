$(document).ready(function() {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    jsonp: "callback",
    dataType: "jsonp",
    data: {
      q: "Eastleigh",
      mode: "jsonp"
    },
    // Work with the response
    success: function(response) {
      $('body').addClass('weather_' + response.weather[0].main);
      $('.weather-text').text(response.weather[0].description);
      $('.weather-temp').text(Math.round(response.main.temp - 273.16));
    }
  });
});

function myFunction() {
  current_location = document.getElementById("location_input").value;
  console.log(current_location);

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    jsonp: "callback",
    dataType: "jsonp",
    data: {
      q: current_location,
      mode: "jsonp"
    },
    // Work with the response
    success: function(response) {
      $('body').addClass('weather_' + response.weather[0].main);
      $('.weather-text').text(response.weather[0].description);
      $('.weather-temp').text(Math.round(response.main.temp - 273.16));
      clothes = 'something';
      temperature = (Math.round(response.main.temp - 273.16));
      if (temperature > 20) {
        clothes = 't-shirt';
      } else if (temperature < 20 && temperature > 1) {
        clothes = 'jumper';
      } else if (temperature < -20 && temperature > -30) {
        clothes = 'body bag';
      } else {
        clothes = 'body bag';
      }
      $('.weather-clothes').text(clothes);
    }
  });
}

function currentLocation(evt) {
  evt.preventDefault();
  if (navigator.geolocation) {
    console.log("geolocation supported");
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function success(position) {
  console.log("current position is:" + position);
  updateWeather({
    lat: position.coords.latitude,
    lon: position.coords.longitude
  });
}

function error(err) {
  console.log("some error occurred" + err.message);
}

function updateWeather(location) {
  location.mode = "jsonp";
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    jsonp: "callback",
    dataType: "jsonp",
    data: location,
    // Work with the response
    success: function(response) {
      $('body').addClass('weather_' + response.weather[0].main);
      $('.weather-text').text(response.weather[0].description);
      $('.weather-temp').text(Math.round(response.main.temp - 273.16));
      clothes = 'something';
      temperature = (Math.round(response.main.temp - 273.16));
      if (temperature > 20) {
        clothes = 't-shirt';
      } else if (temperature < 20 && temperature > 1) {
        clothes = 'jumper';
      } else if (temperature < -20 && temperature > -30) {
        clothes = 'body bag';
      } else {
        clothes = 'body bag';
      }
      $('.weather-clothes').text(clothes);
      console.log("temperature for:" + response.name + " is:" + response.main.temp);
	  document.getElementById("location_input").value=response.name;
    }
  });
}
