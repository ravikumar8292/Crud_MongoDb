const express = require("express");
const dbConnect = require('./mongoDb');
const mongodb = require('mongodb');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', async (req,res)=>{
    const data = await dbConnect();
    const result = await data.find().toArray();
    res.send(result);
})

app.post('/', async (req,res)=>{
    const data = await dbConnect();
    const result = await data.insertOne(req.body);
    res.send(result);
})

// app.put('/', async (req,res)=>{
//     const data = await dbConnect();
//     const result = await data.updateOne(           // update static data
//         {price:12000},
//         {$set: {name:"vivo y55"}}
//     );
//     res.send(result);
// })
app.put('/:name', async (req,res)=>{
    const data = await dbConnect();
    const result = await data.updateOne(             //update dynamic data
        {name: req.params.name},
        {$set: req.body}
    );
    res.send({result:"update"});
    console.log(result);
})

app.delete('/:id', async (req,res)=>{
    // console.log(req.params.id);
    const data = await dbConnect();
    const result = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.send(result);
})

app.listen(port , ()=>{
    console.log(`app listen on port ${port}`);
})


