const express = require('express');
const axios = require('axios');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const header = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
}


//////////////
//          //
//  LISTEN  //
//          //
//////////////

app.listen(port, () => {
    console.log("App listening on port " + port);
})



////////////
//        //
//   GET  //
//        //
////////////

app.get('/', (req, res) => {
    res.status(200).header(header).send("Server Running at Port 3000");
})


app.get('/cat/:c', (req, res) => {
    const { c } = req.params;
    axios
        .get('https://inshorts.deta.dev/news?category=' + c)
        .then(answer => {
            x = answer.data;
            res.status(200).header(header).send(x);
        })
        .catch(error => {
            console.log(`statusCode: 404\n`);
            res.status(404).send("Failed");
        });
})
app.get('/noti', (req, res) => {
    axios
        .get('https://newsapi.org/v2/everything?q=india&from=2023-01-17&sortBy=publishedAt&apiKey=c939257a6df04d6e8dbfb99ee1aa0842')
        .then(answer => {
            res.status(200).header(header).send(answer.data);
        })
        .catch(error => {
            console.log(`statusCode: 404\n`);
            res.status(404).send("Failed");
        });
})

app.get('/country/:country', (req, res) => {
    const { country } = req.params;
    axios
        .get("https://saurav.tech/NewsAPI/top-headlines/category/general/" + country + ".json")
        .then(answer => {
            res.status(200).header(header).send(answer.data);
        })
        .catch(error => {
            console.log(`statusCode: 404\n`);
            res.status(404).send("Failed");
        });
})


app.get('/news/allnews', (req, res) => {
    // const { query } = req.params;
    // const { category } = req.params;
    // var url;

    // if (category != null && query != null) {
    //     url =
    //         "https://newsapi.org/v2/top-headlines?q=" + query + "&category=" + category + "&sortBy=publishedAt&apiKey=f91f9ae4b85f41ff954bb7080170b604";
    // } else if (category != null) {
    //     url =
    //         "https://newsapi.org/v2/top-headlines?category=" + category + "&sortBy=publishedAt&apiKey=f91f9ae4b85f41ff954bb7080170b604";
    // } else {
    //     url =
    //         "https://newsapi.org/v2/top-headlines?q=in&sortBy=publishedAt&apiKey=f91f9ae4b85f41ff954bb7080170b604";
    // }

    url =
    "https://newsapi.org/v2/top-headlines?country=in&sortBy=publishedAt&apiKey=f91f9ae4b85f41ff954bb7080170b604";

    axios
        .get(url)
        .then(answer => {
            res.status(200).header(header).send(answer.data);
        })
        .catch(error => {
            console.log(`statusCode: 404\n`);
            res.status(404).send("Failed");
        });
})