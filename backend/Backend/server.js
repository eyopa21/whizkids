const axios = require("axios");
const fetch = require("node-fetch")
const { request, gql, GraphQLClient } = require("graphql-request");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

console.log("date", Date.now())


const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
    headers: {
        "x-hasura-admin-secret": '1234',
    }
});
const PORT = process.env.PORT || 4001;
const app = express();
app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
}));



const general = require('./routes/general')
const image = require('./routes/image')
const auth = require('./routes/auth')
const guest = require('./routes/guest')
const sendMessage = require('./routes/sendMessage')
const logs = require('./routes/logs')
app.use('/api/v1/general', general);
app.use('/api/v1/auth', auth);
app.use('/api/v1/image', image);
app.use('/api/v1/guest', guest);
app.use('/api/v1/email', sendMessage);
app.use('/api/v1/logs', logs);





const bcrypt = require("bcrypt");
const hashedPassword = bcrypt.hash('password', 10).then(res => {

    console.log(res)
})



















// Request Handler
app.post('/userSignUp', async(req, res) => {
    signUp(req, res);

});


app.post('/doctorsignup', async(req, res) => {
    doctorSignUp(req, res);
})








app.listen(PORT, () => {
    console.log("app is running on server", PORT);
});