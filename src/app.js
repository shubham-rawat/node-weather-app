const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Defining Paths For Express Config
const publicDirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine & views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

// Routing
app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Shubham'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Shubham'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        name: 'Shubham',
        text: 'FAQs'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
          }
          
          forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
          })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title : '404',
        name : 'Shubham Rawat',
        msg : 'Help Article Not Found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title : '404',
        name : 'Shubham Rawat',
        msg : 'Page Not Found'
    })
})

app.listen(port,() =>{
    console.log('Server is up and running')
})