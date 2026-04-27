import Group from "../models/Group.model.js";

const getUserGroups = async (userId) => {
  return await Group.find({ members: userId });
};

export { getUserGroups };