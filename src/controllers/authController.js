import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const isDeployed = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true'
const authCookieOptions = {
    httpOnly: true,
    secure: isDeployed,
    sameSite: isDeployed ? 'none' : 'lax',
    path: '/',
}

export async function adminLogin(req, res){
    const { email, password } = req.body ?? {}

    if(typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 1024){
        return res.status(400).json({ message: 'Invalid request'})
    }

    const validEmail = email.trim().toLowerCase() === (process.env.ADMIN_EMAIL || '').trim().toLowerCase()

    const validPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)

    if(!validEmail || !validPassword){
        return res.status(401).json({
            message: 'Invalid email or password'
        })
    }

    const token = jwt.sign({
        role: 'admin'
    }, process.env.JWT_SECRET, {expiresIn: '7d'})

    res.cookie('admin_token', token, {
        ...authCookieOptions,
        maxAge: 60*60*100
    })
    
    return res.json({
        message: 'Login Successful',
        user: {email: process.env.ADMIN_EMAIL, role: 'admin'},
        token
    })
}

export function adminLogout(req, res){
    res.clearCookie('admin_token', authCookieOptions)

    return res.json({ message: 'Logged out successfully'})
}