const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");





// Create Product--Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    })
});



//Get All Product
exports.getAllProducts =catchAsyncErrors( async(req, res) => {

  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

    const ApiFeatures= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await ApiFeature.query;
    
    res.status(200).json({
        success: true,
        products
      });

    //res.status(200).json({message:"Route is working fine"})
    
    });
// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return next(new ErrorHander("product found", 404));
    }

   
  

    res.status(200).json({
      success: true,
      product,
      productCount,
    });
  
});


    // Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return res.status(500).json({
        success : false,
      message:"Product not found"
    });

  }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        product,
});
});
      // Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return res.status(500).json({
        success:false,
      message:"Product not found"})
    }


    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
});