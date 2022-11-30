// Import 'express' and "./db2".
const express = require('express');
const db2 = require('./db2');

// Create Express instance.
const app = express();

// Set Express to parse the incoming body as Json.
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    app.listen(1339, function callback() {
        console.log("Server is running and listening at port http://localhost:1339");
    });
}

// TIPS:
// To create a Rest API you can use the "app" variable. This variable contains a method for each HTTP verb.
//    - POST       = app.post(..)
//    - GET        = app.get(..)
//    - PUT        = app.put(..)
//    - PATCH      = app.patch(..)
//    - DELETE     = app.delete(..)

// Create the [GET] / Rest API.


// Create the [GET] /users Rest API.


// Create the [GET] /user/:email Rest API.
// TIPS: To get the email paramater you have to use: "request.params.email".


// Create the [POST] /user Rest API.
// TIPS: To get the body you have to use: "request.body".


// Create the [DELETE] /user/:email Rest API.
// TIPS: To get the email paramater you have to use: "request.params.email".


// Create the [PATCH] /user/:email Rest API.
// TIPS: To get the firstname quer paramater you have to use: "request.query.firstname.toString()".
// TIPS: To get the lastname quer paramater you have to use: "request.query.lastname.toString()".

module.exports = app;