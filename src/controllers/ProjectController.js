import Project from "../models/ProjectModel.js"


//Public: published Project Only
export const getProject = async (req, res, next) => {
try {
    const projects = await Project.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean()

    res.json(projects)
} catch (error) {
    next(error)
    
}

}

//Admin: all projects
export const getAllProject = async (req, res, next) => {
try {
    const project = await Project.find()
    .sort({ order: 1, createdAt: -1 })
    .lean()
    
    res.json(project)
} catch (error) {
    next(error)
}
}

// Admin: Create Project
  export const  creatProject = async (req, res) => {
    const { title, description, technologies, image, githubUrl, liveUrl, featured, published, order} = req.body
    try {
      if(!title || !description || !technologies){
        return res.status(400).json({ message: 'All fields are required'})
      }

      const project = await Project.create({
        title,
        description,
        technologies,
        image,
        githubUrl,
        liveUrl,
        featured: featured === true || featured === 'true',
        published: published === true || published === 'true',
        order: Number(order) || 0
      })

      res.status(201).json({message: 'Project Created', project})
        
    }catch(error){
       res.status(500).json({message: 'Something went wrong'})
    }
}

export const updateProject = async(req,res) => {
    const {title, description, technologies, image, githubUrl, liveUrl, featured, published, order} = req.body
    try {
        const updateFields = {}
        if(title !== undefined) updateFields.title = title
        if(description !== undefined) updateFields.description = description
        if(technologies !== undefined) updateFields.technologies = technologies
        if(image !== undefined) updateFields.image = image
        if(githubUrl !== undefined) updateFields.githubUrl = githubUrl
        if(liveUrl !== undefined) updateFields.liveUrl = liveUrl
        if(featured !== undefined) updateFields.featured = featured === true || featured === 'true'
        if(published !== undefined) updateFields.published = published === true || published === 'true'
        if(order !== undefined) updateFields.order = Number(order) || 0
        
        const updateProject = await Project.findByIdAndUpdate(req.params.id, updateFields, {
            new: true,
            runValidators: true
        })
        if(!updateProject) return res.status(404).json({
            message: 'Project not found'
        })
        res.status(201).json({message: 'Project Updated', updateProject})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params

    const deleteProject = await Project.findByIdAndDelete(id)

    if(!deleteProject){
        return res.status(404).json({ message: 'Project not found' })
    }

    res.json({ message: 'Project deleted' })
}
