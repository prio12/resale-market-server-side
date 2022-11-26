const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

require('dotenv').config();


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8l4usvv.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

    try{

        //const appointmentOptionsCollection = client.db("doctorsPortal").collection("appointmentOptions");
    // const bookingsCollection = client.db("doctorsPortal").collection("bookings");
    // const userCollection = client.db("doctorsPortal").collection("user");
    const categoryCollection = client.db('resale').collection('')

    }


    catch{


    }

}
run().catch(console.log())



app.get("/", async (req, res) => {
    res.send("resale server is running");
  });


  app.listen(port, () => {
    console.log("server is running on port:", port);
  });