const axios = require("axios")
const fs = require('fs')
const key = JSON.parse(fs.readFileSync(__dirname + '/API keys.txt').toString()).mapbox

const geocode = (locAddress,callback = () =>{}) =>{

    const geocodingOptions = {
        method : 'GET',
        url : 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + locAddress +'.json',
        params : {
            access_token : key,
            limit : '1'
        }
    }

    axios.request(geocodingOptions).then( ({data}) =>{
        const loc = data.features[0]
        if(typeof loc === 'undefined'){
            callback('No matching location found! Please modify your search text' , {})
        }else{
            callback(undefined , {
                latitude : loc.center[1],
                longtitude : loc.center[0],
                location : loc.place_name
            })
        }
    }).catch( (error) =>{
        if(error.response){
            callback('Invalid request! => Geocode API' , {})
          }
          else if(error.request){
            callback("Couldn't ge a response from the server! => Geocode API" , {})
          } 
          else{
            callback('There was an error sending the request to the server! => Geocode API' , {})
        }
    })
}

module.exports = geocode



