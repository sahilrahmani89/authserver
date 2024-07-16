import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/login.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.js'


dotenv.config()

const app = express()
app.use(cors());
app.use(cookieParser())
app.use(express.json())


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_SECRET).then(()=>console.log('db connected'))
}

app.use('/api/auth',authRoute)
app.use('/api/',userRoute)

app.listen((4000),()=>{
    console.log('app is running ',4000)
})