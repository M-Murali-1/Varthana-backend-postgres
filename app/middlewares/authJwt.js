const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;

// Logic for verifying the token.
exports.verifyToken= (req,res,next)=>{
    let token = req.headers.authorization;
    
    // If no token is sent.
    if(!token) {
      return  res.status(403).json({message:"No token Found...!"})
    }
    else if (!token.startsWith("Bearer")) {
        return res.status(401).json({ message: "Invalid token format..!" });
    }
    token = token.split(" ")[1];
    jwt.verify(token,secret_key,(err,decoded)=>{
        
        // If the token is invalid..!
        if(err) {
            return res.status(401).json({message:"Invalid Token..!"});
        }
        
        // Storing the decoded data in the request and passes the control to the routes.
        req.user = decoded;
        next();
    })
    
}