const geocode = require(__dirname + '/utils/Geocode.js')
const weatherMap = require(__dirname + '/utils/WeatherMap.js')
const path = require('path')
const hbs = require('hbs')
const express = require('express')

const publicDirectory = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('' , (req , res) =>{
    res.render('' , {
        title : 'Weather app' ,
        author : 'PD'
    })
})

app.get('/weather' , (req , res) =>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide a location for app to work'
        })
    } 
    geocode(req.query.address , (error , {latitude , longtitude , location}) =>{
        if(error) {
            return res.send({
                title : 'Weather app' ,
                author : 'PD' ,
                error : error
            })
        }
        weatherMap(latitude , longtitude , (error , {data}) =>{
            if(error) {
                return res.send({
                    title : 'Weather app' ,
                    author : 'PD' ,
                    error : error
                })
            }
            res.send({
                title : 'Weather app' ,
                author : 'PD' ,
                location : location,
                weatherData : 'The current temperature is ' + data.current.temp
            })
        })
    })
})

app.get('/about' , (req , res) =>{
    res.render('about' , {
        title : 'About the app' ,
        author : 'PD'
    })
})

app.get('/help' , (req , res) =>{
    res.render('help' , {
        title : 'Need help with the app?' ,
        author : 'PD'
    })
})

app.get('/help/*' , (req , res) =>{
    res.render('404' , {
        title : '404 : Help article not found!' ,
        author : 'PD',
    })
})


app.get('*' , (req , res) =>{
    res.render('404' , {
        title : '404 : Page not found!' ,
        author : 'PD'
    })
})


app.listen(port , () =>{
    console.log('Server is fired started on port ' + port)
})














// app.get('/weather' , (req , res) =>{
//     res.send(geocode(address , (error , {latitude , longtitude , location}) =>{
//         if(!address){
//           return res.send('Please provide a location')
//         }else{
//           res.send('Error: ' + error)
//           res.send('geoData: ' + location)
//           weatherMap(latitude , longtitude , (error , {data}) =>{
//             res.send('Error: ' + error)
//             res.send('Response: ' + data.current.temp)
//           })
//         }
//     }))
// })