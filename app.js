const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', require('./routes/products'));

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  catch (error) {
    console.error(error);
  }
}


start()