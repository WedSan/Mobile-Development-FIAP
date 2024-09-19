const bcrypt = require('bcryptjs');
const {db} = require("../db/db")

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
    })

  
}

module.exports = {
    registerUser
}