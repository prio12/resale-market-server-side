const express = require('express');
const app = express();
const cors = require('cors');
// const jwt = require('jsonwebtoken')
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

    const categoryCollection = client.db('resale').collection('productCategoryCollection');
    const phoneCollection = client.db('resale').collection('phoneCollection');
    const userCollection = client.db('resale').collection('users')
    const bookingCollection = client.db('resale').collection('bookingCollection');
    



    app.get('/category',async(req,res) =>{
        const query = {};
        const category = await categoryCollection.find(query).toArray();
        res.send(category)
    })

    app.post('/collection',async(req,res) =>{
      const product = req.body;
      const result = await phoneCollection.insertOne(product);
      res.send(result)
    })

    app.get('/collection/:id',async(req,res) =>{
       const id = req.params.id;
       const query = {
        categoryId:id
       }
       const collection = await phoneCollection.find(query).toArray();
       res.send(collection) 
        
    })

    //users collection




    app.post('/users', async(req,res) =>{
      const user = req.body;
      const result = userCollection.insertOne(user);
      res.send(result)
    })

    app.get('/users', async(req,res) =>{
      const role = req.query.role;
      const query = {role: role}
      const users = await userCollection.find(query).toArray();
      res.send(users)
    })
    //get admin 
    app.get('/users/admin/:email', async (req,res) =>{
      const email = req.params.email;
      const query ={email}
      const user = await userCollection.findOne(query);
      res.send({isAdmin: user?.role ==='Admin'})
    })

    //get seller
    app.get('/users/seller/:email', async (req,res) =>{
      const email = req.params.email;
      const query ={email}
      const user = await userCollection.findOne(query);
      res.send({isSeller: user?.role ==='Seller'})
    })

    //get Buyers

    app.get('/users/buyer/:email', async (req,res) =>{
      const email = req.params.email;
      const query ={email}
      const user = await userCollection.findOne(query);
      res.send({isBuyer: user?.role ==='Buyer'})
    })


    //booking collection

    app.post('/bookings',async(req,res) =>{
      const bookings = req.body;
      const result = bookingCollection.insertOne(bookings);
      res.send(result)
    })

    app.get('/bookings', async(req,res) =>{
      const email = req.query.email;
      console.log(email)
      const query = {email: email};
      const bookings = await bookingCollection.find(query).toArray();
      res.send(bookings)
    })

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