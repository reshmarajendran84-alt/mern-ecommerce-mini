const Product = require("../models/Product"); 

exports.addProduct = async (req, res) => {
  try {
    const { name, price, category ,description,sizes} = req.body; //You extract fields from the request body.
    const product = new Product({
      name,
            price: Number(price),
      category,
                  description,
                              sizes: JSON.parse(sizes),
            image: imagesUrl,


      image: req.file ? req.file.filename : null /*req.file comes from Multer.
If image uploaded → save filename
If no image → save null*/,
    });
    const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2, image3, image4].filter((item)=> item !== undefined);
         let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                return result.secure_url
            })
        )

    await product.save(); //Save product to MongoDB
    res.json({ message: "Product added", product }); //Return the saved product
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

//Get Products with Search + Filter + Sort + Pagination
exports.getProducts = async (req, res) => {
  try {
    const { search, category, sort, page = 1, limit = 5 } = req.query;
    // Build a dynamic query object
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    } //search → filter by name (case-insensitive)
    if (category) {
      query.category = category;
      // filter → by category
    } //sorting
    // Start MongoDB find query
    let productsQuery = Product.find(query);

    // Sorting
    if (sort === "low") productsQuery = productsQuery.sort({ price: 1 }); // Low → High
    if (sort === "high") productsQuery = productsQuery.sort({ price: -1 }); // High → Low

    // Pagination
    const skip = (page - 1) * limit; /*page = 1 → skip = 0
page = 2 → skip = 5
page = 3 → skip = 10 */
    const total = await Product.countDocuments(query);
    //count total items(for frontend pagination)
    const rows = await productsQuery.skip(skip).limit(Number(limit));
    res.json({ rows, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
//function remove product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: 'Product Removed'});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); //    // Fetch specific product by MongoDB _id
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}; /*Read ID from URL → /api/products/65ab34d95
Look it up in database
Return the product*/
