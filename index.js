const express = require("express");
const app = express();
const port = 5000;
const axios = require('axios');

const BASE_URL = 'https://sandbox.belvo.co/api';
const USER = '20a17f47-9c76-4001-a8a6-baaacb841324';
const PASSWORD = 'aOm3LokBYwSHNHP40Oq4gj6qVQ1Hvzyyb@cHoi-QMmOyju9JA7M31QyuiPqq2Q2b';

const PROD_URL = 'https://api.belvo.co/api'
const PROD_USER = '5b05fe36-cfaa-479f-84d8-6a3e1bc75275';
const PROD_PASSWORD = 'vOii593Orv0eo5xubv7QrPU-ncoU5LvBb3U5dRDsz-_asRJSXKKipkkF*4PH4DW5'

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/accounts", (req, res, next) => {
    axios.post(`${BASE_URL}/accounts`, {}, {
        auth: {
            username: USER,
            password: PASSWORD
        }
    })
    .then(response => {
        console.log(response.data);
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});

app.get("/token", (req, res, next) => {
    const data = {
        id: PASSWORD,
        password: PASSWORD,
        scopes: "read_institutions,write_links,read_links,delete_links"
    }

    const config = {
        auth: {
            username: USER,
            password: PASSWORD
        }
    }
    
    axios.post(`${BASE_URL}/token/`, data, config)
    .then(response => {
        console.log(response.data.toJSON());
        res.json(response.data.toJSON());
    })
    .catch(error => {
        console.log('error', error)
        res.status(405).send({
            message: error.toJSON().message
         });
    });
});

app.listen(port, () => console.log(`Server running on port ${port}!`))
