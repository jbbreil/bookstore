/* Schema för courses */
const mongoose = require("mongoose");
/* In order to insert a new record inside the Mongodb we will call a save function 
   from this schema object (bookSchema) by default it will use a existing collection with name courses */

var booksSchema = new mongoose.Schema({  
    isbn: {
        type:String,
    },
    title: { 
        type:String, 
    },
    author: {
        type: String, 
        default: 'Okänd'
    },
    description: { 
        type:String,
        default: 'Ingen beskrivning'
    },
    publisher: { 
        type:String,
        default: 'Okänd'
    },
    url: {
        type:String, 
        default: 'url hittade ej'
    }
});

// The first parameter is the name of the schema and second the schema-objects (collection)
module.exports = mongoose.model('Books', booksSchema);


