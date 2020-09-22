const request = require('request')

// Geocoding
const geocode = (city, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(city) +'.json?access_token=pk.eyJ1Ijoic2h1YmhyYXdhdCIsImEiOiJja2V1YzF6Z3ExZTF6MnduMHBmdHpqaDZuIn0.RSNGI9tcJSNGDQMxEiAx4w&limit=1'
    request({url, json: true},(error,{body} = {}) =>{
        if(error){
            callback('Cannot connect to '+error.hostname,undefined)
        }
        else if(body.features.length === 0){
            callback('No such city found',undefined)
        }
        else{
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })

        }
    })
}

module.exports = geocode