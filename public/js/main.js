$(document).ready(function() {
  getWeather();
});

function getWeather() {
  var url = 'http://api.openweathermap.org/data/2.5/weather?id=4930956&units=imperial&APPID=' + appKey;
  $.ajax(url).done(function (data) {
    $('.city').text(data.name);
    $('.temp').text(data.main.temp);
    $('.summary').html(parseSummary(data));
  });
}

function parseSummary(data) {
  var description = data.weather[0].description;
  var icon = data.weather[0].icon;
  var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
  return `<span>${description}</span><img src="${iconSrc}"/>`;
}
