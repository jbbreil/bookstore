/* Schema för courses */
const mongoose = require("mongoose");
/* In order to insert a new record inside the Mongodb we will call a save function 
   from this schema object (courseSchema) by default it will use a existing collection with name courses */

var booksSchema = new mongoose.Schema({  
    bookISBN: { 
        type:String, 
        required: 'This field is required!'
    },
    bookTitle: {
        type:String,
        required: 'This field is required!'
    },
    bookGenre: {
        type: String, 
        default: 'Webbutveckling'
    },
    bookGenre: { 
        type:String,
        required: 'This field is required!'
    },
    bookDescription: { 
        type:String,
        default: '',
		trim: true
    },
    bookAuthor: { 
        type:String,
        required: 'This field is required!'
    },
    bookImageURL: { 
        type:String
    },
    bookBuyURL: { 
        type:String
    },
    bookRelease: {
        type: Date,
        default: () => Date.now() + 7*24*60*60*1000
    }
});

// The first parameter is the name of the schema and second the schema-objects (collection)
module.exports = mongoose.model('Books', booksSchema);

// The post has a default Date set to now
//assert.ok(post.date.getTime() >= Date.now() - 1000);
//assert.ok(post.date.getTime() <= Date.now());

