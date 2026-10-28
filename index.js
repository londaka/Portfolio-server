import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/db.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import authRoutes from './src/routes/authRoutes.js'
import projectRoute from './src/routes/projectRoute.js'
import messageRoute from './src/routes/messageRoutes.js'
dotenv.config()


const app = express()

app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


const Port = process.env.PORT || 3000
connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/', projectRoute)
app.use('/api/messages', messageRoute)

app.listen(Port, ()=> {
    console.log(`Server is running on ${Port}`)
})
