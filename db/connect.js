const db = "mongodb://localhost:27017/mean";

const mongoose = require('mongoose');

const uri = "mongodb+srv://pkprogrammer1:MNMdMqm5VJNXPNWf@cluster-backend.vaizo.mongodb.net/cluster-backend?retryWrites=true&w=majority&appName=cluster-backend"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
}