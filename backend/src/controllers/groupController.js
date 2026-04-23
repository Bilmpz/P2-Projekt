import Group from "../models/Group.model.js"
import GroupMembership from "../models/GroupMembership.model.js";

const getGroupsPage = async (req, res) => {
    try {
        const groups = await Group.find();
        const memberships = await GroupMembership.find({ user: req.userId });
        

        // Find ud af hva fuck det her 100% gør
        const joinedGroupIds = memberships.map(m => m.group.toString())

        res.render("pages/groups", {groups, joinedGroupIds})
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const joinGroup = async (req, res) => {
    try{
        const userId = req.userId
        const {groupId} = req.params

        const group = await Group.findById(groupId)

        if(!group) {
            return res.status(404).send("Group not found")
        }

        const existingMembership = await GroupMembership.findOne({
            user: userId,
            group: groupId
        })

        if(existingMembership){
            return res.redirect("main/groups")
        }

        await GroupMembership.create({
            user: userId,
            group: groupId
        })

        return res.redirect("/main/groups")
    } catch (error){
        if (error.code === 11000) {
            return res.redirect("main/groups")
        }

        return res.status(500).send(error.message)
    }
}

const leaveGroup = async (req, res) => {
    try{
        const userId = req.userId
        const {groupId} = req.params

        const group = await Group.findById(groupId)

        if(!group) {
            return res.status(404).send("Group not found")
        }

        const existingMembership = await GroupMembership.findOne({
            user: userId,
            group: groupId
        })

        if(existingMembership){
            return res.redirect("main/groups")
        }

        await GroupMembership.create({
            user: userId,
            group: groupId
        })

        return res.redirect("/main/groups")
    } catch (error){
        if (error.code === 11000) {
            return res.redirect("main/groups")
        }

        return res.status(500).send(error.message)
    }
}
export { joinGroup }
export { getGroupsPage }