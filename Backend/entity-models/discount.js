const mongoose = require("mongoose");
const discountSchema = new mongoose.Schema({
    coupen:{
        type: String,
        required: true,
    },
    discountpercent: {
        type: Number,
        required: true,
    }
})

discountSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  discountSchema.set("toJSON", {
    virtuals: true,
  });
  
const model =mongoose.model('coupen', discountSchema);
module.exports= model