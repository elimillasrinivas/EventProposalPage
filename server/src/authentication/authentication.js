const jwt = require("jsonwebtoken");

const getAuthenticate = (req, res, next) => {
        const cookie = req.session.jwttoken || req.session.vendortoken;
        const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret" //Is or condition really required??
        const result = jwt.verify(cookie, jwtSecretKey);
        req.result = result
        if(result){
            next();
        }else{
            res.status(401).json({
                msg:"Re-login"
            })
        }
}

module.exports = { getAuthenticate };
