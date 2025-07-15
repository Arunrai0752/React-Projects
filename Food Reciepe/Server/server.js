import express from "express"
import dotenv from "dotenv"
import booksr from "./routes/bookRouter.js"
import connectDb from "./config/db.js";

const app = express();
dotenv.config()

app.use(express.json())
app.use("/book", booksr)


const port = process.env.PORT || 3002
app.listen(port, (e) => {

    console.log(`Server is running on port ${port}`);
    connectDb();
})

