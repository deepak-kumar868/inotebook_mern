const express=require('express');
const { body, validationResult } = require('express-validator');
const router=express.Router();
const User=require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../Middleware/fetchuser');

const JWT_SECRET="Deepak@123";

//ROUTE1:create a user using :POST "/api/auth/createuser".No login required
router.post('/createuser',[
    body('naam','Enter valid username').isLength({ min: 5 }),
    body('email','Enter valid email').isEmail(),
    body('password','Length of password must be greater then 5').isLength({ min: 5 }),
    body('cpassword','Length of password must be greater then 5').isLength({ min: 5 }),
],async(req,res)=>{

//If there are errors,return Bad request and the errors
   let success=0;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
    //check whether the user with this email exists already
    let users=await User.findOne({email:req.body.email});
    if(users){
        return res.status(400).json({success,errors:"This email already exits"});
    }
    

    //secure password by using salt and hashing
    const salt=await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(req.body.password,salt);
    let user=await User.create({
        naam: req.body.naam,
        email: req.body.email,
        password: secpass,
    });
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken,Sucess:'Registration complete sucessfully'})
}catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}
})
    // .then(user=>res.json(user))
    //   .catch(err=>{console.log(err)
    // res.json({error:'Please enter a Unique value for gmail'})}
    // )},
//   );

   //Alternate method
    // const user=await User(req.body);
    // user.save()
    // res.send(req.body);
//});


// -----------------------------------------------------------------------------------------------------------------------------
// ROUTE2:Login a user using POST:api/auth/login.No login required.
router.post('/login',[
    body('email','Enter valid email').isEmail(),
    body('password','password cannot be blank').exists(),
],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }  
    
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error:"Please enter valid crediantals"})
        }

        const comparepassword=await bcrypt.compare(password,user.password);
        if(!comparepassword){
            success=false;
            return res.status(400).json({success,errors:"Please enter valid crediantals"});
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true
        res.json({success,authtoken})
    }catch(error){
        console.error(error.message);
    res.status(500).send("Some error occured")
    }
})


// --------------------------------------------------------------------------------------------------------------------------------
// ROUTE3:Get logged in user detail using POST:api/auth/getuser.Login required

router.post('/getuser',fetchuser,async(req,res)=>{
    try {
     let userid=req.user.id;
     const user=await User.findById(userid).select("-password");
     res.send(user);
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Somes error occured")
}
});


module.exports=router