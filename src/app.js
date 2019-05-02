const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherReport = require('./utils/weatherReport')
const geocode = require('./utils/geocode')


//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


const app = express()

//setup handlebar engine and views folder
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setting up static dir to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{title:'Weather App',name:'Dhanush Hegde'})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About me',name:'Dhanush Hegde'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',name:'Dhanush Hegde',message:"Please reach us on the following number for any queries",phNumber:9449966422})
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide an address'})
    }
    
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
             
        }
        weatherReport(latitude,longitude,(error,{summary,currentTemp,precipProbability}={})=>{
            // console.log(data)
            if(error){
                return res.send({error:error})
            }
            return res.send({location:req.query.address,forecast:summary,currentTemp:currentTemp,rainfallProbability:precipProbability})
        })
    })
    //res.send({location:'Mangalore',address:req.query.address,forecast:"The weather is cloudy."})
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return res.send({error:'You must provide a search term'})
    }

    res.send({productId:'101', productName:'Seed balls'})
})

app.get('/help/*',(req,res)=>{
    // res.send("404!Article not found!!")
    res.render('404',{errorMsg:'404!Article not found!!',name:'Dhanush Hegde'})
})

app.get('*',(req,res)=>{
    // res.send("My 404 Page")
    res.render('404',{errorMsg:"Error:404, Page not found!",name:'Dhanush Hegde'})
})


app.listen(3000,()=>{
    console.log('Server running on port 3000')
})

