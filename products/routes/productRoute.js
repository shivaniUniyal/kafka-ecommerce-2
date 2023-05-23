//Include express functionalities
const app = require("express").Router();
const verifyToken = require("../middleware/auth");

const {
    viewProduct,addProduct,listProduct
} = require("../controllers/productController");

app.get('/',verifyToken,  listProduct);
app.post('/product/add',verifyToken, addProduct);
app.get('/product/view',verifyToken, viewProduct);

module.exports = app;