require('dotenv').config();
const app = require('./src/app');
const connectMongo = require('./src/config/db.mongo');

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectMongo(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }

}

start();

// app.listen(PORT, () => {
//   connectMongo(process.env.MONGO_URI);
//   console.log(`Server running on http://localhost:${PORT}`);
// });