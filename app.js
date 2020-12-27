require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const mediaRouter = require("./routes/media");
const refreshTokenRouter = require("./routes/refreshTokens");
const mentorsRouter = require("./routes/mentors");
const chaptersRouter = require("./routes/chapters");
const lessonsRouter = require("./routes/lessons");
const imageCoursesRouter = require("./routes/imageCourses");
const myCoursesRouter = require("./routes/myCourses");
const reviewsRouter = require("./routes/reviews");
const webhookRouter = require("./routes/webhook");
const orderPaymentRouter = require("./routes/ordersPayment");

const verifyToken = require("./middlewares/verifyToken");
const can = require("./middlewares/permission");

const app = express();

const cors = require("cors");
app.use(cors("*"));

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set('views', './views');
app.set('view engine', 'ejs');

// dashboard
app.use("/", indexRouter);
app.use("/dashboard", adminRouter);

// api
app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/media", verifyToken, can("admin", "student"), mediaRouter);
app.use("/refresh-tokens", refreshTokenRouter);
app.use("/mentors", verifyToken, can("admin"), mentorsRouter);
app.use("/chapters", verifyToken, can("admin"), chaptersRouter);
app.use("/lessons", verifyToken, can("admin"), lessonsRouter);
app.use("/image-courses", verifyToken, can("admin"), imageCoursesRouter);
app.use("/my-courses", verifyToken, can("admin", "student"), myCoursesRouter);
app.use("/reviews", verifyToken, can("admin", "student"), reviewsRouter);
app.use("/orders", verifyToken, can("admin", "student"), orderPaymentRouter);
app.use("/webhook", webhookRouter);

module.exports = app;
