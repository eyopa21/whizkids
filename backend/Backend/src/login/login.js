require('dotenv').config()
const { request, gql, GraphQLClient } = require("graphql-request");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
    headers: {
        "x-hasura-admin-secret": "hakime",
    },
});


const HASURA_OPERATION = `
query MyQuery($email: String!) {
  users(where: {email: {_eq: $email}}) {
    id
    email
    full_name
    phone_number
    sex
    password
    updated_at
    created_at
    appointments {
      id
      note
      price
      date
    }
  }

    doctors(where: {email: {_eq: $email}}) {
      email
      id
      full_name
      phone_number
      password
      updated_at
      created_at
      sex
      appointments {
        id
        note
        price
        date
      }
    }
}
`;


const login = async(req, res) => {
    //const { email } = req.body.input;
    console.log("req");

};




module.exports = { login };