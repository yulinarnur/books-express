import { Sequelize } from "sequelize";

const db = new Sequelize("books_express", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
