const axios = require("axios")
const fs = require('fs')
const key = JSON.parse(fs.readFileSync(__dirname + '/API keys.txt').toString()).weather

const weatherMap = (lat , lon , callback = ()=>{}) =>{
    const weatherOptions = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/onecall',
        params : {
            lat : lat,
            lon : lon,
            appid : key
        }
    }; 

        
    axios.request(weatherOptions).then((response) => {
        callback(undefined , response);
        }).catch( (error) => {
        if(error.response){
            callback('Invalid request! => Weather API' , {})
        }
        else if(error.request){
            callback("Couldn't get a response from the server! => Weather API" , {})
        }
        else{
            callback('There was an error sending the request to the server! => Weather API' , {})
        }
    });
}


module.exports = weatherMap


  
  
  
  
