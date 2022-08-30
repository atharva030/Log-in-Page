const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/employee_reg",{
    useNewUrlParser: true, 
    useUnifiedTopology: true    //these three are used to avoid deprecaton warning
}).then(()=>{
    console.log("Successful Connection")
}).catch((e)=>{
    console.log(e)
})