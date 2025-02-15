// const db = "mongodb://localhost:27017/mean";

const mongoose = require('mongoose');


const connectDB = (uri)=> {
    console.log("connecting to db");
    return mongoose.connect(uri);
}

module.exports = connectDB;