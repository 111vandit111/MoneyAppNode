import mongoose from "mongoose";
import winston from "winston";

const db= function () {
    mongoose
      .connect("mongodb://localhost/moneyappproducts")
      .then(() => console.log("Connected to MongoDB..."));
  };

export default db;