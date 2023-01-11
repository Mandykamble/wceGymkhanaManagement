const express =require("express");
const ejs=require("ejs");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://localhost:27017/gymDB",{useNewUrlParser:true});

const userschema={
  email:String,
  password:String
}


const User=new mongoose.model("User",userschema);

app.get('/', (req, res) => {
    res.render("home");
  });

  app.get('/login', (req, res) => {
    res.render("login");
  });

  app.get('/register', (req, res) => {
    res.render("register");
  });

  app.get('/gym', (req, res) => {
    res.render("gym");
  });

  app.get('/both', (req, res) => {
    res.render("both");
  });

  app.get('/admin',(req,res)=>{
    res.render("admin");
  });

  app.get('/Coordinator',(req,res)=>{
    res.render("Coordinator");
  });


  app.get('/staff-advisor',(req,res)=>{
    res.render("staff-advisor");
  });

  app.get('/notifyall',(req,res)=>{
    res.render("notifyall");
  });

  app.get('/get_team_details',(req,res)=>{
    res.render("get_team_details");
  });

  app.get('/view_docs',(req,res)=>{
    res.render("view_docs");
  });






//
app.post("/register",(req,res)=>{
  const eml=req.body.email;
  const psd=req.body.password;

  const newUser=new User({
    email:eml,
    password:psd
  });

  newUser.save((err)=>{
    if(err){
      console.log(err);
    }
    else{
      res.render("both");
    }
  });

});


//
app.post("/login",(req,res)=>{
const eml=req.body.email;
const psd=req.body.password;

User.findOne({email:eml},(err,founduser)=>{
      if(err){
        console.log(err);
      }
      else{
        if (founduser) {
          if(founduser.password==psd){
          res.render("both");
        }
        }
        
      }
});

});

app.post("/admin",(req,res)=>{
  const eml=req.body.email;
  const psd=req.body.password;
  
  // User.findOne({email:eml},(err,founduser)=>{
  //       if(err){
  //         console.log(err);
  //       }
  //       else{
  //         if (founduser) {
  //           if(founduser.password=="admin1@gmail.com"){
  //           res.render("both");
  //         }
  //         }
          
  //       }
  // });

  if (eml=="admin1@gmail.com") {
    if (psd=="admin1@gmail.com") {
      res.render("Coordinator");
    }
  }
  
  });






app.listen(3000,function () {
    console.log("The server is running on port3000");
});