const mongoose =require("mongoose");
    const productSchema = new mongoose.Schema({
        name:{type:String,require:true,trim:true},
        price:{type:String,require:true,},
        category:{type:String,require:true},
        image:{type:String},
        
    });
    module.exports =mongoose.model('product',productSchema);
