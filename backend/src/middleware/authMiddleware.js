import jwt from 'jsonwebtoken'

function authMiddleware (req, res, next) {
    const token = req.cookies.token;

    if (!token){return res.status(401).redirect("/login")}

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.redirect("/login");
    }
}

export default authMiddleware