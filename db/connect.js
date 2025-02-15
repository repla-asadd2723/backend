// const db = "mongodb://localhost:27017/mean";

const mongoose = require('mongoose');

const uri = "mongodb+srv://pkprogrammer1:MNMdMqm5VJNXPNWf@cluster-backend.vaizo.mongodb.net/cluster-backend?retryWrites=true&w=majority&appName=cluster-backend"

const connectDB = () => {
    return mongoose.connect(uri);
}

module.exports = connectDB;