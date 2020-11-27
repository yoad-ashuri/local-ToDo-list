const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];
let workLists = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req,res) {

    let day = date();

    res.render("list", {
        listTitle: day, newListItem: items
    });
});

app.get("/work", function (req,res){
    res.render("list", {
        listTitle: "work List", newListItem: workLists
    });
});

app.get("/about", function (req, res){
    res.render("about");
});

app.post("/", function (req,res){
    let item = req.body.newItem;

    if (req.body.list === "work List") {
        workLists.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});