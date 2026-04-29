import { Message } from "../models/Message.model.js";

const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, post, text } = req.body;

    if (!sender || !receiver || !post || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (sender === receiver) {
  return res.status(400).json({ message: "You cannot message yourself" });
}

    const message = await Message.create({
      sender,
      receiver,
      post,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const loggedInUserId = req.query.senderId;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: loggedInUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: loggedInUserId },
      ],
    })
      .populate("sender", "username email")
      .populate("receiver", "username email")
      .populate("post", "title")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { sendMessage, getMessage };