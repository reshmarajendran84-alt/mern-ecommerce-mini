const express=require('express');
const router =express.Router();/*You create a mini-express app called router.
All product-related routes will live inside this.*/
const upload = require("../middlewares/upload");/*This points to your multer setup file.
upload.single("image") means:
Expect one file
Field name is "image" (from your React form)*/
const {
    getProducts,//fetching products
    addProduct,//adding product
    getProductById//getting product by id

} = require("../controllers/productsController");
//saving image ,inserting into MongoDB
router.get("/", getProducts);/*✔ GET /api/products → Get all products
This route handles:
search
category filter
sort
pagination
(You will add that inside the controller.)*/
router.get("/:id",getProductById);//✔ GET /api/products/:id → Get single product,-used for single product page
router.post('/', upload.single("image"), addProduct);

/*This does 3 things in order:
upload.single("image")
Multer takes image from the request
Saves it to /uploads folder
Adds req.file to the request
addProduct
Reads req.body
Reads req.file.filename
Saves product to MongoDB*/
module.exports=router; //Export the router -app.use('/api/products', productsRouter);

