const express = require('express');
var router = express.Router();
// Import request statemanent into the server
var Books = require('../models/book.js');


/***** SET UP THE ROUTER/CONTROLLERS *****/

// Here we retain a value for the property/variable viewTitle inside the addOredit.hbs
router.get('/', (req, res) => {
    res.send('Vänligen använd: http://localhost:5000/books')
    });

router.get('/books', (req, res) => {
    // Retrive records from MongoDB collection
    Books.find(function(err, books) {// Second parameter returns the collection records from MongoDB and put them inside the list property which contain the table-layout
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

router.get('/books/:_id', (req, res) => {
    // Retrive a specific MongoDb collection by id 
    Books.findById(req.params._id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.delete('/books/delete/:_id', (req, res) => {
    Books.findByIdAndRemove(req.params._id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
        //res.redirect('/books');
    });
});

// Parameters send via form submition and pass to the req object body attribute (req.body)
router.post('/books/add', (req, res) => {
    var book = new Books();
    book.bookISBN = req.body.bookISBN;
    book.bookTitle = req.body.bookTitle;
    book.bookGenre = req.body.bookGenre;
    book.bookDescription = req.body.bookDescription;
    book.bookAuthor = req.body.bookAuthor;
    book.bookImageURL = req.body.bookImageURL;
    book.bookBuyURL = req.body.bookBuyURL;
    book.bookRelease = req.body.bookRelease;
    book.save((err, book) => {// In order to save these records we need to call save function to save values from this schema-object and a callback function that check for errors
        if (err) {
            throw err;
        }
        res.json(book);        
    });
});

router.put('/books/update/:_id', (req, res) => {
    var id = req.body.id;
    var update = {
        bookISBN: req.body.bookISBN,
        bookTitle: req.body.bookTitle,
        bookGenre: req.body.bookGenre,
        bookDescription: req.body.bookDescription,
        bookAuthor: req.body.bookAuthor,
        bookImageURL: req.body.bookImageURL,
        bookBuyURL: req.body.bookBuyURL,
        bookRelease: req.body.bookRelease
    }
    Books.findOneAndUpdate(id, update, { new: true }, (err, book) => {
    
        if (err) {
            throw err;
        }
        res.json(book);        
    });
});


function insertRecord (req, res){
    // Create a object of the bookSchema that we are going to populate with the form values from request body object
    var book = new Books();
    book.bookISBN = req.body.bookISBN;
    book.bookTitle = req.body.bookTitle;
    book.bookGenre = req.body.bookGenre;
    book.bookDescription = req.body.bookDescription;
    book.bookAuthor = req.body.bookAuthor;
    book.bookImageURL = req.body.bookImageURL;
    book.bookBuyURL = req.body.bookBuyURL;
    book.bookRelease = req.body.bookRelease;

    book.save((err, book) => {// In order to save these records we need to call save function to save values from this schema-object and a callback function that check for errors
        if (!err) 
            res.send(err);
            // If there is any error related to validation this else block will be called
            // The details of validation error will be inside the err-object 
            else {
            /* In order to identify whether the error is due to the vsalidation or not we check the 
               error object name-attribute */
            if (err.bookId == 'ValidationError' || err.bookName == 'ValidationError' || err.bookPeriod == 'ValidationError' ) {
                handleValidationError(err, req.body);// returning the request value from the form which will be saved inside the request body with up'dated validation error messages 
                // Return the updated addOrEdit view along with the view title book which will return the updated request body
                res.redirect("/books", {
                });

            }
            else
                console.log('Error during record insertion : ' + err);
            }
            
    }); 
} 

function updateRecord(req, res) {
    Books.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('book/list'); }
        else {
            if (err.bookId == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("book/list/add", {
                    book: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    }).lean();
}


// Handle validation messages and save properties velidation error message into the body-object (body['bookIdError'])
function handleValidationError(err, body){
    // err is a ValidationError object
    // err.errors.message is a ValidatorError object
    // Loops through the properties of an object, https://www.w3schools.com/jsref/jsref_forin.asp
    // Inside the field we will have the name of field where we have a validation error inside
    for(field in err.errors){
        // The path refeer to the the filed/property in the schema file book.js
        /* We will save the validation error message inside the body for with the body-property, 
        insode that we have to save the corrisponding validation error message that we can retrive 
        from the message property that is the required string in the schema properties */
        switch(err.errors[field].path){
            // bookId field
            case 'bookId':
                body['bookIdError'] = err.errors[field].message;
                break;
            // bookName field
            case 'bookName': 
                body['bookNameError'] = err.errors[field].message;
                break;
            // bookPeriod field
            case 'bookPeriod':
                body['bookPeriodError'] = err.errors[field].message;
                break;
                default:
                    break;
        }
    }
}

// Export the router object from this route.
// It needed to export router to any page by the statemant require().
// Exports is a variable that lives on module.exports. It's basically what you export when a file is required.
module.exports = router;