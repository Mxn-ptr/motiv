require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const regionRouter = require('./routes/RegionRouter');
const userRouter = require('./routes/UserRouter');
const cityRouter = require('./routes/CityRouter');

const PORT = process.env.PORT || 5050;

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
    },
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to the DB"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cities", cityRouter);
app.use("/api/regions", regionRouter);
app.use("/api/users", userRouter);

app.listen(
    PORT,
    () => {
        console.log("Server has started on port: " + PORT);
    },
);
