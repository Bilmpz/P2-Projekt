import User from "../models/User.model.js";
import jwt from "jsonwebtoken";                              // ← tilføjet


const registerUser = async (req, res) => {
    try {
        const { username, email, password} = req.body

        if (!username || !email || !password){
            return res.status(400).json({ message: "All fields are important!"})
        }

        const existing = await User.findOne({email: email.toLowerCase()})
        if (existing) {
            return res.status(400).json({ message: "user already exists"})
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        })
        console.log(user)
        return res.status(201).json({ message: "Bruger oprettet" })   // ← tilføjet
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message})
    }    
}                                                       


const loginUser = async (req, res) => {             
    try{
        const {email, password} = req.body

        if (!email || !password){
            return res.status(400).json({message: "Udfyld email og password"})
        }

        const user = await User.findOne({ email: email.toLowerCase() })  // ← fjernet password herfra

        if (!user){
            return res.status(400).json({message: "Forkert email eller password"})
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({message: "invalid credentials"});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.status(200).json({token})
        
    } catch(error){
        res.status(500).json({message: "internal server error", error: error.message})
    }
}                                                          


export { registerUser, loginUser }