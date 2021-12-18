const router = require('express').Router();
const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
//Register
router.post("/register", async (req, res)=> {

    const {username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(422).json({error: "All fields are required"});
    }

    User.findOne({email}).then(
        (savedUser) =>{
            if(savedUser){
                return res.status(422).json({error: "User email already exist"})
            }
        }
    )
    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });
   try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
   }catch(err){
      res.status(500).json(err);
   }
    
});

// Login

router.post("/login", (req, res) => {
   // const { username, password} = req.body;
    /*  if(!username || !password){
        return res.status(422).json({error: "Please add username or password"});
    }  */



       User.findOne({username: req.body.username}).then(
           (savedUser) => {
               const hashedPassword = CryptoJS.AES.decrypt(
                   savedUser.password,
                   process.env.PASS_SEC
               );
               const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
               if(userPassword !== req.body.password ){
                   return res.status(401).json("Wrong credential!")
               }
           const token = jwt.sign({
               id: savedUser._id,
               isAdmin: savedUser.isAdmin,
               },
               process.env.JWT_SECRET,
               {expiresIn: "3d"}
               );
               const {password, ...others} = savedUser._doc;
        
            return res.status(200).json({user:{...others}, token});
           }
       ).catch(err =>{
           res.status(500).json(err);
       })
   /* try{
         const user = await User.findOne({username});
         
         const hashedPassword = CryptoJS.AES.decrypt(
             user.password,
             process.env.PASS_SEC
             );

        const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
         
        userPassword !== password && res.status(401).json("Wrong credentials!");

            res.status(200).json(user);
   }catch(err){
       res.status(500).json(err);
   } */
    
})

module.exports = router;