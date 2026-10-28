import jwt from 'jsonwebtoken'

export function requireAdmin(req, res, next){
    const token = req.cookies?.admin_token

    if(!token){
        return res.status(401).json({ message: 'Authentication required' })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if(payload.role !== 'admin'){
            return res.status(403).json({ message: 'Forbidden' })
        }

        req.admin = { role: 'admin' }
        next()
    } catch (error) {
     return res.status(401).json({ message: 'Invalid or expired session'})   
    }
}