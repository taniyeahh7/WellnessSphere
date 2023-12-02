const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();

const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const blogCategoryRouter = require("./routes/blogCatRoute");
const healthConditionsRouter = require("./routes/healthCondRoute");
const inqRouter = require("./routes/inqRoute");

const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blogCategory", blogCategoryRouter);
app.use("/api/healthConditions", healthConditionsRouter);
app.use("/api/inquiry", inqRouter);

app.use(notFound);
app.use(errorHandler);

app.use("/", (req, res) => {
	res.send("Hello from the server!");
});

app.listen(PORT, () => {
	console.log(`Server is running at PORT ${PORT}`);
});
