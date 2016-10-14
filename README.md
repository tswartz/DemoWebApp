# DemoWebApp - Fun with APIs!!

My name is Talia and I set out on a mission to create the coolest, sleekest weather app ever devised by humankind. I ended up making a web app that fetches and displays weather data from the OpenWeatherMap API. Check it out at http://sheltered-wave-81640.herokuapp.com/

## APIs are great
API stands for **Application Program Interface**. The actual definition of this is pretty broad - APIs are basically a set of operations with specific inputs/outputs that let you interact with something, like a database, web service, or hardware (see https://en.wikipedia.org/wiki/Application_programming_interface for more info if you're hardcore).  In this case, we will be using Web APIs, which allow you to send and receive data from a web service. For example, let's say you wanted to display Jay Z's Twitter feed on your website because he is a beautiful wordsmith. You could use the Twitter API to grab the tweet history of a specific user (in this case, Jay Z aka Shawn Carter aka Hova). Most large-scale software companies like Google, Twitter, Facebook (and HubSpot!!) have APIs that let you use their services and data in your own applications. Also, many different kinds of data can be accessed via an API - weather, movie information/reviews, sports stats, restaurants, maps, Jay Z's sick rhymes, etc. If you're wondering if an API exists for some form of data, give it a Goog. Chances are, if it's within reason there's an API for that.

## How (most) Web APIs work
You can grab information from a web service using HTTP, which is how you would access just about any other website. Just like how you access Facebook by sending an HTTP request to `http://www.facebook.com`, most web APIs can be accessed by sending an HTTP request to some URL. In this repo, I send a request to `http://api.openweathermap.org/data/2.5/weather?id=4930956&units=imperial`. There are a couple types of HTTP requests: `GET`, `POST`, `DELETE`, `PUT`, etc. GET is the most commonly used type - it's for when you want to retrieve data from a service, like reading a specific item from a database. POST is for sending data to a service, usually to create something new in a database, so POST requests also contain a payload with the information you want to send. Feel free to read up on what the other methods do http://www.tutorialspoint.com/http/http_methods.htm. This app uses a GET request to grab today's weather data for a given city - note that my API request is read-only, it doesn't actually change any of OpenWeatherMap's data.

## How to use an API

### All APIs are different
Most Web APIs work the same way with HTTP but all have their own specifications on how to interact with them. Each API has its own URL structure and rules on what kinds of requests it will accept. To get the weather for Boston, I send a GET request to `http://api.openweathermap.org/data/2.5/weather?id=4930956&units=imperial`. In general, you start off with some base URL - `api.openweathermap.org/` - and add more specific paths and query parameters to tell the API exactly what information you want. So in this case, adding `data/2.5/weather` means you want the weather for some location. Adding `id=4930956` means you want the weather for the city with id 4930956, which is Boston (the OpenWeatherMap documentation has a list of all major cities and the ids they correspond to). Adding `units=imperial` means you want it in imperial (American) units since I want to display the temperature in Fahrenheit rather than Kelvin (which is the default for this API). Kelvin is for nerds.

The data that is returned will also be totally different between APIs. Most web APIs return data in the JSON format, which is just a very simple object format i.e. `{key: value}`. OpenWeatherMap returns a large JSON object, which looks like this: 

```
{
  "coord":{"lon":-71.06,"lat":42.36},
  "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
  "base":"cmc stations",
  "main":{"temp":37.42,"pressure":1029,"humidity":57,"temp_min":33.8,"temp_max":50},
  "wind":{"speed":8.05,"deg":60},
  "rain":{"1h":0.3},
  "clouds":{"all":1},
  "dt":1459956213,
  "sys":{"type":1,"id":1801,"message":0.0063,"country":"US","sunrise":1459937777,"sunset":1459984620},
  "id":4930956,
  "name":"Boston",
  "cod":200
}
```

A different weather API would probably return similar data, i.e. temperature, wind speed, chance of rain, chance of Beyonce sightings, but it would return a JSON object in a completely different format. Either way, you can easily take that object and pull out the information you want.

### Documentation is your best friend
The only way to know how to use a certain API like this is to go to its website and read the documentation there. Any decent API will provide instructions and documentation for the different kinds of requests you can send and what information will be sent back. OpenWeatherMap has extensive docs detailing what kind of weather data you can grab and what will be returned. As the saying goes: "Docs are a girl's best friend".

### Authorization
Most APIs require some form of authorization to make sure that not just anyone can send a request to it. Just like how not just anyone can be part of Taylor Swift's lady squad. Usually, you can get authorization by making an account with the service and getting an **API key** (sometimes called an access token). This is a special string that you send along with the request - usually as a query parameter like `apiKey=[your api key]` - that lets the API know that you're an authorized user. APIs all have their own way of doing this and have instructions on how to get started, another reason to read the documentation *nudge nudge*

**Important:** API keys are sensitive information. Protect them like a mama bear protecting its cubs. Ok well maybe that's a bit of a stretch. You don't want just anyone to see them, so it's good practice to NOT expose them in your code on GitHub. I hid my API key by setting it as an **environment variable** (which is just a special named value) on Heroku and accessing it in my app, under the name API_KEY. I'll explain how to do this in the tutorial. This way, I got 99 problems but risk of someone abusing my API key definitely ain't one.

## Integrating an API in your app
To access an API and use its data in your app, you'll need a way to actually send a request to it and handle the returned data. If you take a look at `public/js/main.js` you'll see my app uses a method called `ajax` to send the request to OpenWeatherMaps's servers. The method is just an implementation of the AJAX technique for sending and receiving data from a server somewhere else (see here for more info: https://en.wikipedia.org/wiki/Ajax_(programming) ). It also handles the returned information in 2 types of functions: a success handler and an error handler. The success handler function gets called when the request goes smoothly comes back with the desired data. It takes the weather data, pulls out the information I want, and displays it on my webpage using jQuery. The error handler function is called when something goes wrong - this is super super important when using APIs, requests can sometimes run into an error and in most cases will return some form of error message.

**Also important**: My app doesn't work if you access my page at HTTPS rather than HTTP - https://sheltered-wave-81640.herokuapp.com/ This is because my API call uses plain HTTP which is not allowed on an HTTPS page. I tried looking into a solution, but for the sake of simplicity I would just have people access my site at the http address rather than https. It's lazy but since the purpose of this demo is to demonstrate basic API usage, let's not worry about it :)

# Tutorial Tyme
So here's the good stuff - how to actually build this krazy app. Each step will include instructions for OpenWeatherMap API if you wanna use it and general instructions that should apply to most APIs where necessary. If you decide to use a different API and you're getting stuck with how to use it don't hesitate to ask one of us lovely volunteers for a hand! If you are using OpenWeatherMap feel free to just copy/paste from my code, but the code for this tutorial will look a little different and simpler.

Note: this tutorial assumes that you have Zoe's demo app cloned, and that you have Heroku up and running

1. Choose your API. What kind of data do you want to use? The world is your oyster. If you're feeling like just getting a chill practice run in API World for today, use OpenWeatherMap!
2. Most API sites, including OpenWeatherMap, will want you to create an account first before using their services, create that account!
3. Look around in your shiny new account for anything about API keys or access tokens, in OpenWeatherMap it's here https://home.openweathermap.org/api_keys Chances are it'll be a bunch of numbers and/or letters all jumbled up.
4. Grab that API key and run `heroku config:set API_KEY=whateveryourapikeyis` in your terminal (Substituting whateveryourapikeyis for whatever your API key is)
5. Then run `heroku config:get API_KEY -s  >> .env`. This way you can use API_KEY in your local environment for testing!
6. Go into `index.ejs` and make sure that `<script>var apiKey = '<%= process.env.API_KEY %>';</script>` is in your head tag if it's not already there! Make sure it comes before `<script src="/js/main.js"></script>`. The order matters here because `main.js` will want to use `API_KEY`.
7. To actually call the API, we'll need jQuery to use its `ajax` method and then set the retrieved data in our HTML (but if there's a different library you like to use for making HTTP requests go for it!). In that same head tag, insert `<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>` before the `main.js` script tag.
8. First, let's display the weather for one city. How about Boston! If you're using a different API you can mirror what I'm doing while keeping it relevant to the type of data you're dealing with - your API's abilities and documentation will be different. Or you can off-road and build whatever you'd like! We'll just display the city and temperature for now. Insert `<div class="city"></div><div class="temp"></div>` in your HTML body.
9. Time to actually use the API in `main.js`! At the top of your main.js file insert the following:

  ```
  $(document).ready(function() {
    getWeather();
  });
  ```
