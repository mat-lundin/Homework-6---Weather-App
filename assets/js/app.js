var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
var cityName = '';
var date = '';
var icon = '';
var temp = '';
var humidity = '';
var wind = '';
var uV = '';

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city - input, submit, add to request Url


// THEN I am presented with current and future conditions for that city and that city is added to the search history
// fetch and object traversal


// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// DOM manipulation


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// CSS classes that will update based on the object data


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// more DOM element creation, get icons from API


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// add DOM element with a link to the function that dipslays weather each time the button is clicked. probably no localStorage needed