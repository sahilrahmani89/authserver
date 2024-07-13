import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/login.js'
import cors from 'cors'



dotenv.config()

const app = express()
app.use(cors());

app.use(express.json())


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_SECRET).then(()=>console.log('db connected'))
}

app.use('/api/auth',authRoute)

app.listen((4000),()=>{
    console.log('app is running ',4000)
})