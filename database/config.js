require("dotenv").config();

module.exports = {
  url: `mongodb+srv://${process.env.USER_NAME}:${process.env.MONGO_PASS}@blogcluster.kadyinm.mongodb.net/`,
};
