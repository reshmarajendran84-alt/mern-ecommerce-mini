const Product = require("../models/Product"); // Import Product model
// const { search } = require("../routes/products");
// ADD PRODUCT (with image upload)
exports.addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body; //You extract fields from the request body.
    const product = new Product({
      name,
      price,
      category,
      image: req.file ? req.file.filename : null /*req.file comes from Multer.
If image uploaded → save filename
If no image → save null*/,
    });
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
