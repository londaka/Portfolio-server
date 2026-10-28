import { Router } from "express";
import { adminLogin, adminLogout } from "../controllers/authController.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";

const router = Router()

router.post('/login', adminLogin)
router.post('/logout', requireAdmin, adminLogout)
router.get('/me', requireAdmin, (req, res) => {
    res.json({ user: {role: req.admin.role } })
})

export default router