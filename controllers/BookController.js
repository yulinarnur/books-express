import Book from "../models/BookModel.js";
import path from "path";
import fs from "fs";

const saveImg = (image) => {
  if (!image || !image.name || !image.data) {
    throw new Error("Invalid image object");
  }

  const imgPath = path.join(__dirname, "../public/uploads", image.name);
  fs.writeFileSync(imgPath, image.data);
  return `../public/uploads/${image.name}`;
};

export const getBooks = async (req, res) => {
  try {
    const response = await Book.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBookById = async (req, res) => {
  try {
    const response = await Book.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createBook = async function (req, res) {
  try {
    let book = await Book.create({
      author: req.body.author,
      price: req.body.price,
      image: req.file.path,
    });
    req.session.message = {
      type: "success",
      message: "Book successfully created!",
    };
    res.redirect("/");
    // res.status(201).json({
    //   message: "Berhasil tambah data buku",
    //   data: book,
    // });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { author, price } = req.body;
    let updateData = { author, price };

    if (req.file && req.file.filename) {
      const imageUrl = req.file.path;
      updateData.image = imageUrl;
      console.log("nahh", updateData);
    }

    // update
    const updatedBook = await Book.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
    // res.status(200).json({ message: "Buku berhasil diperbarui" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Gagal mengupdate buku" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Book Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
