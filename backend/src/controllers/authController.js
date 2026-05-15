import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Post from "../models/Post.model.js";


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).send("Udfyld alle felter")
        }

        const existingEmail = await User.findOne({ email: email.toLowerCase() })
        if (existingEmail) {
            return res.redirect("/?error=email-exists");
            //return res.status(400).send("Bruger findes allerede")
        }

        const existingUsername = await User.findOne({username: username.toLowerCase()});
        if (existingUsername) {
            return res.redirect("/?error=username-exists");
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        })
        console.log(user)
        return res.redirect("/?registered=true");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send("Udfyld email og password");
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        if (!user) {
            return res.redirect("/?error=invalid-login");
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.redirect("/?error=invalid-login");    
        } 

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        }).redirect("/main/post/feed");

    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const getProfile = async (req, res) => {
    const user = await User.findById(req.userId);
    const posts = await Post.find({ user: req.userId }).populate("group");
    res.render("pages/profile", { user, posts });
}


const updateProfile = async (req, res) => {
    const { username, email} = req.body;
    await User.findByIdAndUpdate(req.userId, { username, email });
    res.redirect("/auth/profile");
}


export { registerUser, loginUser, getProfile, updateProfile }