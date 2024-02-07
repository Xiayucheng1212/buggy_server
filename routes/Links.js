const express = require("express");
const router = express.Router();
const Links = require("../models/Links");
const Tags = require("../models/Tags");

async function addLink(req, res, next) {
    // Find all tags object id
    var tagsId = [];
    for (let i = 0; i < req.body.tags.length; i++) {
        var tag = await Tags.findOne({ name: req.body.tags[i] });
        if (tag) {
            tagsId.push(tag._id);
        }
    }
    var newLink = {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        tags: tagsId
    }
    const link = await Links.create(newLink);
    res.locals.linkId = link._id;
    next();
}

async function addLinkToTag(req, res, next) {
    // Add link id to all tags
    for (let i = 0; i < req.body.tags.length; i++) {
        var tag = await Tags.findOne({ name: req.body.tags[i] });
        if (tag) {
            tag.links.push(res.locals.linkId);
            await tag.save();
        }
    }
    next();
}

async function checkEmptyTag(req, res, next) {
    await Tags.find({ links: [] }).deleteMany();
    next();
}

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.delete("/delete/:id", async (req, res) => {
    await Links.findByIdAndDelete(req.params.id);
    // Delete link id from all tags that contain it
    var tags = await Tags.find({ links: req.params.id });
    for (let i = 0; i < tags.length; i++) {
        tags[i].links = tags[i].links.filter(link => link != req.params.id);
        await tags[i].save();
    }
}, checkEmptyTag, (req, res) => res.send("Link deleted"));

router.post("/add", addLink, addLinkToTag, (req, res) => res.send("Link added"));

module.exports = router