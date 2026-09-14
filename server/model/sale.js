const mongoose=require('mongoose');
const saleSchema= new mongoose.Schema({
    product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
    },
    quantity:{
        type: Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    date:{
        type:Date,
        default:Date.now,
    },
    customer:{
        type:String,
        trim:true,
    },   
},{timestamps:true});
module.exports=mongoose.model('sale',saleSchema);