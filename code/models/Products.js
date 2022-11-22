import Joi from "joi";
import mongoose from "mongoose";

const ProductSchmea = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    },
    cDate:{
        type:String,
    },
    uDate:{
        type:String,
    },
    price:{
        type:Number,
    }
    
})

ProductSchmea.virtual("Reviews", {

    ref: "Reviews",
    
    foreignField: "ProductID",
    
    localField: "_id",
    
    }); 


const Products = mongoose.model("Product", ProductSchmea);


function validateProduct(Product) {
    const Schema = Joi.object({
        Name:Joi.string().min(5).max(50).required(),
        price: Joi.number().required()
    })

    return Schema.validate(Product);
}

export {Products ,ProductSchmea , validateProduct};
