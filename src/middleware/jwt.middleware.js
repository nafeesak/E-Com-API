import jwt from 'jsonwebtoken'
const jwtAuth=(req,res,next)=>{
    //1. Read the token
    const token=req.headers["authorization"];
    //2.if no token ,return error
    if(!token){
        return res.status(401).send("Unauthorized")
    }
    //3. check if token is valid
    try {
        const payload=jwt.verify(
            token,
            'Kg7CTDFMWEt6GueE3wkujj6uCYpwaebg'
        );
        req.userId=payload.userID;
        console.log(payload)
    } catch (error) {
        //4. return error
        console.log(error)
         return res.status(401).send("Unauthorized")
    }
    //5. call next middleware
    next();
}
export default jwtAuth;