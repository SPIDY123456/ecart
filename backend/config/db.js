const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,  
        })
          console.log('Mongo DB Connected');
    }
    catch(error){
        console.log('Couldnt connected to MongoDB',error);
        process.exit(1);
    }
}

module.exports = connectDB;
