import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 254,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    subject: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150
    },
    message:{
      type: String,
      required: true,
      trim: true,
      minlength:10,
      maxlength: 5000
    },
    isRead:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Message =  mongoose.model('Message', messageSchema)
export default Message