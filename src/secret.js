let MONGO_LOCAL_URL = "mongodb://localhost:27017/expense-tracker";
let MONGODB_URL =
  "mongodb+srv://namin:namin1234@cluster0.srqbspp.mongodb.net/expense-tracker" ||
  MONGO_LOCAL_URL;

const JWT_ACTIVATION_KEY = "feguirgetoij8745983456uhnfgjntghtk";

module.exports = { MONGODB_URL, JWT_ACTIVATION_KEY };
