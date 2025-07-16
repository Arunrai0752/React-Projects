import express from "express"
import dotenv from "dotenv"
import booksr from "./routes/bookRouter.js"
import connectDb from "./config/db.js";
import cors from "cors"
import authRouter from "./routes/userRouter.js"


const app = express();
dotenv.config()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json())
app.use("/book", booksr)
app.use("/user", authRouter)


const port = process.env.PORT || 3002
app.listen(port, (e) => {

    console.log(`Server is running on port ${port}`);
    connectDb();
})

