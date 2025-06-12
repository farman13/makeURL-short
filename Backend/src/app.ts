import express from "express";
import cors from 'cors';
import router from "./routes/shortUrl.route.js";
import userRouter from "./routes/user.route.js"

const app = express();

app.use(express.json());
app.use(cors())

app.use('/user', userRouter)
app.use('/shorturl', router)


app.get('/', (req, res) => {
    res.json({
        message: "Hello world"
    })
})

export default app;