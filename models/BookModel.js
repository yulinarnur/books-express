import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Book = db.define(
  "books",
  {
    author: DataTypes.STRING,
    price: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default Book;

(async () => {
  await db.sync();
})();