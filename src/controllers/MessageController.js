import Message from "../models/MessageModel.js";

export const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if(typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string'){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const cleanName = name.trim()
        const cleanEmail = email.trim().toLowerCase()
        const cleanSubject = subject.trim()
        const cleanMessage = message.trim()

        if(cleanName.length < 2 || cleanEmail.length > 100 || cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanSubject.length < 3 || cleanSubject.length > 150 || cleanMessage.length < 10 || cleanMessage.length > 5000){
            return res.status(400).json({ success: false, message: "Please provide valid contact information and message details."})
        }

        const newMessage = await Message.create({
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage
        })
        return res.status(201).json({
            success: true,
            message: "sent",
            data:{
                id: newMessage._id,
            }
        })
    } catch (error) {
        console.error('Create message error:', error.message)
        return res.status(500).json({
            success: false,
            message: 'try again'
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        .sort({ createdAt: -1 })
        .lean()
        
        return res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        })
    } catch (error) {
        console.error('Get message error', error.message)

        return res.status(500).json({
            success: false,
            message: 'Unable to retrive message'
        })
    }
}

export const markMessageAsRead = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            {$set: {isRead: true} },
            {new: true, runValidators: true}
        )
        if(!message){
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: message
        })
    } catch (error) {
        if(error.name === 'CastError'){
            return res.status(400).json({
                success: false,
                message: 'Invalid message ID.'
            })
        }
        console.error("Mark message read error:", error.message)
        return res.status(500).json({
            success: false,
            message: 'Unable to update the message'
        })
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id)

        if(!message){
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            })
        }
       return res.status(200).json({
        success: true,
        message: 'Message deleted'
       })
    } catch (error) {
        if(error.name === 'CastError'){
            return res.status(400).json({
                success: false,
                message: 'Invalid message ID.'
            })
        }
        console.error('Delete message error:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Unable to delete the message'
        })
    }
    
}