const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

//Error Handler class for errors
class ErrorHandler extends Error {
  constructor(statusCode, errorCode, errorMessage) {
    super();
  }
}

// Accept CORS only from React Frontend Client Origin
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use("/uploaded", express.static(path.join(__dirname, "../uploads")));

app.use(upload.array("files", 3));

app.post("/upload_files", (err, req, res, next) => {
  if (err || !req.files) {
    console.log("The error", err);
    next(new ErrorHandler(500, "UPLOAD_ERROR", "Error during file upload."));
  } else {
    console.log(req.files);
    res.status(200).json({ data: "Successfully uploaded files" });
  }
});

// make server app handle any error
app.use((err, _, res, __) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    errorCode: err.errorCode,
    statusCode: err.statusCode,
    message: err.errorMessage,
  });
});

const port = process.env.FILE_SERVER_PORT || 3001;

app.listen(port, () => console.log(`> Listening on port ${port}`));
