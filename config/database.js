const mongoose = require('mongoose');

const dbName = 'wildlife';
const connctionString = `mongoDB://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connctionString(connctionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database');

        mongoose.connection.on('error', (err) => {
            console.error("Database error");
            console.error(err);
        });
    } catch (err) {
        console.error('Error connection to database');
        process.exit(1);
    }
}