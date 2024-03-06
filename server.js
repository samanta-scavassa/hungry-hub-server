require("dotenv").config();
const PORT = process.env.PORT;
const app = require("./app");

console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is listening on PORT http://localhost:${PORT}`);
});
