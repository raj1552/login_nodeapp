import jwt from 'jsonwebtoken'

const authenticateToken= async (req, res, next) => {
    const { authcookie } = req.cookies;

    if(!authcookie){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(authcookie, '12345');
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Forbidden' });
    }
};

export default authenticateToken;
