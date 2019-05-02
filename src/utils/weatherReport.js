const request = require('request')

const getWeatherReport = (latitude,longitude,callback)=>{

const url =`https://api.darksky.net/forecast/376a14c29800259fc04dc53dd750d8ea/`
+//12.8875,74.8412
latitude+","+longitude
+`?units=si`

request({url,json:true},(error,{body})=>{
    if(error){
       // console.log('Unable to connect to weather services')
       callback('Unable to connect to weather services')
    }
    else if(body.error) {
        //console.log('Unable to find location')
        callback('Unable to find location')
    }
    else{
        callback(undefined,{summary:body.daily.data[0].summary,currentTemp:body.currently.temperature,precipProbability:body.currently.precipProbability})
// console.log(response.body.currently)
// console.log(response.body.timezone)
// console.log(response.body.daily.data[0].summary +' It is currently '+response.body.currently.temperature+' Celsius out there. There are '+response.body.currently.precipProbability+'% chances of rain.')
}
})

}

module.exports = getWeatherReport;