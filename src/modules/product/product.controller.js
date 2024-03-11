import { Product } from "../../../DB/models/product.model.js";
import { Resturant } from "../../../DB/models/resturant.model.js";
import { Category } from "../../../DB/models/category.model.js";

export const createProduct = async (req, res, next) => {
    let isResturant = await Resturant.findById(req.body.resturant);
    if (!isResturant) return next(new Error("Resturant Not Found"));
    let isCategory = await Category.findById(req.body.category);
    if (!isCategory) return next(new Error("Category Not Found"));
   await Product.create(req.body);
  return res.json({ success: true, message: "Product Added Successfully" });
};

export const getProducts = async (req, res, next) => {
  const products = await Product.find();
  return res.json({ success: true, products });
}