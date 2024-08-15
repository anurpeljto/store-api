
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
        const {featured, company, name, sort, fields, numericFilters} = req.query;
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

        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '<' : '$lt',
                '>=': '$gte',
                '<=': '$lte',
                '=': '$eq'
            }

            const regEx = /\b(<|>|=|<=|>=)\b/g
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)

            const options = ['price', 'rating'];   
            filters = filters.split(',').forEach((item) => {
                const [field,operator,value] = item.split('-')
                if(options.includes(field)){
                    queryObject[field] = {
                        [operator]: Number(value)
                    }
                }
            })
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

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page-1)*limit;

        result = result.skip(skip).limit(limit);

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