import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema(
    {
    name: {
            type: String, required: true, 
        },
    description: {
        type: String, required: true,
    },
    location: String,
    department: String,

  // optional: liste af members (denormalisering)
  /*members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]*/
}, { timestamps: true });


const Group = mongoose.model("Group", groupSchema)
export default Group;