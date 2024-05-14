const db = require("../config/db");

const getAllUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const results = await db.query(query);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllUsers,
};
