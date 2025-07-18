import UserModel from "../features/user/user.model.js";

const basicAuthorizer=(req,res,next)=>{
    //1.Check if authorization header is empty.
    const authHeader=req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }
    //console.log(authHeader);
    // 2. Extract credentails. [Basic qwerttytuuiioissfgfhf]
    const base46Credentials=authHeader.replace('Basic ','');
    //console.log(base46Credentials);

    //3. decode credentials
    const decodedCreds=Buffer.from(base46Credentials,'base64').toString('utf8');
    //console.log(decodedCreds);
    const creds=decodedCreds.split(':');

    const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
    if(user){
        next()
    }else{
        return res.status(401).send("Incorrect Credential");
    }
}
export default basicAuthorizer;