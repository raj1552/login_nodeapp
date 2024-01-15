import jwt from 'jsonwebtoken'

const authenticateToken= async (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, '12345', (err, user) =>{
        if(err){
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.authenticateUser = user.username;
        next();
    })
};

export default authenticateToken;
