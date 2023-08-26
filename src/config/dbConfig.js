const mongoose = require("mongoose");
require("colors");

// const MONGO_URI =
//   "mongodb+srv://nitera:Bongkibong12@nitera.buijsny.mongodb.net/?retryWrites=true&w=majority";
const dbConnect = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("strictQuery", true);
  var db = await mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("We are connected to mongoose".yellow.bold);
  });
};

// export default dbConnect;
module.exports = dbConnect;
