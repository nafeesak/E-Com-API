import UserModel from '../user/user.model.js'
import { ApplicationError } from '../../error-handler/applicationError.js';
export default class ProductModel {
  constructor(id, name, desc, price, imageUrl,category,sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category=category;
    this.sizes=sizes
  }
  static getAll(){
    return products;
  }
  static add(product){
    product.id=product.length+1,
    products.push(product);
    return product;
  }
  static get(id){
    const product=products.find(i=>i.id==id);
    return product;
  }
  static filter(minPrice,maxPrice,category){
    const result=products.filter((product)=>{
        return(
           (!minPrice || product.price>=minPrice) &&
          ( !maxPrice || product.price<=maxPrice) &&
         (  !category|| product.category==category)
        )
    });
    console.log(result)
    return result;
  }
  static rateProduct(userId,productId,rating){
    //1. Validate User
    const user=UserModel.getAll().find(u=>u.id==userId)
    if(!user){
      throw new ApplicationError("User not found",404);
    }
    //2. Validate Product
    const product=products.find((p)=>p.id==productId);
    if(!product){
      throw new ApplicationError("Product not found",400);
    }
    //3. Check if there is any rating and if not then add the rating array
    if(!product.rating){
      product.rating=[];
      product.rating.push({userID:userId,rating:rating})
    }else{
      //4. check if user rating is already available
      const existingRating=product.rating.findIndex((r)=>r.userID==userId);
      if(existingRating>=0){
        product.rating[existingRating]={userID:userId,rating:rating}
      }else{
        //5. if no exiting rating then add new ratring
           product.rating.push({userID:userId,rating:rating})
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 10',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Category1'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Category2',
         ['M','XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Category3',
      ['M','XL','S']
  ),
  
];
