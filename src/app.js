const path = require('path');       // Node js core module
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const express = require('express');
const hbs = require('hbs');

const app = express();

const port = 3000;      // Development port (Note- HTTP default port is 80)

// Path defination to configure Express App
const publicDirectoryPath = path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials/');

// app.set() is used to set up the settings of the Express App
// to set up the template engine/ view engine in Express app
app.set('view engine', 'hbs');

// by default Express app tries to find the hbs view/template in the views folder. But if we customize the name of our views directory (here, for example, we are storing the hbs views in templates directory), we have to set the views path
app.set('views', viewsPath);

// to register/access the handlebars partials in express app
hbs.registerPartials(partialsPath);

// use() method is used to customize the Express App
// Here we are using middleware function express.static() method, to serve up the static assests from the given absolute directory path
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        description: 'Use This Site to Know The Weather Forecast of your Location',
        name: 'Rajarshi Ray'
    });
});

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'Abot Me',
        name: 'Rajarshi Ray'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'If there is any query please reach out to rajarshiray2016@gmail.com',
        name: 'Rajarshi Ray'
    });
});

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Location must be provided'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName}={})=>{
        if (error) return res.send({
            error
        });
    
        forecast(latitude, longitude, (error, weatherData)=>{
            if (error) res.send({
                error
            });

            res.send({
                forecast: weatherData,
                location: placeName,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: '404 Page',
        name: 'Rajarshi Ray',
        errorMessage: 'Help Article not found.'
    });
});

// to send back 404 response (page not found) if the requested route does not find any match above
// wildcard(*) - any number of characters, that does not match with any of the above routes
app.get('*',(req, res)=>{
    res.render('404',{
        title: '404 Page',
        name: 'Rajarshi Ray',
        errorMessage: 'Page not found'
    });
});

// to start/listen a web server in a particular port
app.listen(port, ()=>{
    console.log('Server is up and running on port '+ port);
    console.log('To access the server endpoints go to the below base url -');
    console.log(`http://localhost:${port}/`);
});