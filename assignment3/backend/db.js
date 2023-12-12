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

//method 
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
    console.log(req.body);

    const newDocument = {
        "id": req.body.id,
        "title": req.body.title,
        "price": req.body.price,
        "description": req.body.description,
        "category": req.body.category,
        "image": req.body.image,
        "rating": {
            "rate": req.body.rating.rate,
            "count": req.body.rating.count
        }
    };

    const results = await db.collection("fakestore_catalog").insertOne(newDocument);
    console.log(results);
    res.status(200);
    let dataToSend = [];
    dataToSend[0] = newDocument;
    res.send(dataToSend);


})

app.put("/update", async (req, res) => {
    await client.connect();

    const id = req.body.itemId;
    const price = req.body.newPrice;
    console.log(id);
    console.log(price);
    const results = await db
        .collection("fakestore_catalog")
        .updateOne({ id: id },
            {
                $set: {
                    price: price
                }
            });
    res.status(200);
    res.send(results);

});

app.delete("/deleteProduct", async (req, res) => {
    await client.connect();

    const values = Object.values(req.body);

    const id = values[0];

    const results = await db.collection("fakestore_catalog").deleteOne({ id: id });
    console.log(results);
    res.status(200);
    res.send(results);
})