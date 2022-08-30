const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
firstname:{
    type:String,
    require:true
},
lastname:{
    type:String,
    require:true
},
city:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true,
    unique:true
},
gender:{
    type:String,
    require:true
},
phone:{
    type:Number,
    require:true,
    unique:true
},
password:{
    type:String,
    require:true
},
confirmpassword:{
    type:String,
    require:true
}
})

const Register=new mongoose.model("Register",employeeSchema);  //here we are creating new collection in database called as Register or Registers
module.exports=Register;