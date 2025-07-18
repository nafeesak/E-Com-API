import CartModel from "./cart.model.js";
export  class CartController{
    add(req,res){
       const {productId,quantity}=req.query;
       const userId=req.userId;
       CartModel.add(productId,userId,quantity);
       res.status(201).send("Cart is updated")
    }
    get(req,res){
        const userId=req.userId;
        const items=CartModel.get(userId);
        return res.status(200).send(items)
    }
    delete(req,res){
        const userId=req.userId;
        const cartItemId=req.params.id;
        const error=CartModel.delete(cartItemId,userId);
        if(error){
            return res.status(404).send(error)
        }else{
            return res.status(200).send('Cart Item is removed ')
        }
    }
}