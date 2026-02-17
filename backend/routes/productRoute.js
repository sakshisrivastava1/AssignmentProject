import express from 'express'
import { addProduct, getAllProducts, getProductById, removeProduct, updateProduct } from '../controllers/productController.js'
import upload from '../middlewares/multer.js'
import { validateCreateProduct } from '../middlewares/productValidation.js'
import { isAuth } from '../middlewares/isAuth.js'
import { authRole } from '../middlewares/authRole.js'

const router = express.Router()

router.get('/getAll',isAuth,getAllProducts)
router.get("/getById/:id",isAuth,getProductById);

router.post('/add',
    upload.single('image'),
    validateCreateProduct,
    isAuth,
    authRole('admin'),
    addProduct) 

router.put("/update/:id",upload.single('image'), isAuth,authRole('admin'), updateProduct);
router.delete('/remove/:id',isAuth,authRole('admin'),removeProduct)

export default router 