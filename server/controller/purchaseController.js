const purchase=require('../model/purchase');
const product=require('../model/product');
exports.createpurchase =async (req,res)=>{
    try{
        const Purchase= await purchase.create(req.body);
        await product.findByIdAndUpdate(req.body.product,{
            $inc:{stock:req.body.quantity}
        });
        res.status(201).json(Purchase);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }

}
exports.getpurchase=async(req,res)=>{
    try{
        const Purchase=await purchase.findById(req.params.id);

        if(!Purchase){
            res.status(404).json({
                message:'purchase not found'
            });

        }
        else{
            res.status(200).json(Purchase);
        }

    }
    catch(err){
        res.status(404).json({message:err.message});
    }

}
exports.getpurchases=async(req,res)=>{
    try{
        const Purchase = await purchase.find();
        res.status(200).json(Purchase);
    }
    catch(err){
        res.status(404).json({message:err.message});  
    }

}
exports.updatepurchase=async(req,res)=>{
    try{
        const Purchase =await purchase.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators: true
        });
        if(!Purchase){
            res.status(400).json({
                message:'purchase not found'
            });
        }
        else{
            res.status(200).json(Purchase);
        }

    }
    catch(err){
        res.status(404).json({message:err.message});
    }

}
exports.deletepurchase=async(req,res)=>{
    try{
        const Purchase =await purchase.findByIdAndDelete(req.params.id);
        if(!Purchase){
            res.status(400).json({
                message:'purchase not found'
            });
        }
        else{
            res.status(200).json(Purchase);
        }

    }
    catch(err){
        res.status(404).json({message:err.message});
    }

}