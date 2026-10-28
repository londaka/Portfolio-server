import mongoose, { model } from "mongoose";


const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true
    },
    technologies:[{
        type: String, 
        trim: true
    }],
    image:{
        type: String,
        default: ''
    },
    githubUrl:{
        type: String,
        default: ''
    },
    liveUrl: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {timestamps: true})




const Project = mongoose.model('Project', projectSchema)
export default Project