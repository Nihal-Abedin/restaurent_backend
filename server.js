const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Successfully Connected!");
  });

app.listen(process.env.PORT, () => {
  console.log(`App runing on port: ${process.env.PORT}`);
});
