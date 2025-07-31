

export default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name,
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id
    }
    static getAll(){
        return users;
    }
}
var users=[{
    id:1,
    name:"Admin User",
    email:"admin@ecom.com",
    password:'Password1',
    type:"seller",

},
{
    id:2,
    name:"CustomerUser",
    email:"customer@ecom.com",
    password:'Password1',
    type:"customer",

}]