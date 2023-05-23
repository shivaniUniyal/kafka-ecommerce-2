const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const producer = require("../../gateway/kafka/producer");
const product = mongoose.model("Product", productModel);


const viewProduct = async (req, res, next) => {
    let productId = req.query.id;
    try {

      let result = await product.findOne({ _id: productId });
      if (result) {
        res.status(200).json({ message: "Product fetched successfully.", data: [result] });
      } else {
        res.status(500).json({ message: "Invalid product id" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  const addProduct = async(req, res, next)=>{
    let data = req.body;
    try {
        let isTitleAlreadyExist = await product.findOne({ product_title: req.body.product_title, });
        if (!isTitleAlreadyExist) {
          let newProduct = new product(data);
          let result = await newProduct.save();
          res.status(200).json({ message: "Product added successfully", data: result });
        } else {
          res.status(400).json({ message: "Title already exists" });
        }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

//=============================LIST ALL PRODUCT====================================================================
const listProduct = async (req, res, next) => {
  try {

     let result = await product.find({});
     console.log("Message Sent: ", "list of products")
     await producer.send({
       topic: 'test-topic-new',
       messages: [
         { value: JSON.stringify(result) },
       ],
     })
    res.status(200).json({
      message: "Products fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {viewProduct, addProduct ,listProduct};