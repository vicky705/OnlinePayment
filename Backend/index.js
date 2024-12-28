import express from 'express'
import cors from 'cors'
import { connectToMongo } from './Database/db_config.js';
import dotenv from 'dotenv';
const ENV = process.env.NODE_ENV || 'development';
import path from 'path';
import payment from './Routes/Payment.js'

dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) });
connectToMongo()

const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())


app.use('/api/payment', payment)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})