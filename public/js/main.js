$(document).ready(function() {
  getWeather();
});

function searchWeather() {
  var searchQuery = $('.search').val(); // grab value from search input
  getWeather(searchQuery);
}

function getWeather(searchQuery) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?'; // url for the API
  var params = {
    APPID: apiKey, // coming from apiKey in index.ejs
    units: 'imperial' // let's use fahrenheit. murica!
  };
  if (searchQuery) {
    params.q = searchQuery;
  } else {
    params.id = 4930956 // defaults to id for Boston, you can find city codes here http://bulk.openweathermap.org/sample/
  }
  $.ajax(url + $.param(params), {
    success: function (data) {
      $('.city').text(`${data.name}, ${getCountryName(data.sys.country)}`);
      $('.temp').text(`${data.main.temp} °F`);
      $('.summary').html(parseSummary(data));
    },
    error: function (error) {
      $('.error-message').text('An error occurred :(');
    }
  });
}

function parseSummary(data) {
  if (data.weather) {
    var weatherItems = data.weather.map(function(weatherItem) {
      var description = weatherItem.description;
      // the api gives you an icon file name, all icon pngs are available at http://openweathermap.org/img/w
      var iconSrc = 'http://openweathermap.org/img/w/' + weatherItem.icon + '.png';
      return `<div class="summary-item"><span>${description}</span><img src="${iconSrc}"/></div>`;
    });
    return weatherItems.join('');
  }
}
