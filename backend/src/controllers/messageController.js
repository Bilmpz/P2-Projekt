import { Message } from "../models/Message.model.js";

const sendMessage = async (req, res) =>{
    try {
        const {sender, reciver, text} = req.body;
        if (!sender || !reciver || !text){
            return res.status(400).json({message: "All fields are required"});
        }
        const message = await Message.create({sender, reciver, text});
        res.status(201).json(message);

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

const getMessage = async (req, res) =>{
    try {
        const loggedInUserId = req.query.senderId;
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                {sender: loggedInUserId, receiver: otherUserId},
                {sender: otherUserId, receiver: loggedInUserId}
            ],

        }).sort({createdAt: 1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}
export {sendMessage, getMessage};