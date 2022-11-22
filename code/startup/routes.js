import express from "express"
import product from "../routes/Product.js"
import reviews from "../routes/Reviews.js"


const routes = (app) => {
  app.use(express.json());
  app.use("/api/product", product);
  app.use("/api/reviews", reviews);
};

export default routes;