const request = require('request');

// // Our own asynchronous function for forward geocoding (address to latitude and longitude) activity
const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmlzaGktMjAyNCIsImEiOiJjbHprNXd2Njcwb2tkMmpyMDFxY2c3Nnh4In0.7-P-5ijkhjwk6N61nl5Vxg&limit=1`;

    request({
        url,
        json: true
    },(error, {body}={})=>{
        if (error) {
            callback('Unable to connect with location services!', undefined);
        }
        else if (body.message){
            callback(`Unable to access Mapbox API - ${body.message}`, undefined);
        }
        else if (!body.features.length){
            callback('Location not found! Please provide a valid location.', undefined);
        }
        else {
            callback(undefined, {
                placeName: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
};

module.exports = geocode;