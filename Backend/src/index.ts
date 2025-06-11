import app from "./app.js";
import { connectDB } from './db/db.js'
import dotenv from 'dotenv';
dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server running !")
        })
    })
    .catch((e) => {
        console.log("Mongodb connection failed !")
    })
