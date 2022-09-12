const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images/", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("💐🌻🌿 Connected to mongodb 🌹🦋🌴🌸"))
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/backend/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been upload");
});

app.use("/backend/auth", authRoute);
app.use("/backend/users", usersRoute);
app.use("/backend/posts", postsRoute);
app.use("/backend/categories", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("backend has running 🤘🚀");
});
