import express from "express";
import cors from 'cors';
import router from "./routes/shortUrl.route.js";

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', router)

app.get('/', (req, res) => {
    res.json({
        message: "Hello world"
    })
})

export default app;