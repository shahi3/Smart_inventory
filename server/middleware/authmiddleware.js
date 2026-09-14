const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer xyz" → "xyz"

    if (!token) {
        return res.status(401).json({
            message: "Your authentication token is not valid"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = authMiddleware;