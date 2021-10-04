var apiKey = 'c6e306e42b1bc0ce9623a1e6787fad9a';
var cityName = '';
// var date = '';
// var icon = '';
// var temp = '';
// var weatherCond = '';
// var humidity = '';
// var wind = '';
var lat = '';
var lon = '';
// var uv = '';
var cityEl = document.getElementById('city');
var searchBtn = document.getElementById('searchbtn');

//call all data functions when a city is selected via search or the history
function onButton(source){
    if (source = 'search') {
        getCurrentData();
        getForecastData();
        searchHist();
    } else {
        getCurrentData();
        getForecastData();
    }

};



// THEN I am presented with current and future conditions for that city and that city is added to the search history
// fetch and object traversal
function getCurrentData(){
    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(currentUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data){
                // console.log('current = '+data);
                // parseCurrent(data);
                // console.log('from getCurrentData, parsed = '+parseCurrent(data))
                // return the parsed data as arguments for render
                renderCurrent(parseCurrent(data)[0],parseCurrent(data)[1],parseCurrent(data)[2],parseCurrent(data)[3])
            });
        } else {
            console.error(response.statusText)
        };
    });
};


//parse data for the renderCurrent function to put on the page, and get lat/lon while we're in there
function parseCurrent (data) {
    // temp = data.main.temp;
    // console.log(temp)
    // weatherCond = data.weather[0].description;
    // console.log(weatherCond)
    // humidity = data.main.humidity;
    // console.log(humidity)
    // wind = data.wind.speed
    // console.log(wind)
    //UV index not in the current weather API!

    // lat = data.coord.lat;
    // lon = data.coord.lon;
    // console.log(data.main.temp,data.weather[0].description,data.main.humidity,data.wind.speed)
    return [data.main.temp,data.weather[0].description,data.main.humidity,data.wind.speed];

};

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// DOM manipulation
// need to add date using moment?
function renderCurrent(temp,weatherCond,humidity,wind){
    if (document.getElementById('currentCard')){
        console.log('worked')
        document.getElementById('currentCard').remove();
    };
    var currentCardEl = document.createElement('div');
    currentCardEl.setAttribute('class','card');
    currentCardEl.setAttribute('style', 'width: 18rem');
    currentCardEl.setAttribute('id','currentCard');
    var currentCardBodyEl = document.createElement('div');
    currentCardBodyEl.setAttribute('class','card-body');
    currentCardBodyEl.innerHTML = `
    <h5 class="card-title">${cityName}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Current Weather</h6>
          <p class="card-text">Temp: ${temp}&deg F</p>
          <p class="card-text">Conditions: ${weatherCond}</p>
          <p class="card-text">Humidity: ${humidity}</p>
          <p class="card-text">Wind Speed: ${wind} mph</p>
    `;
    document.getElementById('currentContainer').append(currentCardEl);
    currentCardEl.append(currentCardBodyEl)
    // currentCardBodyEl.append(currentCardContent);

};

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// CSS classes that will update based on the object data


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// more DOM element creation, get icons from API

function getForecastData(){
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(forecastUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (forecastData){
                console.log('forecast data = '+forecastData);
                // parseForecast(forecastData);
                // return the parsed data as arguments for render
                renderForecast(parseForecast(forecastData))
            });
        } else {
            console.error(response.statusText)
        };
    });

};

// put the Forecast values into an array of objects! Start at index 1 because the first day is repeated in the api
// there are 5 hourly forecasts per day, need to either present them all somehow or get average of all these data points
// https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
function parseForecast(data) {
   var forecast = [];

   for(var i= 1; i < 6; i++) {
       console.log(data);
       forecast.push(
                   {
            date: data.list[i].dt_txt,
            icon: data.list[i].weather[0].icon,
            temp: data.list[i].main.temp,
            wind: data.list[i].wind.speed,
            humidity: data.list[i].main.humidity
        }
       );
   };
   
   console.log('forecast = '+forecast[1].date);
   return forecast;
   
   
    // var forecast = [
    //     {
    //         date: data.list[0].dt_txt,
    //         icon: data.list[0].weather.icon,
    //         temp: data.list[0].main.temp,
    //         wind: data.list[0].wind.speed,
    //         humidity: data.list[0].main.humidity
    //     }
    // ]

};

//take object array and probably dynamically create html elements
function renderForecast(forecastData){
    console.log(forecastData);
    if (document.getElementById('card-row')){
        document.getElementById('card-row').remove()
    };
    var cardRow = document.createElement('div');
    cardRow.setAttribute('class', 'row');
    cardRow.setAttribute('id', 'card-row')
    forecastData.forEach(function(item, index){
        var iconUrl = `http://openweathermap.org/img/wn/${item.icon}@2x.png`
        var foreCardEl = document.createElement('div');
        foreCardEl.setAttribute('class','card col-2');
        foreCardEl.setAttribute('style', 'width: 18rem');
        foreCardEl.setAttribute('id',`forecastCard${index}`);
        var foreCardBodyEl = document.createElement('div');
        foreCardBodyEl.setAttribute('class','card-body');
        foreCardBodyEl.innerHTML = `
        <h5 class="card-title">${item.date}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${cityName} Forecast</h6>
              <p class="card-text">Temp: ${item.temp}&deg F</p>
              <p class="card-text">Humidity: ${item.humidity}</p>
              <p class="card-text">Wind Speed: ${item.wind} mph</p>
              <img src="${iconUrl}">
        `;
        document.getElementById('forecastContainer').append(cardRow);
        cardRow.append(foreCardEl);
        foreCardEl.append(foreCardBodyEl);
    })


    
};
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// add DOM element with a link to the function that dipslays weather each time the button is clicked. probably no localStorage needed
function searchHist(){
    // document.getElementById('history').innerHTML=`
    // <button value='${cityName}'>${cityName}</button>
    // `
    console.log(document.getElementsByClassName('hist'))
    var histCities = [];
    var histBtns = document.getElementsByClassName('hist');
    for (var i = 0;i<histBtns.length;i++){
        histCities.push(histBtns[i].value)
    }
    console.log(histCities + ' = histCities');

    if (!histCities.includes(cityName)){
        var histButton = document.createElement('button');
        histButton.setAttribute('class','hist')
        histButton.value = cityName;
        histButton.textContent = cityName;
        document.getElementById('history').append(histButton);
    }
};

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city - input, submit, add to request Url
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    // console.log('event target = '+event.target);
    // console.log('search button = '+ searchBtn);
    if (event.target === searchBtn){
        // console.log(event.target);
        cityName = cityEl.value;
        // console.log('cityName = '+cityName)
        // getCurrentData();
        // getForecastData();
        // searchHist();
        onButton('search');
    } else{
        // console.log('nope');
        return;
    };
});

document.getElementById('history').addEventListener('click',function(event){
    // console.log(event.target);

    // histBtns.value.includes()
    if (event.target.matches('button')){
        // console.log('worked')
        cityName = event.target.value;
        console.log(cityName);
        onButton('history');
};
});