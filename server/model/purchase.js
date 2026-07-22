const mongoose=require('mongoose');
const purchaseSchema=new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity:{
        type:Number,
        default:+0
    },
    supplier:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,

    },
    date:{
        type:Date,
        default:Date.now,
    },
},{timestamps:true});
module.exports=mongoose.model('purchase',purchaseSchema);