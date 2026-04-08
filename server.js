require("dotenv").config();

const app = require("./server/app");
const connectDB = require("./server/config/db");

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server kører på http://localhost:${PORT}`);
});