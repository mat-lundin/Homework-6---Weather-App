var apiKey = 'c6e306e42b1bc0ce9623a1e6787fad9a'
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
var cityEl = document.getElementById('city')
var searchBtn = document.getElementById('searchbtn')

//call all data functions when a city is selected via search or the history
function onButton(source){
    if (source = 'search') {
        getCurrentData();
        getDailyData();
        searchHist();
    } else {
        getCurrentData();
        getDailyData();
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
                // console.log(data);
                parseCurrent(data);
                // return the parsed data as arguments for render
                // renderCurrent(parseData())
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

    lat = data.coord.lat;
    lon = data.coord.lon;

    return data.main.temp,data.weather[0].description,data.main.humidity,data.wind.speed;

};

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// DOM manipulation
function renderCurrent(temp,weatherCond,humidity,wind){

}

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// CSS classes that will update based on the object data


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// more DOM element creation, get icons from API

function getDailyData(){
    var dailyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(dailyUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data){
                // console.log(data);
                parseDaily(data);
                // return the parsed data as arguments for render
                // renderDaily(parseDaily())
            });
        } else {
            console.error(response.statusText)
        };
    });

};

// put the daily values into an array of objects! Start at index 1 because the first day is repeated in the api
function parseDaily(data) {
   var forecast = [];

   for(var i= 1; i < 5; i++) {
       forecast.push(
                   {
            date: data.list[i].dt_txt,
            icon: data.list[i].weather.icon,
            temp: data.list[i].main.temp,
            wind: data.list[i].wind.speed,
            humidity: data.list[i].main.humidity
        }
       );
   };
   
   console.log('forecast = '+forecast[1].date);
   
   
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
function renderDaily(dailyData){
    var iconUrl = `http://openweathermap.org/img/wn/${forecast[0].icon}@2x.png`
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
        // getDailyData();
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