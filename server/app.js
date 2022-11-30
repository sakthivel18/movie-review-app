const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes')
const MongoStore = require('connect-mongo');

const app = express();
const port = 5000;
const host = 'localhost';

mongoose.connect('mongodb://0.0.0.0:27017/movie_reviews', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(port, host, () => {
        console.log('Server started and listening on port ' + port);
    });
}).catch(err =>  console.log(err.message));

const corsOptions ={
    origin: 'http://localhost:3000', 
    credentials: true,            
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
  }); */
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/movie_reviews'}),
        cookie: {secure: false, maxAge: 60*60*1000}
        })
);
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

app.use(session({
    secret: 'this is a secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(morgan('tiny'));

app.use('/user', userRoutes);
app.use('/movies',movieRoutes);
