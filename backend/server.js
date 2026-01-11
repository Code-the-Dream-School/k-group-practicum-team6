require("dotenv").config();
const app = require("./src/app");
const connectMongo = require("./src/config/db.mongo");

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectMongo(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
};

startServer();
