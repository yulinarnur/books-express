import express from "express";
import multer from "multer";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/BookController.js";
import { Book } from "../models/BookModel.js";
import session from "express-session";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// ejs
router.get("/", (req, res) => {
  Book.findAll()
    .then((books) => {
      if (books.length > 0) {
        res.render("index", {
          title: "Home Page",
          books: books,
          message: null,
        });
      } else {
        res.render("index", {
          title: "Home Page",
          books: null,
          message: {
            type: "warning",
            text: "No books found in the database.",
          },
        });
      }
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
});

router.get("/books", (req, res) => {
  res.render("add_books", { title: "Add Books" });
});

// ------------------------------

// router endpoint
router.get("/books", getBooks);
router.get("/books/:id", getBookById);

router.post("/booksAdd", upload.single("image"), createBook);
router.patch("/books/:id", upload.single("image"), updateBook);

// router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
