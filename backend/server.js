const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
require("./db/conn");

const Register = require("./models/registers");
const port = process.env.PORT || 3000;

const template_path = path.join(__dirname, "/templates/views");
const partials_path = path.join(__dirname, "/templates/partials");

app.use(express.json()); //this will show only the undefined json file
app.use(express.urlencoded({ extended: false })); //this will convert that undefined into the original one

app.use(express.static("public"));
app.set("views", template_path);
app.set("views Engine", "hbs");
hbs.registerPartials(partials_path); //letting server know that partials has been added to the partials_path

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.get("/register", (req, res) => {
  res.render("register.hbs");
});

//creating new users in database using POST
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      //registerEmployee will get the all data
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        password: password,
        confirmpassword: confirmpassword,
      });

      const registered = await registerEmployee.save();
      res.status(201).render("thankyou.hbs");
    } else {
      res.send("Password Not Matched");
    }
    // console.log(req.body.firstname);
    // res.send(req.body.firstname)
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const emailByuser = req.body.email;
    const passwordByuser = req.body.password;

    //validation starts
    const emailBydb = await Register.findOne({ email: emailByuser }); //email validation//by using this we can read data from the database
    //emailBydb variable is having full json information
    if (emailBydb.password === passwordByuser) {
      res.status(201).render("Hello");
      return;

    } else {
      res.send("Check the Password");
    }

    console.log(email);
  } catch (error) {
    res.status(400).send("invalid Email");
  }
});

app.get("/login", (req, res) => {
  res.render("login.hbs");
});

app.listen(port, () => {
  console.log(`This is port ${port}`);
});
