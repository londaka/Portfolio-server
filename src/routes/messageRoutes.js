import express from 'express'
import rateLimit from 'express-rate-limit'
import { createMessage, deleteMessage, getMessages, markMessageAsRead } from '../controllers/MessageController.js'
import { requireAdmin } from '../middlewares/requireAdmin.js'

const router = express.Router()

const contactLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many request. Please try again later'
    }
})

router.post('/', contactLimiter, createMessage)

router.get('/admin',  requireAdmin, getMessages )
router.put('/admin/:id/read',  requireAdmin,markMessageAsRead)
router.delete('/admin/:id',  requireAdmin, deleteMessage)

export default router