import express from "express";
import BookRoute from "./routes/BookRoute.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(BookRoute);

app.use("/public", express.static("public"));

app.listen(5000, () => console.log("Server up and running ..."));
