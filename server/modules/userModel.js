const {Schema,model} = require('mongoose');
const {ObjectId} = Schema.Types;

const userSchema = new Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    userRecipe:{type:ObjectId, ref:"Recipe"},
    isAdmin:{type:Boolean, default:false},
},{timestamps: true});   


module.exports= model("User", userSchema);