const express = require("express")
const app = express()
const PORT = 3000
const methodOverride = require("method-override")

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

app.use( methodOverride("_method") )


// app.use( , "epress-react-views")

// view body of a post request
app.use(express.urlencoded({extended:false}));

// ROUTES
app.get('/', ( req, res ) => {
    // res.send(`<h1> WELCOME TO FRUITS-VEGGIES </h1>`)
    res.render("Home")
})

// SHOW All
app.get('/fruits', async( req, res ) => {
    const fruits = await Fruit.find({})
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

app.post('/fruits', async ( req, res ) => {
    const fruit =  req.body

    try {
        if( fruit.readyToEat === "on" ){
            fruit.readyToEat = true
        } else {
            fruit.readyToEat = false
        }
        await Fruit.create( fruit )
        res.redirect('/fruits')
        
    } catch (error) {
        res.status(500).send( error )
    }
    

})

// POST TRY
// app.post('/fruits/new', async ( req, res ) => {
//     // res.send(req.body) //checking thunderclient
//     try {
//         const fruit = await Fruit.create( req.body )
//         res.status(200).json(fruit)       
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json( { message: error.message })
//     }
// })

app.post('/veggies', async ( req, res ) => {
    // res.send(req.body) // checking thunderclient
    let veg = req.body
    try {
        if( veg.readyToEat === "on" ){
            veg.readyToEat = true
        } else {
            veg.readyToEat = false
        }

        const veggie = await Veggie.create( veg )
        // res.status(200).json(veggie)

        res.redirect( '/veggies' )
    } catch (error) {
        console.log(error)
        res.status(500).json( { message: error.message })
    }
})

// GET BY NAME
app.get(`/fruits/:id`, async ( req, res ) => {
    let { id } = req.params

    try {
        let fruit = await Fruit.findById( id )
        res.render( "Index", { type: "fruits" ,food: fruit } )
    } catch (error) {
        res.status(500).send( error )
    }

})

app.delete('/fruits/:id', async ( req, res ) => {
    // res.send('...deleting')

    let { id } = req.params

    await Fruit.findByIdAndDelete( id )
    res.redirect( '/fruits' )
})

app.get('/veggies/:id', async ( req, res ) => {
    // res.render("Index", { food: req.params.id})

    let { id } = req.params

    try {
        let veg = await Veggie.findById( id )
        res.render( "Index", { food: veg, type: "veggies" } )
        
    } catch (error) {
        res.status(500).send( error )
    }
})

app.delete( '/veggies/:id', async ( req, res ) => {

    let { id } = req.params
    try {
        await Veggie.findByIdAndDelete( id )
        res.redirect( '/veggies' )
    } catch (error) {
        res.status(500).send( error )
    }
})

// CONNECT TO DATABASE
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
    app.listen(PORT, ( req, res ) => {
        console.log(`Server is running on PORT ${PORT}`)
    })
});