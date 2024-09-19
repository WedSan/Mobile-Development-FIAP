const bcrypt = require('bcryptjs');
const {db} = require("../db/db")
const jwt = require('jsonwebtoken')

const registerUser = (req, res)=>{
    const {username, password, role} = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }
        db.run("INSERT INTO user (username, password, role) VALUES (? , ? , ? )", [username, hashedPassword, role], function(err){
            if(err){
                res.status(500).json({error : "Error trying to register the user"});
            }
            res.status(200).json({message: "User created successfully"})
        });
    });

  
}

const loginUser = (req, res)=>{
    const {username, password} = req.body;
    
    db.get("SELECT * FROM user where username = ?", [username], (err, user)=>{  
        if(err || !user){
            return res.status(401).json({error:"Invalid username or password"});
        }
        
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if(!isMatch || err){
                return res.status(401).json({error: "Invalid username or password"});
            }

            const token = jwt.sign({id: user.id, role: user.role}, 'most-secure-secret-key-in-the-world-123', {expiresIn: '1h'});
            res.status(200).json({token: token});
        });  
    });
}

module.exports = {
    registerUser,
    loginUser
}