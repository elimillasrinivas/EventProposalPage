const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user");
const conn=require("./connections/connect");
conn();//connection with backend established
dotenv.config();
const app = express();

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
    methods: "GET,PUT,POST,DELETE"
         
}));
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, () => {
//     console.log("Connected to Mongo Atlas Database");
// })
const port=process.env.PORT || 8000
app.use("/users", userRouter);//uttej

app.listen(port, () => {
    console.log(`Server started at Port ${process.env.PORT}`)
})