import express from "express";
const router = express.Router();
import {Products  , validateProduct} from "../models/Products.js";
import moment from "moment";

router.get("/",async(req,res)=>{
    const product = await Products.find().sort("Name");
    res.status(200).send(product);
})

router.get("/:id",async(req,res)=>{
    
    const ProductID = req.params.id 
    console.log(ProductID)
    let product = await Products.findById({_id:ProductID},{price:1,Name:1,Reviews:1}).populate("Reviews");
    if (!product)
    return res.status(404).send("The Product with the given ID was not found.");
    return res.status(200).json ({product,
    review: product.Reviews
  });
})

router.post("/", async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.message);
    
    let datenew = moment().format('YYYY/MM/D/H/mm/ss')

    let product = new Products({
      Name: req.body.Name,
      price:req.body.price,
      uDate: datenew,
      cDate: datenew
    });
    
    product = await product.save();
    res.status(200).send(product);
  });
 
  router.put("/:id", async (req, res) => {
    let datenew = moment().format('YYYY/MM/D/H/mm/ss')
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        Name: req.body.Name,
        price: req.body.price,
        uDate:datenew
      },
      {
        new: true,
      }
    );

    if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  res.send(product);
});

router.delete("/:id", async (req, res) => {
    const Product = await Products.findByIdAndRemove(req.params.id);
  
    if (!Product)
      return res.status(404).send("The Product with the given ID was not found.");
    res.send(Product);
  });


  export default router;