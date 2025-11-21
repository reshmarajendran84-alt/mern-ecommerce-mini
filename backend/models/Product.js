const mongoose =require("mongoose");
    const productSchema = new mongoose.Schema({
        name:{type:String,require:true,trim:true},
            description: {type: String, required: true},

    price: {type: Number, required: true},
        category:{type:String,require:true},
            sizes: { type: Array, required: true},

        image:{type:Array,require:true},
        
    });
    module.exports =mongoose.model('Product',productSchema);
