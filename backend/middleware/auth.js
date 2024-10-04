const jwt = require('jsonwebtoken');

const JWT_SECRETKEY = process.env.JWT_SECRETKEY || 'S0m3R@nd0mJWT!Key12345*&^%';




const generateToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRETKEY, { expiresIn: '1h' }); // Set expiration as needed
};

const auth = (req,res,next) => {
    const token = req.headers['Authorization Granted'];
    if(!token) return res.status(403).send('No token provided');



    jwt.verify(token,process.env.JWT_SECRETKEY, (err,decoded) => {
        if(err) return res.status(500).send('Authentication failed');
        req.user = decoded.id;
        req.role = decoded.role;
        next();
    })
}   

const user = { _id: 'diwakarlewis@gmail.com' }; // Replace with your user data
const token = generateToken(user);
console.log('Generated JWT:', token);

module.exports = auth;

