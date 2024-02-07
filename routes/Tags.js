const express = require("express");
const router = express.Router();
const Links = require("../models/Links");
const Tags = require("../models/Tags");

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.get("/all", async (req, res) => {
    const tags = await Tags.find({}).populate({ path: "links", select: "name url"});
    res.send(tags);
});

router.get("/all/name", async (req, res) => {
    const tags = await Tags.find({}, "name");
    res.send(tags);
});

router.post("/add", async (req, res) => {
    console.log(req.body);
    const tag = await Tags.findOne({ name : req.body.name});
    if(tag){
        res.send("Tag already exists"); 
    }
    else{
        await Tags.create({name: req.body.name, links: []});
        res.send("Tag added");
    }
});

module.exports = router 
