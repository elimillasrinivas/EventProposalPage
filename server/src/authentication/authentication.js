const jwt = require("jsonwebtoken");

const getAuthenticate = (req, res, next) => {
    try{
        const cookie = req.cookies.jwttoken;
        const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret" //Is or condition really required??
        const result = jwt.verify(cookie, jwtSecretKey);  
        req.result = result
        if(result){
            next();
        }else{
            res.status(401).json({
                msg:"user should re-login",
                
            })
        }
    }
    catch(e){
        res.status(401).json({
            msg:e.message
        })
    }
}

module.exports = { getAuthenticate };
