const request = require('request')

// Forecasting
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2b85009548271236313c45cb1a39eef5&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    
    request({url, json: true}, (error,{body} = {}) =>{
        if(error){
            callback('Cannot connect to '+error.hostname, undefined)
        }
        else if(body.error){
            callback(body.error.type, undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" C but feels like " + body.current.feelslike +" C. The humidity is "+ body.current.humidity+".")
        }
    })
}

module.exports = forecast