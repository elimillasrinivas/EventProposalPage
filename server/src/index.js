const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const proposalRouter = require("./routes/proposal");
const vendorRouter = require("./routes/vendor");
const userRouter = require("./routes/User");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const conn=require("./connection/connect");
conn();//connection with backend established
dotenv.config();
const reactUrl = process.env.REACT_URL || "https://jovial-kleicha-9e68df.netlify.app"
const app = express();
app.use(cors({
    credentials:true,
    origin:"https://precious-heliotrope-47becd.netlify.app",
}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: {
        secure:true,            ////secre should be true for https
        maxAge: 60*60*1000,
        sameSite: "none"       //////none for https............
    }
}

))
app.use(cookieParser());
app.set("trust proxy", 1)
app.use(express.json());

const port=process.env.PORT || 8000
app.use("/events", proposalRouter);//abhijeeth
app.use("/users", userRouter);//uttej
app.use("/vendors", vendorRouter);//srinivas
app.get("/", (req, res)=>{
    res.status(200).json({msg:"Welcome"});
})

app.listen(port, () => {
    console.log(`Server started at Port ${process.env.PORT}`)
})
