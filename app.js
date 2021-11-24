const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/EBooks', { useNewUrlParser: true })
const port = 80;

//Define Mongoose Schema
const ebookSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    books: Array
});

const cart = mongoose.model('cart', ebookSchema);

//EXPRESS SPECIFIC CONFIGURATIONS
app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded({ extended: true }))//This middleware helps to bring the form's data to expressjs

//PUG SPECIFIC CONFIGURATIONS
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //Set the views directory


//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
});
app.get('/cart', (req, res) => {
    const params = {}
    res.status(200).render('cart.pug', params);
});
app.post('/cart', (req, res) => {
    var myData = new cart(req.body);
    myData.save().then(() => {
        res.end("This item has been saved in the database");
    }).catch(() => {
        res.send("Item was not saved to the database")
    })
    // res.status(200).render('cart.pug');
});



//START THE SERVER
app.listen(port, () => {
    console.log(`The application started succesfully on port ${port}`);
});