

const adminOnlyMiddleware = (req, res, next) => {
    const {user} = req;
    if(user.role !== "admin"){
        return res.status(403).json({error: "Not authorized. Only Administrator can be logged in."});
    }

    next();
}

module.exports = adminOnlyMiddleware;