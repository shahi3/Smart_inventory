const express=require('express');
const router=express.Router();
const middleware=require('../middleware/authmiddleware');
const {
    createsale,
    getsale,
    getsales,
    updatesale,
    deletesale
}=require('../controller/saleController');

router.post('/create',middleware,createsale);
router.get('/one/:id',getsale);
router.get('/many',getsales);
router.put('/update/:id',middleware,updatesale);
router.delete('/delete/:id',middleware,deletesale);
module.exports=router;