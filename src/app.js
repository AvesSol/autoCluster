// importing nessesory packages 
const express = require("express");
const app = express();
const path = require("path");

// setting Paths variables
const static_Path = path.join(__dirname, "../public");
const view_Path = path.join(__dirname, "/views");



// connection to DB
require("../src/config/database").connectDB();

// const variables 
const port  = process.env.PORT || 4000;

// middle wares 
app.use(express.json()); // for decode or convert the object to json format
app.set('views', view_Path); 

app.set('view engine', 'hbs'); // Setting Path 
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_Path)); // Setting Path 


// mountings 
const AuthRoute = require("./routes/AuthRoute");
const AdminRoute = require("./routes/adminRoute");
app.use("/visi-emp",AdminRoute); 
app.use("/register/emp-vis",AuthRoute);
 

// Default Routes 
app.get("/",(req,res)=>{
    // res.send("Hello ");
    res.render("index");
});

// Admin
app.get("/admin",(req,res)=>{
    // res.send("Hello ");
    res.render("admin");
});

// Temp routes For Noe 

// Employee Pass Route
app.get("/language", (req,res)=>{
    res.render("language");
})

// Employee Pass Mmarathi Route
app.get("/Employee", (req,res)=>{
    // res.send("Hi Its me");
    res.render("Employee");
})

// vistor pass  Route
app.get("/EmployeeMar", (req,res)=>{
    // res.send("Hi Its me");
    res.render("EmployeeMar");
})

// vistor pass mar  Route
app.get("/pass", (req,res)=>{
    // res.send("Hi Its me");
    res.render("pass");
})

// vistor pass mar  Route
app.get("/PassMar", (req,res)=>{
    // res.send("Hi Its me");
    res.render("PassMar");
})

// vistor pass mar  Route
app.get("/visitorPass", (req,res)=>{
    // res.send("Hi Its me");
    res.render("visitorPass");
})

// vistor pass mar  Route
app.get("/VisitorMar", (req,res)=>{
    res.render("VisitorMar");
})

// otp page
app.get("/otp", (req,res)=>{
    res.render("otp");
})

// Congratulation Page 
app.get("/congratulationPage", (req,res)=>{
    res.render("congratulationPage");
})





// server Listening 
app.listen(port,(req,res)=>{
    console.log(`Your Live on Port Number ${port}`);
});


