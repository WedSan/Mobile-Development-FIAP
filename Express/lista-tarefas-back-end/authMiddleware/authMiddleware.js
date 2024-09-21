const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({error: "No tokens were provided "});
    }
    
    jwt.verify(token, 'most-secure-secret-key-in-the-world-123', (err, decoded)=>{
        if(err){
            return res.status(401).json({error: "Token inválido"});
        }

        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;