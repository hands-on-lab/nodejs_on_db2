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
app.get("/", function callback(request, response) {
    response.status(200)
            .send("Hello from HandsOnLab!");
});

// Create the [GET] /users Rest API.
app.get("/users", async function callback(request, response) {
    try {

        let users = await db2.findAll();
        response.status(200).json(users);

    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Create the [GET] /user/:email Rest API.
// TIPS: To get the email paramater you have to use: "request.params.email".
app.get("/user/:email", async function callback(request, response) {

    try {

        const user = await db2.findByEmail(request.params.email);

        if (!user)
            response.status(404).send(`The user with email "${request.params.email}" doesn't exist`);
        else
            response.status(200).json(user);

    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Create the [POST] /user Rest API.
// TIPS: To get the body you have to use: "request.body".
app.post("/user", async function callback(request, response) {

    try {

        await db2.create(request.body);
        response.status(201).json(request.body);

    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Create the [DELETE] /user/:email Rest API.
// TIPS: To get the email paramater you have to use: "request.params.email".
app.delete("/user/:email", async function callback(request, response) {

    try {

        const result = await db2.delete(request.params.email);

        if (!result)
            response.status(404).send(`The user with the email ${request.params.email} doesn't exist`);
        else
            response.status(200).send(`The user with the email ${request.params.email} has been deleted`);

    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Create the [PATCH] /user/:email Rest API.
// TIPS: To get the firstname quer paramater you have to use: "request.query.firstname.toString()".
// TIPS: To get the lastname quer paramater you have to use: "request.query.lastname.toString()".
app.patch("/user/:email", async function callback(request, response) {

    const firstname = request.query.firstname ? request.query.firstname.toString() : null;
    const lastname = request.query.lastname ? request.query.lastname.toString() : null;

    try {
        
        const result = await db2.update(request.params.email, firstname, lastname);

        if (!result)
            response.status(404).send(`The user with the email ${request.params.email} doesn't exist`);
        else
            response.status(200).json(result);

    } catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = app;