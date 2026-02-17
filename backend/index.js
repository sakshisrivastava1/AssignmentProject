import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectToDb } from './config/db.js'
connectToDb()
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

const app = express()

const port = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/product',productRouter)

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`App listening on port ${port}!`))