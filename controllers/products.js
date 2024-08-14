
const asyncWrapper = require('../middleware/asyncWrapper');

class ProductControllerClass {
    getAllProductsStatic = asyncWrapper(async (req, res) => {
        return res.status(200).json({msg: 'Products testing route'}) 
    });
    
    getAllProducts = asyncWrapper(async (req, res) => {
        return res.status(200).json({msg: 'Products route'}) 
    });
}


module.exports = ProductControllerClass;