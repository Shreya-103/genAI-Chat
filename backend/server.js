const app = require("./src/App");
require('dotenv').config();
const connectdb = require("./src/db/db");

connectdb();

// const PORT = 3000;

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});