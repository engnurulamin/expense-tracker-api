const mongoose = require("mongoose");
const { MONGODB_URL } = require("../secret");

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected successfully");
    mongoose.connection.on("error", (error) => {
      console.error("Connection Error :", error);
    });
  } catch (error) {
    console.error("DB Connection Fail:", error.toString());
  }
};

module.exports = connectDatabase;
