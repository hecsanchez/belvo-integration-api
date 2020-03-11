const express = require("express");
const app = express();
const port = 5000;
const axios = require('axios');
const bodyParser = require('body-parser');
const moment = require('moment');

const BASE_URL = 'https://sandbox.belvo.co/api';
const USER = '20a17f47-9c76-4001-a8a6-baaacb841324';
const PASSWORD = 'aOm3LokBYwSHNHP40Oq4gj6qVQ1Hvzyyb@cHoi-QMmOyju9JA7M31QyuiPqq2Q2b';

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://belvo-demo.s3-website-us-east-1.amazonaws.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/token", (req, res, next) => {
    const data = {
        id: USER,
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
        res.json(response.data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.toJSON().message
        });
    });
});

app.post("/accounts", (req, res, next) => {
    axios.post(`${BASE_URL}/accounts/`, {
        link: req.body.link
    }, {
        auth: {
            username: USER,
            password: PASSWORD
        },
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.toJSON().message
        });
    });
});

app.post("/transactions", (req, res, next) => {
    axios.post(`${BASE_URL}/transactions/`, {
        link: req.body.link,
        account: req.body.accountId,
        date_from: '2020-01-01',
        date_to: moment().format('YYYY-MM-DD')
    }, {
        auth: {
            username: USER,
            password: PASSWORD
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.toJSON().message
        });
    });
});

app.post("/balances", (req, res, next) => {
    axios.post(`${BASE_URL}/balances/`, {
        link: req.body.link,
        account: req.body.accountId,
        date_from: '2020-01-01',
        date_to: moment().format('YYYY-MM-DD')
    }, {
        auth: {
            username: USER,
            password: PASSWORD
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.toJSON().message
        });
    });
});

app.post("/owners", (req, res, next) => {
    axios.post(`${BASE_URL}/owners/`, {
        link: req.body.link
    }, {
        auth: {
            username: USER,
            password: PASSWORD
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.toJSON().message
        });
    });
});



app.listen(port, () => console.log(`Server running on port ${port}!`))
