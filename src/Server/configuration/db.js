const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://sivasangeeth04:sangeeth04@cluster0.5oss2x4.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      "Database connected:",
      connection.connection.host,
      connection.connection.name
    );
    return connection;
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectdb;
