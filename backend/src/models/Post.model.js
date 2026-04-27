import mongoose from "mongoose";

const { Schema } = mongoose;


const postSchema = new mongoose.Schema({
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
  title: String,
  content: String,
  availability: String
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;