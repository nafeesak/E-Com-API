import CartModel from "./cart.model.js";
import CartItemsRepository from "./cart.repository.js";
export  class CartController{
    constructor(){
            this.cartItemsRepository=new CartItemsRepository();
        }
   async add(req,res){
    try{
        const {productId,quantity}=req.body;
       const userId=req.userId;
      await this.cartItemsRepository.add(productId,userId,quantity);
       res.status(201).send("Cart is updated")
    }catch(err){
           // console.log(err)
              return res.status(400).send("Something went wrong")     
            }
       
    }
    async get(req,res){
        const userId=req.userId;
        const items= await this.cartItemsRepository.get(userId);
        return res.status(200).send(items)
    }
   async delete(req,res){
        const userId=req.userId;
        const cartItemId=req.params.id;
        const isDeleted=await this.cartItemsRepository.delete(cartItemId,userId);
        if(!isDeleted){
            return res.status(404).send("Item not found")
        }return res
        .status(200)
        .send('Cart item is removed');
    }
}