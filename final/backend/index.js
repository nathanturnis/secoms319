//setting up server
var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "se319final";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images/products", express.static("images/products"));
app.use("/images/ratings", express.static("images/ratings"));
app.use("/images/listings", express.static("images/listings"));

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

//returns a list of all the products
app.get("/allProducts", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("products")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

//returns a list of all the listings
app.get("/allListings", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("listings")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
})

//updates a listing and its information
app.put("/updateListing", async (req, res) => {
    await client.connect();

    const id = req.body.id;

    const results = await db
        .collection("listings")
        .updateOne({ id: id }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                price: req.body.price,
                category: req.body.category,
                condtion: "like-new",
                location: req.body.location,
                state: req.body.state,
                zipcode: req.body.zipcode,
                sellby: req.body.sellby
            }
        });
    res.status(200);
    res.send(results);
})

//creates a new listing
app.post("/addListing", async (req, res) => {
    await client.connect();

    const newDocument = {
        "id": req.body.id,
        "title": req.body.title,
        "description": req.body.description,
        "image": req.body.image,
        "price": req.body.price,
        "category": req.body.category,
        "condtion": "like-new",
        "location": req.body.location,
        "state": req.body.state,
        "zipcode": req.body.zipcode,
        "sellby": req.body.sellby
    }

    const results = await db.collection("listings").insertOne(newDocument);
    console.log(results);
    res.status(200);
    let dataToSend = [];
    dataToSend[0] = newDocument;
    res.send(dataToSend);
})

//deletes a listing
app.delete("/deleteListing", async (req, res) => {
    await client.connect();

    const id = req.body.id;

    const results = await db.collection("listings").deleteOne({ id: id });
    console.log(results);
    res.status(200);
    res.send(results);
})