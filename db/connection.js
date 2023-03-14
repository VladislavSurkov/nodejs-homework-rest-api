const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Database connection successful`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { connectDb };
