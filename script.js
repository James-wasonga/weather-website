const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug','Sep','Oct','Nov', 'Dec'];

// const API_KEY = 'c29ac16ed3438cf9497a709d6cb07f0e';
const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';


setInterval(() => {
    const time = new Date();
    // console.log(time);
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrsFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = hoursIn12HrsFormat + ':' + minutes +' ' + `<span>${ampm}</span>`;
    dateEl.innerHTML = days[day] + '  '+ date + ' '+ months[month]; 
 
}, 1000);


function getWeatherData(){
    navigator.geolocation.getCurrentPosition(success => {
        // console.log(success);
         let {latitude, longitude } = success.coords;
        
         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
         .then(response => response.json())
         .then(data => {
            console.log(data);
            showWeatherData(data)
         })
    })
}
getWeatherData();


function showWeatherData(data){
    let [humidity, pressure, sunrise, sunset, wind_speed ] = data.current;

    currentWeatherItemsEl.innerHTML = 

    ` <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}</div> 
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div> 
</div> <div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div> 
</div>
</div> <div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div> 
</div>
</div> <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div> 
</div>`;

}

 