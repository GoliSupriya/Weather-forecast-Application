const weatherForm=document.querySelector('.weather-form');
const cityInput=document.querySelector('.cityInput');
const card=document.querySelector('.card');
const apikey='8b0ca2358b6267c5683e08c6fc055ddc';

weatherForm.addEventListener('submit',async event=>{
    event.preventDefault();

    const city=cityInput.value;
    if(city){
        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError('Failed to fetch weather data. Please try again later.');
        }
    }
    else{
        displayError('Please enter a city name');
    }
});

async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiUrl);

    if(!response.ok){
        throw new Error('could not fetch weather data');
    }
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);
    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;

    card.textContent='';
    card.style.display='flex';

    const cityDisplay=document.createElement('h2');
    const tempDisplay=document.createElement('p');
    const humidityDisplay=document.createElement('p');
    const descDisplay=document.createElement('p');
    const weatherEmoji=document.createElement('p');

    // Create Elements
    cityDisplay.textContent=`Weather in ${city}`;
    tempDisplay.textContent=`Temperature: ${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=`${description}`;
    weatherEmoji.textContent=getWeatherEmoji(id);

    // Add Classes
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay'); 
    humidityDisplay.classList.add('humidityDisplay');  
    descDisplay.classList.add('descDisplay'); 
    weatherEmoji.classList.add('weatherEmoji');
    
    // Append to Card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200 && weatherId<300): return '⛈️'; 
        case(weatherId>=300 && weatherId<400): return '🌦️';
        case(weatherId>=500 && weatherId<600): return '🌧️';
        case(weatherId>=600 && weatherId<700): return '❄️';
        case(weatherId>=700 && weatherId<800): return '😶‍🌫️';
        case(weatherId===800): return '☀️';
        case(weatherId>800 && weatherId<900): return '☁️';
        default: return '❓';
    }
}

function displayError(message){
    const errorDisplay=document.createElement('p');
    errorDisplay.textContent=message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent='';
    card.style.display='flex';
    card.appendChild(errorDisplay);
}