const app = require("./app");
const connectDatabase = require("./config/db");

const serverPort = process.env.PORT || 8800;

async function startServer() {
  try {
    await connectDatabase();
    app.listen(serverPort, () => {
      console.log(`Server is running at http://localhost:${serverPort}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
}

startServer();
