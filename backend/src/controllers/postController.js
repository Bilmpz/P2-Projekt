import Group from "../models/Group.model.js"
import GroupMembership from "../models/GroupMembership.model.js"
import Post from  "../models/Post.model.js"

const getCreatePostPage = async (req, res) => {
    try {
        const groups = await Group.find();
        res.render("pages/createPost", {groups})
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}


const createPost = async (req, res) => {
    try {
        const {title, content, availability} = req.body;
        if(!title || !content || !availability)
            return res.status(400).json({message: "missing required fields"});

        const post = await Post.create({name, description, age});

        res.status(201).json({message: "post created successfully",post});


    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});

    }
    
}

const deletePost = async (req, res) => {
    
}

const updatePost = async (req, res) => {
    
}

const getPostById = async (req, res) => {
    
}

const getGroupPosts = async (req, res) => {
    
}

export {getCreatePostPage, createPost, deletePost, updatePost, getPostById, getGroupPosts}
