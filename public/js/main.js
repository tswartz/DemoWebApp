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
    params.id = 4930956 // id for Boston, you can find city codes here http://bulk.openweathermap.org/sample/
  }
  $.ajax(url + $.param(params)).done(function (data) {
    $('.city').text(data.name);
    $('.temp').text(data.main.temp);
    $('.summary').html(parseSummary(data));
  });
}

function parseSummary(data) {
  var description = data.weather[0].description;
  var icon = data.weather[0].icon;
  var iconSrc = `http://openweathermap.org/img/w/${icon}.png`;
  return `<span>${description}</span><img src="${iconSrc}"/>`;
}
