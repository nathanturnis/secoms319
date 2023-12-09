var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/getAllRobots", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("fakestore_catalog")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
})

app.get("/:id", async (req, res) => {
    const productid = Number(req.params.id);
    console.log("Product to find :", productid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "id": productid };

    const results = await db.collection("fakestore_catalog")
        .findOne(query);

    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.post("/addProduct", async (req, res) => {
    await client.connect();
    const values = Object.values(req.body);

    const id = values[0];
    const title = values[1];
    const price = values[2];
    const description = values[3];
    const category = values[4];
    const image = values[5];
    const rating = Object.values[values];
    const rate = rating[0];
    const count = rating[1];

    const newDocument = {
        "id": id,
        "title": title,
        "price": price,
        "description": description,
        "category": category,
        "image": image,
        "rating": {
            "rate": rate,
            "count": count
        }
    };
})