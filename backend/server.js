require('dotenv').config();
const app = require('./src/app');
const connectMongo = require('./src/config/db.mongo');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectMongo(process.env.MONGO_URI);
  console.log(`Server running on http://localhost:${PORT}`);
});