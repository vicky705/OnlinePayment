import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import path from 'path'

const ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) });

export const razorpayInstance = new Razorpay({
    key_id : process.env.API_KEY,
    key_secret : process.env.API_SECRET
}) 