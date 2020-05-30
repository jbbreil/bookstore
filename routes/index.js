const express = require('express');
var router = express.Router();
// Import request statemanent into the server
var Books = require('../models/book.js');


/***** SET UP THE ROUTER/CONTROLLERS *****/

router.get('/', (req, res) => {
    res.send('Vänligen använd: http://localhost:5000/book')
    });

router.get('/book', (req, res) => {
    // Retrive records from MongoDB collection
    Books.find(function(err, books) {// Second parameter returns the collection records from MongoDB and put them inside the list property which contain the table-layout
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

router.get('/book/:_id', (req, res) => {
    // Retrive a specific MongoDb collection by id 
    Books.findById(req.params._id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.delete('/book/:_id', (req, res) => {
    Books.findByIdAndRemove(req.params._id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
        //res.redirect('/books');
    });
});

// Parameters send via form submition and pass to the req object body attribute (req.body)
router.post('/book/', (req, res) => {
    var book = new Books();
    book.title = req.body.title;
    book.isbn = req.body.isbn;
    book.author = req.body.author;
    book.description = req.body.description;
    published_year = req.body.published_year;
    book.publisher = req.body.publisher;
    book.updated_date = req.body.updated_date;
    book.save((err, book) => {// In order to save these records we need to call save function to save values from this schema-object and a callback function that check for errors
        if (err) {
            throw err;
        }
        res.json(book);        
    });
});

router.put('/book/:_id', (req, res) => {
    var id = req.body.id;
    var update = {
        title: req.body.title,
        isbn: req.body.isbn,
        author: req.body.author,
        description: req.body.description,
        published_year: req.body.published_year,
        publisher: req.body.publisher,
        updated_date: req.body.updated_date,
    }
    Books.findOneAndUpdate(id, update, { new: true }, (err, book) => {
    
        if (err) {
            throw err;
        }
        res.json(book);        
    });
});

// Export the router object from this route.
// It needed to export router to any page by the statemant require().
// Exports is a variable that lives on module.exports. It's basically what you export when a file is required.
module.exports = router;