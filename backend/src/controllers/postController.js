import Group from "../models/Group.model.js";
import GroupMembership from "../models/GroupMembership.model.js";
import Post from "../models/Post.model.js";

// GET /main/post/create
const getCreatePostPage = async (req, res) => {
    try {
        res.render("pages/createPost", {
            selectedGroupId: req.query.group || null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /main/post/create
const createPost = async (req, res) => {
    try {
        const { title, content, availability, group } = req.body;
        const userId = req.userId;

        if (!title || !content || !group) {
            return res.status(400).send("Titel, beskrivelse og gruppe skal være udfyldt");
        }

        // Tjek at brugeren er medlem af gruppen
        const membership = await GroupMembership.findOne({
            user: userId,
            group: group
        });
        if (!membership) {
            return res.status(403).send("Du skal være medlem af gruppen for at oprette opslag");
        }

        await Post.create({
            user: userId,
            group,
            title,
            content,
            availability
        });

        return res.redirect(`/main/post/group/${group}`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getFeedPage = async (req, res) => {
    try {
        const memberships = await GroupMembership.find({ user: req.userId });
        const groupIds = memberships.map(m => m.group);

        const posts = await Post.find({ group: { $in: groupIds } })
            .populate("user", "username")
            .populate("group", "name")
            .sort({ createdAt: -1 });

        res.render("pages/feed", {
            posts,
            currentUserId: req.userId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// GET /main/post/group/:groupId
const getGroupPosts = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).send("Gruppen findes ikke");

        const posts = await Post.find({ group: groupId })
            .populate("user", "username")
            .sort({ createdAt: -1 });

        let isMember = false;
        if (req.userId) {
            const membership = await GroupMembership.findOne({
                user: req.userId,
                group: groupId
            });
            isMember = !!membership;
        }

        res.render("pages/groupPost", {
            group,
            posts,
            isMember,
            currentUserId: req.userId || null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /main/post/:postId
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            .populate("user", "username")
            .populate("group", "name");
        if (!post) return res.status(404).send("Opslag ikke fundet");

        res.render("pages/posts", {
            post,
            currentUserId: req.userId || null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /main/post/:postId
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).send("Opslag ikke fundet");

        if (post.user.toString() !== req.userId) {
            return res.status(403).send("Du må kun slette dine egne opslag");
        }

        await post.deleteOne();
        return res.redirect(`/main/post/group/${post.group}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT /main/post/:postId
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
};

export {
    getCreatePostPage,
    createPost,
    deletePost,
    updatePost,
    getPostById,
    getGroupPosts,
    getFeedPage
};