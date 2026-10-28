import { Router } from 'express' 
import { creatProject, deleteProject, getAllProject, getProject, updateProject } from '../controllers/ProjectController.js'
import { requireAdmin } from '../middlewares/requireAdmin.js'

const router = Router()

router.get('/', getProject)
router.get('/admin', requireAdmin, getAllProject)
router.post('/admin/add', requireAdmin, creatProject)
router.put('/admin/:id', requireAdmin, updateProject)
router.delete('/admin/:id', requireAdmin, deleteProject)

export default router