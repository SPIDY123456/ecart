const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { generateToken, auth } = require('./middleware/auth');
// const routes= require('./routes/auth');

const authRoutes = require('./routes/auth');
const prodRoutes = require('./routes/product');
const orderRoutes = require('./routes/orders');


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());



app.post('/login', (req, res) => {
    const user = { _id: username }; // This would be fetched from your database
    const token = generateToken(user);
    res.json({ token }); // Send the token back to the client
});


// console.log()







app.use('/auth', authRoutes);// Make sure this is correct
app.use('/product', prodRoutes);  
app.use( '/orders',orderRoutes);







const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> {
    console.log(`Server running on port :${PORT}`);  // 
})


