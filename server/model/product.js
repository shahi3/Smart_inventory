const mongoose= require('mongoose');
const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    sku:{
        type:String,
        required: true,
        trim: true,
        unique:true

    },
    category:{
        type:String
    },
    costprice:{
        type:Number,
        required: true
    },
    sellprice:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        default: 0
    },
    reorderLevel: {
        type: Number,
        default: 10          
    },
   
    supplier:{
        type: String,
    },
    isactive:{
        type:Boolean,
        default:true
    }   
}, {timestamps: true});
module.exports=mongoose.model('product',productSchema);