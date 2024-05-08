import express from "express";
import multer from "multer"; // Mengimpor multer menggunakan sintaks ES module
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/BookController.js";

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

router.get("/books", getBooks);
router.get("/books/:id", getBookById);

router.post("/books", upload.single("image"), createBook);

router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
