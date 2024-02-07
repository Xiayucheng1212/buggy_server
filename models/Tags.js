//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var TagsSchema = new Schema({
    name: { type: String, required: true, unique: true },
    links: [{ type: Schema.Types.ObjectId, ref: "links" }]
});


var Tags = mongoose.model("tags", TagsSchema);
module.exports = Tags;