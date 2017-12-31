 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");
 var mongoose = require('mongoose');
 mongoose.connect("mongodb://localhost/YelpCamp")
 app.use(bodyParser.urlencoded({extended:true}));

 app.set("view engine", "ejs");

// SCHEMA SETUP FOR CAMPGROUND
 var campgroundSchema = new mongoose.Schema({
 	name: String,
 	image: String,
 	description: String
 });

 var Campground = mongoose.model("Campground", campgroundSchema);

 // Campground.create({
 // 	name : "Tsomoriri Camp", 
 // 	image : "https://cdn.kettik.com/covers/176/images/b2fc10318b61fa9170da520b5765fc66medium.jpg",
 // 	description : "From the land of the lamas, Thiksey Monastery welcomes the adventurous traveller to our unique destination, the Chamba Camp, Thiksey. The Ultimate Travelling Camp introduces glamping in India "
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

// INDEX ROUTE -> TO SHOW ALL CAMPGROUNDS
 app.get('/campgrounds',function (req,res) {
 	// GET ALL CAMPGROUNDS FROM DB
 	Campground.find({},function(err,allCampgrounds) {
 		if(err){
 			console.log(err);
 		}
 		else{
 			res.render("index",{camps:allCampgrounds});
 		}
 	});
 });

// CREATE ROUTE -> TO CREATE A NEW CAMPGROUND TO DB
 app.post('/campgrounds',function (req,res) {
 	// GET DATA FROM NFORM AND CREATE NEW CAMPGROUND
 	var name = req.body.name;
 	var image = req.body.image;
 	var desc = req.body.description;
 	var newcamp = {name:name , image:image, description:desc};
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

// NEW ROUTE -> TO SHOW FORM TO CREATE A NEW CAMPGROUND
 app.get('/campgrounds/new',function (req,res) {
 	res.render("new");
 });

// SHOW ROUTE -> TO SHOW DETAILS OF A CAMPGROUND
 app.get('/campgrounds/:id',function (req,res) {
 	// FIND CAMPGROUND WITH PROVIDED ID
 	Campground.findById(req.params.id,function (err,foundCampground) {
 		if(err){
 			console.log(err);
 		}
 		else{
 			// RENDER SHOW TEMPLATE OF THAT CAMPGROUND
 			res.render("show", {campground : foundCampground});
 		}
 	});
 	
 });


 app.listen(3000,function() {
 	console.log("app started !!!");
 });