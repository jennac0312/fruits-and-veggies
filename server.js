const express = require("express")
const app = express()
const PORT = 3000

require('dotenv').config() // why?

const MONGO_URI = process.env.MONGO_URI
const mongoose = require("mongoose")

// MODELS
const Fruit = require('./models/Fruit')
const Veggie = require("./models/Veggie")
// const Veggie = require('./models/Veggie')


//  MIDDLEWARE
app.set("view engine", "jsx")
// app.engine('jsx', require('jsx-view-engine').createEngine()); // WRONG ONE!!!
app.engine("jsx", require("express-react-views").createEngine());

// use json
app.use(express.json())


// app.use( , "epress-react-views")

// view body of a post request
// app.use(express.urlencoded({extended:false}));




// ROUTES
app.get('/', ( req, res ) => {
    // res.send(`<h1> WELCOME TO FRUITS-VEGGIES </h1>`)
    res.render("Home")
})

// SHOW All
app.get('/fruits', async( req, res ) => {
    const fruits = await Fruit.find()
    res.render('Show', { type: "fruits", foods: fruits })
})
app.get('/veggies', async ( req, res ) => {
    const veggies = await Veggie.find()
    res.render('Show', { type: "veggies", foods: veggies })
})

// NEW
app.get('/fruits/new', ( req, res ) => {
    res.render("New", { type: 'fruits' })
})

app.get('/veggies/new', ( req, res ) => {
    res.render("New", { type: 'veggies' })
})

// POST TRY
app.post('/fruits/new', async ( req, res ) => {
    // res.send(req.body) //checking thunderclient
    try {
        const fruit = await Fruit.create( req.body )
        res.status(200).json(fruit)       
    } catch (error) {
        console.log(error.message)
        res.status(500).json( { message: error.message })
    }
})

app.post('/veggies/new', async ( req, res ) => {
    // res.send(req.body) // checking thunderclient
    try {
        const veggie = await Veggie.create( req.body )
        res.status(200).json(veggie)
    } catch (error) {
        console.log(error)
        res.status(500).json( { message: error.message })
    }
})

// GET BY NAME
app.get(`/fruits/:param`, async ( req, res ) => {
    const { param } = req.params
        const name = await Fruit.find({ name: param })
        const id = await Fruit.find({ id: param })

        if(name){
            // res.send('fruit exists')
            res.send(`${name.length}`)
            // res.send("namename" + name)
            // res.render("Name", { food: name, type:'fruits' })
        } else if(id) {
            res.send("id")
            // res.render("Index", { food: id, type:"fruits" })
        } else {
            res.send('cant find fruit')
        }

    // try {
    //     const fruit = await Fruit.find({ name: name })
    //     res.render("Index", { food: fruit })
        
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({ message: error.message })
    // }
})

app.get('/veggies/:id', ( req, res ) => {
    res.render("Index", { food: req.params.id})
})

// CONNECT TO DATABASE
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
    app.listen(PORT, ( req, res ) => {
        console.log(`Server is running on PORT ${PORT}`)
    })
});