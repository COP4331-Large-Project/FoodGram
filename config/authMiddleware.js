const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        // var token = req.headers.authorization.split(' ')[1];
        const token = req.header("Authorization");
        console.log("Auth Token", token);
        if(!token)
            return res.status(401).json({msg: "No authentication token, access denied"});
        
        const verified = jwt.verify(token, process.env.SERVER_SECRET);
        if(!verified)
        return res.status(401).json({msg: "Token verification failed, authorization denied"});
        
        req.user = verified.sub;
        // console.log("kkkkkkkkkkkkkkkkk", verified.sub);
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
   
}

module.exports = auth;