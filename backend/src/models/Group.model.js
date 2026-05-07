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

}, { timestamps: true });


const Group = mongoose.model("Group", groupSchema)
export default Group;