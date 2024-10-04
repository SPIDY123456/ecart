const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register',async(req,res)=> {
    
        const {username,phone,password} = req.body;
        const hashedPassword = await bcrypt.hash(password ,10);
        const user = new User ({username,phone,password: hashedPassword});

        try {
            await user.save();
            res.status(201).send('User registered successfully');

        }
        catch(error){
            res.status(400).send('Error registering the user');
        }

});


router.post('/login', async(req,res)=> {

    try {  
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (!user || !(await bcrypt.compare(password,user.password)) ){
         return res.status(401).send('Invalid Credentials');

    }
    const token = jwt.sign({_id: user._id,role: user.role},process.env.JWT_SECRETKEY ,{expiresIn: '2h'});
     return res.status(200).json({token});
}catch(error) {

        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
}
})


module.exports = router;