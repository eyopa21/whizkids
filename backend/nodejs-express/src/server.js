//const axios = require("axios");
//import { request, gql, GraphQLClient } from 'graphql-request'
const fetch = require("node-fetch")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

import { request, gql } from 'graphql-request'

const document = gql `
  {
    company {
      ceo
    }
  }
`
request('https://api.spacex.land/graphql/', document).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})


const { login } = require('./login')

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post('/hello', async(req, res) => {
    return res.json({
        hello: "world"
    });
});

app.post('/login', async(req, res) => {
    login(req, res)


})

app.listen(PORT, () => {
    console.log("server is running on port: ", PORT)
});