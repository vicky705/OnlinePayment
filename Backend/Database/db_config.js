import mongoose from "mongoose";
import 'dotenv/config';

export const connectToMongo = () => {
    const dbUrl = process.env.DB_URI;
    mongoose.connect(dbUrl).then(() => {
        console.log("Database connected")
    }).catch((error) => {
        console.log(`DB Connection failed ${error}`)
    })
}