const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const proposalRouter = require("./routes/proposal");
const vendorRouter = require("./routes/vendor");
const userRouter = require("./routes/User");
const cookieParser = require("cookie-parser");
const conn=require("./connection/connect");
conn();//connection with backend established
dotenv.config();
const app = express();
app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin:""    
}));
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, () => {
//     console.log("Connected to Mongo Atlas Database");
// })
const port=process.env.PORT || 8000
app.use("/events", proposalRouter);//abhijeeth
app.use("/users", userRouter);//uttej
app.use("/vendors", vendorRouter);
app.get("/", (req, res)=>{
    res.status(200).json({msg:"Welcome"});
})

app.listen(port, () => {
    console.log(`Server started at Port ${process.env.PORT}`)
})
