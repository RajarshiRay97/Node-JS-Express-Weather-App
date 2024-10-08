const request = require('request');

// // Our own asynchronous function for getting the weather forcast (input: latitude and longitude, output: weather status) activity
const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=a3fa8fcd0331852d09361485a901185d&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

    request({
        url,
        json: true
    }, (error, {body}={})=>{
        if (error){
            callback('Unable to connect with weather services!', undefined);
        }
        else if (body.error){
            callback(body.error.info, undefined);
        }
        else {
            const data = body.current;

            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees Celsius outside. It feels like ${data.feelslike} degrees Celsius out. The wind speed is ${data.wind_speed} km/hr and the humidity is ${data.humidity}% currently.`);
        }
    });
};

module.exports = forecast;