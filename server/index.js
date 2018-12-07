const express = require("express");
const bodyParser = require("body-parser");
const massive = require('massive');
require('dotenv').config();
const controller = require("./controller");

const app = express();
const PORT = 4000;
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(dbInstance => { 
     app.set("db", dbInstance); 
}).catch(error => console.log("error in massive connection", error));

app.get("/api/inventory", controller.getInventory);

app.get("/api/product/:id", controller.getSingleProduct);

app.post("/api/product", controller.postProduct);

app.delete("/api/product/:id", controller.deleteProduct);

app.put("/api/product/:id", controller.updateProduct);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));