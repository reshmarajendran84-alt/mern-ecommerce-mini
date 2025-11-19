const express =require('express');//express → to create server & handle routes.
const core =require('cors');//cors → allows frontend (React) to talk to backend.
const mongoose = require('mongoose');//mongoose → to connect Node.js with MongoDB.
require('dotenv').config();
//.env contains secret keys process.env.PORT and process.env.MONGO_URI come from this file.
const productsRouter = require("./routes/products");
/*This means you created a separate file for product routes.
Helps your project stay organized using MVC pattern.
*/
// Middlewares
const app =express();// Initialize express app
app.use(core());//Without this, React frontend cannot call your backend.
app.use(express.json());//So backend can read JSON data from POST/PUT requests.
app.use('/uploads',express.static('uploads'));//When you upload product images via Multer, they go inside /uploads.
// Routes
app.use("/api/products", require("./routes/products"));
///api/products → handled by productsRouter
// Start server
const PORT =process.env.PORT || 5000;
// MongoDB connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully 🚀");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err);
  });
