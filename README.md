# DemoWebApp - Fun with APIs!!

My name is Talia and I set out on a mission to create the coolest, sleekest weather app ever devised by humankind. I ended up making a web app that fetches and displays weather data from the OpenWeatherMap API. Check it out at http://sheltered-wave-81640.herokuapp.com/

## APIs are great
API stands for **Application Program Interface**. The actual definition of an API is pretty broad - APIs are basically a set of operations with specific inputs/outputs that let you interact with something, like a database, web service, or hardware (see https://en.wikipedia.org/wiki/Application_programming_interface for more info if you're hardcore).  In this case, we will be using Web APIs, which allow you to send and receive data from a web service. For example, let's say you wanted to display Jay Z's Twitter feed on your website because he is a beautiful wordsmith. You could use the Twitter API to grab the tweet history of a specific user (in this case, Jay Z aka Shawn Carter aka Hova). Most large-scale software companies like Google, Twitter, Facebook (and HubSpot!!) have APIs that let you use their services and data in your own applications. Also, many different kinds of data can be accessed via an API - weather, movie information/reviews, sports stats, restaurants, maps, Jay Z's sick rhymes, etc. If you're wondering if an API exists for some form of data, give it a Goog. Chances are, if it's within reason there's an API for that.

## How (most) Web APIs work
You can grab information from a web service using HTTP, which is how you would access just about any other website. Most web APIs can be accessed by sending a request to some URL. In this repo, I send a request to `http://api.openweathermap.org/data/2.5/weather?id=4930956&units=imperial`. There are a couple types of HTTP requests: `GET`, `POST`, `DELETE`, `PUT`, etc. GET is for when you want to retrieve data from a service, like reading a specific item from a database. For the purposes of this demo I won't go into the other methods but feel free to read up on what the other methods do http://www.tutorialspoint.com/http/http_methods.htm. This app uses a GET request to grab today's weather data for a given city - note that my API request is read-only, it doesn't actually change any of OpenWeatherMap's data.

## How to use an API

### All APIs are different
Most Web APIs work the same way with HTTP but all have their own specifications on how to use them. Each API has its own URL structure and different kinds of methods. To get the weather for Boston, I send a GET request to `http://api.openweathermap.org/data/2.5/weather?id=4930956&units=imperial`. In general, you start off with some base URL - `api.openweathermap.org/` - and add more specific paths and query parameters to tell the API exactly what information you want. So in this case, adding `data/2.5/weather` means you want the weather for some location. Adding `id=4930956&units=imperial` means you want the weather for the city with id 4930956 (Boston) and you want it in imperial (American) units since I want to display the temperature in Fahrenheit rather than Kelvin (which is the default for this API). Kelvin is for weirdos.

The data that is returned will also be totally different between APIs. Most web APIs return data in the JSON format, which is just very simple object format i.e. `{key: value}`. OpenWeatherMap returns a large JSON object, which looks like this: 

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

A different weather API would probably return similar data, i.e. temperature, wind speed, chance of rain, chance of Blue Ivy sightings, but it would return a JSON object in a completely different format. Either way, you can easily take that object and pull out the information you want.

### Documentation is your best friend
The only way to know how to use a certain API like this is to go to its website and read the documentation there. Any decent API will provide instructions and documentation for the different kinds of requests you can send and what information will be sent back. OpenWeatherMap has extensive docs detailing what kind of weather data you can grab and what will be returned. As the saying goes: "Docs are a girl's best friend".

### Authorization
Most APIs require some form of authorization to make sure that not just anyone can send a request to it. Just like how not just anyone can be part of Taylor Swift's lady squad. Usually, you can get authorization by making an account with the service and getting an **API key** (sometimes called an access token). This is a special string that you send along with the request - usually as a query parameter like `apiKey=[your api key]` - that lets the API know that you're an authorized user. APIs all have their own way of doing this and have instructions on how to get started, another reason to read the documentation *nudge nudge*.

**Important:** API keys are sensitive information. Protect them like a mama bear protecting its cubs. Ok well maybe that's a bit of a stretch. You don't want just anyone to see them, so it's good practice to NOT expose them in your code on GitHub. I hid my API key by setting it as an **environment variable** (which is just a special named value) on Heroku and accessing it in my app. I set an environment variable called API_KEY to the API key given to me by OpenWeatherMap - I just ran `heroku config:set API_KEY=somevalue` in my command line. See https://devcenter.heroku.com/articles/config-vars to set the variable and https://devcenter.heroku.com/articles/heroku-local#copy-heroku-config-vars-to-your-local-env-file to set it in your repo and access it locally. Then I accessed it in `views/pages/index.ejs` via `<%= process.env.API_KEY %>`. This way, I got 99 problems but risk of someone abusing my API key definitely ain't one.

## Integrating an API in your app
To access an API and use its data in your app, you'll need a way to actually send a request to it and handle the returned data. If you take a look at `public/js/main.js` you'll see my app uses a method called `ajax` to send the request to OpenWeatherMaps's servers. It also handles the returned information in 2 types of functions: a success handler and an error handler. The success handler function gets called when the request goes smoothly comes back with the desired data. It takes the weather data, pulls out the information I want, and displays it on my webpage using jQuery. The error handler function is called when something goes wrong - this is super super important when using APIs, requests can sometimes run into an error and in most cases will return some form of error message.

**Also important**: My app doesn't work if you access my page at HTTPS rather than HTTP - https://sheltered-wave-81640.herokuapp.com/ This is because my API call uses plain HTTP which is not allowed on an HTTPS page. I tried looking into a solution, but for the sake of simplicity I would just have people access my site at the http address rather than https. It's lazy but since the purpose of this demo is to demonstrate basic API usage, let's not worry about it :)
