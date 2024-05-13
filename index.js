import express from "express";
import BookRoute from "./routes/BookRoute.js";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
// set template engine
app.set("view engine", "ejs");
app.use(BookRoute);

app.use("/public", express.static("public"));

app.listen(5000, () => console.log("Server up and running ..."));
