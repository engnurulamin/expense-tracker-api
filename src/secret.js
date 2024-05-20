let MONGO_LOCAL_URL = "mongodb://localhost:27017/expense-tracker";
let MONGODB_URL =
  "mongodb+srv://namin:namin1234@cluster0.srqbspp.mongodb.net/expense-tracker" ||
  MONGO_LOCAL_URL;

const JWT_ACTIVATION_KEY = "feguirgetoij8745983456uhnfgjntghtk";
const JWT_ACCESS_KEY = "awerrtfh5iufgeueuyj646656098ujghrtkfgdfjg";
const JWT_REFRESH_KEY = "fsgjdsfghrtfjet6876867dfgdrthytu";

module.exports = {
  MONGODB_URL,
  JWT_ACTIVATION_KEY,
  JWT_ACCESS_KEY,
  JWT_REFRESH_KEY,
};
