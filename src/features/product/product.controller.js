import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      //console.log(err)
      return res.status(400).send("Something went wrong");
    }
  }
  async addProduct(req, res) {
    try {
      const { name, desc, price, imageUrl, category, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req.file.filename,
        category,
        sizes.split(",")
      );

      const createdRecord = await this.productRepository.add(newProduct);

      res.status(201).send(createdRecord);
    } catch (err) {
      // console.log(err)
      return res.status(400).send("Something went wrong");
    }
  }
  async rateProduct(req, res) {
    // console.log(req.query)
    try {
      const userID = req.userId;

      const productID = req.body.productId;
      const rating = req.body.rating;
      // console.log(productID,rating,userID)
      await this.productRepository.rating(userID, productID, rating);
      return res.status(200).send("Rating has been added");
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);

      if (!product) {
        res.status(404).send("Product not product");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      return res.status(400).send("Something went wrong");
    }
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(
        minPrice,
        categories
      );
      res.status(200).send(result);
    } catch (err) {
        console.log(err)
      return res.status(400).send("Something went wrong");
    }
  }
  async averagePrice(req, res, next){
    try{
      const result =await this.productRepository.averageProductPricePerCategory();
      res.status(200).send(result);
    }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
  }
}
