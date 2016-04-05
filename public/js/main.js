$(document).ready(function() {
  getWeather();
});

function searchWeather() {
  var searchQuery = $('.search').val();
  getWeather(searchQuery);
}

function getWeather(searchQuery) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?';
  var params = {
    APPID: appKey, // this is being pulled in from public/js/appKey.js which I have hidden from Git, don't expose API keys on GitHub!
    units: 'imperial' // let's use fahrenheit. murica!
  };
  if (searchQuery) {
    params.q = searchQuery;
  } else {
    params.id = 4930956 // defaults to id for Boston, you can find city codes here http://bulk.openweathermap.org/sample/
  }
  $.ajax(url + $.param(params), {
    success: function (data) {
      $('.city').text(data.name);
      $('.temp').text(data.main.temp + '°F');
      $('.summary').html(parseSummary(data));
    },
    error: function (error) {
      $('.error-message').text('An error occurred :(');
    }
  });
}

function parseSummary(data) {
  var description = data.weather[0].description;
  var icon = data.weather[0].icon;
  var iconSrc = `http://openweathermap.org/img/w/${icon}.png`;
  return `<span>${description}</span><img src="${iconSrc}"/>`;
}
