const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// Mongoose configuration
mongoose.set('strictQuery', true);

// Import routes
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
const loggedRoutes = require('./routes/logged');

// Express app
const app = express();

// Ejs configuration
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use((req,res, next) => {
    console.log(req.path, req.method);
    next();
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Mongoose connection 
mongoose.connect(process.env.MONGO_URI)
.then( () => {
    // Listen for requests
    let port = process.env.PORT;
    if(port==null || port==""){
      port=8000;
    };

    app.listen(port , () => {
        console.log(`Connected to the database & server running on port ${port}`);
    })
})
.catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
});

// Routes
app.use('/main', mainRoutes);
app.use('/user', userRoutes);
app.use('/logged', loggedRoutes);

