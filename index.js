import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/db.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import authRoutes from './src/routes/authRoutes.js'
import projectRoute from './src/routes/projectRoute.js'
import messageRoute from './src/routes/messageRoutes.js'
import axios from 'axios'
dotenv.config()


const app = express()

const url = `https://portfolio-server-jmy6.onrender.com`;
const interval = 30000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const isAllowedOrigin = (origin) => {
  if (!origin || allowedOrigins.includes(origin)) {
    return true
  }

  try {
    const parsedOrigin = new URL(origin)
    return parsedOrigin.protocol === 'https:' &&
      parsedOrigin.hostname.endsWith('.vercel.app')
  } catch {
    return false
  }
}

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);


app.use(helmet())
app.use(cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Origin is not allowed by CORS'))
      }
    },
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
