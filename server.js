// server.js
// Where we'll configure routes and pages
// In package.json, "start": "node server.js" start will begin the app... Now use 'npm start'

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//const port = process.env.PORT || 3000; // process.env store env as key value pairs
const port = 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware lets you configure how your express app works- Here we teach express how to read from static dir
app.use(express.static(__dirname + '/public'));  // __dirname stores the path to the directory

app.use((req, res, next) => {   // Next: you tell express when your Middleware func is done, need to call next()
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});


// Route handlers:
// '/' -> url, the route of the app so we can just use '/'
// req -> request stores info about what is coming in, i.e. headers, body, method
// res -> customize what date you send back
// app.get('/', (req, res) => {
// //res.send('<h1>Hello Express!</h1>')   // res for the http request, getting this back as the body data
// res.send({
//   name: 'Puff',
//   likes: [
//     'Tennis',
//     'Bowling',
//     'IPAs'
//   ]
// })
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my dope azz website on local host 3000!'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});
//*View about by going to localhost:3000/about

app.get('/bad', (req, res) =>   {
  res.send({
    errorMessage: 'Unable to process the request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
});


//app.listen binds the application to a port on our machine
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//*Terminal: 'node server.js' to start listening
// THEN ctrl + c to stop listening
//*Browser: localhost:3000    THEN you can see Hello Express print out in browser
// option/command/i -> Developer tools on chrome
