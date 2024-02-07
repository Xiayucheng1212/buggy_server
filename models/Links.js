//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var LinksSchema = new Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
    description: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "tags" }]
});


var Links = mongoose.model("links", LinksSchema);
module.exports = Links;