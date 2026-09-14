const express =require('express');
const router =express.Router();
const middleware=require('../middleware/authmiddleware');

const{
    createpurchase,
    getpurchase,
    getpurchases,
    updatepurchase,
    deletepurchase
}=require('../controller/purchaseController');
router.get('/one/:id',getpurchase);
router.get('/many',getpurchases);
router.post('/create',middleware,createpurchase);
router.put('/update/:id',middleware,updatepurchase)
router.delete('/delete/:id',middleware,deletepurchase);
module.exports =router;