const express=require('express');
const router=express.Router();
const middleware=require('../middleware/authmiddleware');
const {
    createproduct,
    getproduct,
    getproducts,
    updateproduct,
    deleteproduct,
    getlowstock,
    getmargins
}=require('../controller/productController');
router.get('/many',getproducts);
router.get('/one/:id',getproduct);
router.post('/create',middleware,createproduct);
router.put('/update/:id',middleware,updateproduct);
router.delete('/delete/:id',middleware,deleteproduct);
router.get('/low-stock',middleware,getlowstock);
router.get('/margins',middleware,getmargins);
module.exports = router;