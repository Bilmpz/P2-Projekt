import Group from "../models/Group.model.js"
//import { getUserGroups } from "../services/groupService.js";

const getGroupsPage = async (req, res) => {
    try {
        const groups = await Group.find();
        //const userGroups = await getUserGroups(req.userId)

        res.render("pages/groups", {groups})
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export {getGroupsPage}