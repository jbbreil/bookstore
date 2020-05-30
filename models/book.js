/* Schema för courses */
const mongoose = require("mongoose");
/* In order to insert a new record inside the Mongodb we will call a save function 
   from this schema object (courseSchema) by default it will use a existing collection with name courses */

var booksSchema = new mongoose.Schema({  
    title: { 
        type:String, 
    },
    isbn: {
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
    published_year: { 
        type:String,
        default: 'Okänd'
    },
    publisher: { 
        type:String,
        default: 'Okänd'
    },
    updated_date: {
        type:String, 
        created_at: Date,
        updated_at: {default: Date.now }
    }
});

// The first parameter is the name of the schema and second the schema-objects (collection)
module.exports = mongoose.model('Books', booksSchema);

// The post has a default Date set to now
//assert.ok(post.date.getTime() >= Date.now() - 1000);
//assert.ok(post.date.getTime() <= Date.now());

