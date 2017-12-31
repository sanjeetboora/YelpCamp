 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");
 var mongoose = require('mongoose');
 mongoose.connect("mongodb://localhost/YelpCamp")
 app.use(bodyParser.urlencoded({extended:true}));

 app.set("view engine", "ejs");

// SCHEMA SETUP FOR CAMPGROUND
 var campgroundSchema = new mongoose.Schema({
 	name:String,
 	image:String
 });

 var Campground = mongoose.model("Campground", campgroundSchema);

 // Campground.create({
 // 	name : "Tsomoriri Camp", 
 // 	image : "https://cdn.kettik.com/covers/176/images/b2fc10318b61fa9170da520b5765fc66medium.jpg"
 // }, function(err,campground) {
 // 	if(err){
 // 		console.log(err);
 // 	}
 // 	else{
 // 		console.log(campground);
 // 	}
 // });

// HOME PAGE
 app.get('/',function (req,res) {
 	res.render("landing");
 });

// ALL CAMPGROUNDS PAGE
 app.get('/campgrounds',function (req,res) {
 	// GET ALL CAMPGROUNDS FROM DB
 	Campground.find({},function(err,allCampgrounds) {
 		if(err){
 			console.log(err);
 		}
 		else{
 			res.render("campgrounds",{camps:allCampgrounds});
 		}
 	});
 });

 app.post('/campgrounds',function (req,res) {
 	// GET DATA FROM NFORM AND CREATE NEW CAMPGROUND
 	var name = req.body.name;
 	var image = req.body.image;
 	var newcamp = {name:name , image:image};
 	// CREATE NEW CAMPGROUND AND SAVE TO DB
 	Campground.create(newcamp,function (err, newlyCreated) {
 		if(err){
 			console.log(err);
 		}
 		else{
 			// REDIRECT BACK TO CAMPGROUNDS PAGE
 			res.redirect("/campgrounds");
 		}
 	});
 	
 });

 app.get('/campgrounds/new',function (req,res) {
 	res.render("new.ejs");
 });



 app.listen(3000,function() {
 	console.log("app started !!!");
 });