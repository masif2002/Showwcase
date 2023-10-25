const express = require('express');
const cors = require('cors');
require('dotenv').config()

const fetch = (...args) => 
    import ('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyparser = require('body-parser');

const CLIENT_ID = "4b9f0b4d2f261ef00d45";

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.get('/getAccessToken', async (req,res) => {
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("http://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
})

app.get('/getUserData', async (req, res) => {
    console.log(req.get('Authorization'));
    
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }}).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            res.json(data);
        })
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
})
