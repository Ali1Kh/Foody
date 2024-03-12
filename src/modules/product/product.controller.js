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
  let products = await Product.find().populate([
    {
      path: "resturant",
      select: "name phone address openingTime closingTime",
    },
    "category",
    {
      path: "resturantSubCategory",
      select: "subCategories",
    },
  ]);

  products.map((product) => {
    let subCategory = product.resturantSubCategory[0].subCategories.filter(
      (subCategoryItem) =>
        subCategoryItem._id.toString() == product.resturantCategory.toString()
    )[0];

    product.resturantSubCategory = subCategory;
  });

  return res.json({ success: true, products });
};

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Error("Product Not Found"));
  }
  await product.deleteOne();
  return res.json({ success: true, message: "Product Deleted Successfully" });
};
