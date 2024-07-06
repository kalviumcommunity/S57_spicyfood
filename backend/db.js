const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://2005hariniramesh:hariniramesh@cluster0.ts4dewh.mongodb.net/food_name?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    }
};

// const DisconnectDB = async () => {
//     await mongoose.disconnect();
//     console.log('Mongoose disconnected');
// };

const checkConnected = () => {
    return mongoose.connection.readyState===1;
};

module.exports = {
    connectDb,
    checkConnected
};


