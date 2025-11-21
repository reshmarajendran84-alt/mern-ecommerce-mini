const express =require('express');
const core =require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const productsRouter = require("./routes/products");

const connectDB = require("./config/db"); 

// Middlewares
const app = express();
app.use(core());
app.use(express.json());
app.use('/uploads',express.static('uploads'));//When you upload product images via Multer, they go inside /uploads.
// Routes
app.use("/products", productsRouter);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});