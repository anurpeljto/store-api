// const  { CustomError } = require("../errors/customError");

const errorHandler = async (err, req, res, next) => {
    // if(err instanceof CustomError){
    //     return res.status(err.statusCode).json({error: err.message})
    // }

    console.log(err);
    return res.status(500).json({msg: 'Something went wrong'});
}

module.exports = errorHandler;