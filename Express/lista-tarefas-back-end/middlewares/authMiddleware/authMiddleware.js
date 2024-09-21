const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const headerToken = req.headers['authorization'];
    const token = headerToken.split(" ")[1];
    if(!token){
        return res.status(403).json({error: "No tokens were provided "});
    }
    
    jwt.verify(token, 'most-secure-secret-key-in-the-world-123', (err, decoded)=>{
        if(err){
            return res.status(401).json({error: "Token inválido"});
        }
        console.log(decoded);
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;