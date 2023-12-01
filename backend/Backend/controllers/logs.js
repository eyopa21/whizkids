const { request, gql, GraphQLClient } = require("graphql-request");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { sendEmail } = require('./sendMessage')
dotenv.config();
const client = new GraphQLClient(process.env.HASURA_URI, {
    headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
    }
});

exports.logs = async(req, res, next) => {
    const { event } = req.body;
    console.log("logs", event)



}