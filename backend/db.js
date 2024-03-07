const mongoose = require("mongoose");
const url = "mongodb://user1234:communityp@ac-omj25r2-shard-00-00.qwtvkif.mongodb.net:27017,ac-omj25r2-shard-00-01.qwtvkif.mongodb.net:27017,ac-omj25r2-shard-00-02.qwtvkif.mongodb.net:27017/?ssl=true&replicaSet=atlas-ln8lde-shard-0&authSource=admin&retryWrites=true&w=majority";


module.exports.connect = () => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => console.log("Error: ", error));
  };