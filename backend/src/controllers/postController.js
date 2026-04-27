import Group from "../models/Group.model.js"
import GroupMembership from "../models/GroupMembership.model.js"
import Post from  "../models/Post.model.js"

const getCreatePostPage = async (req, res) => {
    try {
        res.render("pages/createPost", { groups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        const {title, content, availability} = req.body;
        const {groupId} = req.body
        const {UserId} = req.body

        if(!title || !content || !availability)
            return res.status(400).json({message: "Titel og beskrivelse skal være udfyldt"});


        const post = await Post.create({
            user: userId,
            group: groupId,
            title,
            content,
            availability
        })

    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            .populate("user", "name")
            .populate("group", "name");
        if (!post) return res.status(404).send("Opslag ikke fundet");

        res.render("pages/postDetail", { post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getGroupPosts = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).send("Gruppen findes ikke");

        const posts = await Post.find({ group: groupId })
            .populate("user", "name")     // hent navnet på posterens
            .sort({ createdAt: -1 });     // nyeste først

        res.render("pages/posts", { group, posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).send("Opslag ikke fundet");

        // Kun ejeren må slette
        if (post.user.toString() !== req.userId) {
            return res.status(403).send("Du må kun slette dine egne opslag");
        }

        await post.deleteOne();
        return res.redirect(`/main/post/group/${post.group}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const { title, content, availability } = req.body;
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).send("Opslag ikke fundet");

        if (post.user.toString() !== req.userId) {
            return res.status(403).send("Du må kun redigere dine egne opslag");
        }

        if (title !== undefined) post.title = title;
        if (content !== undefined) post.content = content;
        if (availability !== undefined) post.availability = availability;

        await post.save();
        return res.redirect(`/main/post/${post._id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {getCreatePostPage, createPost, deletePost, updatePost, getPostById, getGroupPosts}
