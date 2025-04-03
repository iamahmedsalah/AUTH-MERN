const jwt = require("jsonwebtoken");


const protactRoute = async (req, res, nxt) =>  {
    const token =  req.headers.Authorization || req.cookies.token || req.query.token || req.body.token;
    // console.log('token', token);
    if(!token){
        return res.status(401).json({ success: false ,msg: 'Access denied, No token provided'});
        
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({msg: 'Unaunthorzied - Invalid token'});
        }
        req.userId = decoded.id || decoded.userId  ;
        // console.log('decoded', decoded);
        // console.log('req.userId', req.userId);
        nxt();
    }
    catch(error){
        console.log('Error verifying token', error);
        return res.status(401).json({msg: 'Invalid token'});
    }

}


module.exports = protactRoute;