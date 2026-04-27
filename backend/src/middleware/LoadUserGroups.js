import GroupMembership from "../models/GroupMembership.model.js";
import Group from "../models/Group.model.js";

const loadUserGroups = async (req, res, next) => {
  try {
    if (!req.userId) {
      res.locals.groups = [];
      return next();
    }

    const memberships = await GroupMembership
      .find({ user: req.userId })
      .populate("group");

    const groups = memberships.map(m => m.group);

    res.locals.groups = groups;

    return next();
  } catch (error) {
    return next(error);
  }
};

export default loadUserGroups;