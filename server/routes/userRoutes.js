const express=require('express');
const router=express.Router();
const middleware=require('../middleware/authmiddleware');

const {
    getuser,
    getusers,
    updateuser,
    deleteuser
}=require('../controller/userController');
router.get('/one/:id',getuser);
router.get('/many',getusers);
router.put('/update/:id',middleware,updateuser);
router.delete('/delete/:id',middleware,deleteuser);
module.exports=router;