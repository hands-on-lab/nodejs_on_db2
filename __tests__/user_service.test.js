
const app = require("../src/server");
const request = require('supertest')(app);

it("2 + 2 is?", () => {
  expect(2 + 2).toEqual(4);
});

it("Test the Rest API at path /", async () => {

  const response = await request.get('/')
  expect(response.statusCode).toEqual(200);
  expect(response.text).toEqual("Hello from HandsOnLab!");
});

it("Test the Rest API at path /user", async () => {

  const response = await request.get('/users');
  expect(response.body).toContainEqual({"domain": "", "email": "andrea.dimaio@it.ibm.com", "firstname": "Andrea", "lastname": "Di Maio"});
});

it("Test the Rest API at path /user/andrea.dimaio@it.ibm.com", async () => {

  const response = await request.get('/user/andrea.dimaio@it.ibm.com');
  expect(response.body).toEqual({"domain": "", "email": "andrea.dimaio@it.ibm.com", "firstname": "Andrea", "lastname": "Di Maio"});
});