10. Now we'll create a function called `getWeather` that will retrieve the weather for Boston. We'll have to build the URL for the API request according to OpenWeatherMap's specifications. Note that we're using `apiKey` in here which was defined in the head of `index.ejs` and that we're setting the id to `4930956`, aka Boston. When the API call is finished and returns the weather data, we'll want to pull out the information we want and insert it in our HTML in our `success` function. Notice that we set the HTML text with our results using jQuery, which is designated by the `$` symbol.

  ```
  function getWeather() {
    var url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&id=4930956&APPID=' + apiKey;
    $.ajax(url, {
      success: function (data) {
        $('.city').text(data.name);
        $('.temp').text(data.main.temp + ' °F');
      }
    });
  }
  ```
11. Give it a run! It should display the Boston weather when you first load your site.
12. OK. Now, let's try to make it so you can search for any location. We need a search bar to type queries into and a button that'll fire the search. The button should have a function as its `onClick` handler that starts the search, we'll call it `searchWeather`. You'll want to add this to your HTML body:

  ```
  <input class="search" type="text" placeholder="Enter city name..." />
  <button type="button" onclick="searchWeather()">
    Search
  </button>
  ```
13. In `main.js`, add a `searchWeather` function that grabs whatever is in your search bar and then calls your API accordingly with that value:

  ```
  function searchWeather() {
    var searchQuery = $('.search').val(); // grab value from search input
    getWeather(searchQuery);
  }
  ```
14. Now, you'll need `getWeather` to take a single argument - `searchQuery` - and send that value in your URL up to the API so it knows to search for the weather at a location matching your query. Instead of throwing `units` and `id` and `APPID` into the same URL string, we can make an object that represents the query parameters to send along to the API. jQuery has a method called `param` that takes an object like {foo: 'bar', baz: 'qux'} and returns a string with that object's keys and values in the right format for a URL like `foo=bar&baz=qux`. If `searchQuery` exists, we want to put it into our URL. Otherwise, we will default to the city id for Boston.

  ```
  function getWeather(searchQuery) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?'; // url for the API
    var params = {
      APPID: apiKey,
      units: 'imperial'
    };
    if (searchQuery) {
      params.q = searchQuery;
    } else {
      params.id = 4930956
    }
    $.ajax(url + $.param(params), {
      success: function (data) {
        $('.city').text(data.name);
        $('.temp').text(data.main.temp + ' °F');
      }
    });
  }
  ```
15. Try re-running your app. The Boston temperature should show by default as it did before. Type in a different city anywhere in the world and see if it works!!!!

Woo you did it! That was a wild ride. Try taking this further - you can display more data in your HTML, like precipitation or wind speeds. All you have to do is access the other data in the returned JSON object from the API call. Try making this look better too! You can use CSS, Bootstrap, and other libraries to make your app look sleeker and more professional.
