
class ProductControllerClass {
    constructor() {
        this.Product = require('../models/product');
    }

    getAllProductsStatic = async (req, res) => {
        const search = 'a';
        const products = await this.Product.find({
            name: {
                $regex: search, $options: 'i'
            } 
        });
        return res.status(200).json({success: true, products: products, nbHits: products.length})
    }
    
    getAllProducts = async (req, res) => {
        const {featured, company, name, sort, fields} = req.query;
        const queryObject = {};

        if (featured) {
            queryObject.featured = featured === 'true' ? true : false
        }

        if (company) {
            queryObject.company = company;
        }

        if (name) {
            queryObject.name = {
                $regex: name,
                $options : 'i'
            };
        }

        let result = this.Product.find(queryObject);
        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        } else {
            result = result.sort('createdAt')
        }

        if(fields) {
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList)
        }

        const product = await result;
        return res.status(200).json({success: true, products: product, nbHits: product.length})
    }

    // single, individual products

    getProduct = async(req, res) => {
        const {name} = req.params;
        const product = await this.Product.find({name: name})

        if (!product){
            return res.status(404).json({success: false, msg: `Product with name ${name} does not exist`})
        }

        return res.status(200).json({success: true, product: product})
    }
}


module.exports = ProductControllerClass;