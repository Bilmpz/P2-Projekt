import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
});

// undgå duplicates
groupMemberSchema.index({ user: 1, group: 1 }, { unique: true });

const GroupMembership = mongoose.model("GroupMembership", groupMemberSchema);

export default GroupMembership;