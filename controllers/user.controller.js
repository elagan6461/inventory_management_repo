const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

module.exports = {
    registerUser: async(req, res) => {
        try{
            console.log(req.body);
            const potentialUser = await User.findOne({email:req.body.email})
            if(potentialUser) {
                res.status(500).json({message:'This email already exists please log in'})
            }
            else{
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({id:newUser._id, email:newUser.email}, secretKey, {expiresIn:'2h'})
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json(newUser)
            }
        }
        catch(err) {
            res.status(500).json({error:err})
        }
    },
    loginUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email:req.body.email})
            if(potentialUser){
                const passwordsMatch = await bcrypt.compare(req.body.password, potentialUser.password)
                if(passwordsMatch){
                    const userToken = jwt.sign({id:potentialUser._id, email:potentialUser.email}, secretKey, {expiresIn:'2h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly:true}).json(potentialUser)
                }else {
                    res.status(500).json({message:'Invalid Email/Password'})
                }
            }else {
                res.status(500).json({message:'Invalid Email/Password'})
            }
        }
        catch(err) {
            res.status(500).json({ error:err })
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'User Logged Out'})
    }
}