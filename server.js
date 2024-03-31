const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./database/config");
const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const portfolio = require("./routes/portfolioRoute");
const cors = require("cors");
const serverless = require("serverless-http");
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/portfolio", portfolio);

module.exports.handler = serverless(app);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
