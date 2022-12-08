const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const mainRoutes = require('./routes/main');
const cors = require('cors');


// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

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

