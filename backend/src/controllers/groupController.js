import Group from "../models/Group.model.js"
import jwt from "jsonwebtoken"

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.render("group-nav", {groups});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export {getAllGroups}