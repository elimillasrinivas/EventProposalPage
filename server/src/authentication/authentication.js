const jwt = require("jsonwebtoken");

const getAuthenticate = (req, res, next) => {
    try{
        const cookie = req.session.jwttoken 
        const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret" //Is or condition really required??
        const result = jwt.verify(cookie, jwtSecretKey);
        console.log(result.data.data);
        req.result = result.data.data;
        if(result){
            next();
        }else{
            res.status(401).json({
                msg:"Re-login"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(400).json(e);
    }
}

module.exports = { getAuthenticate };
