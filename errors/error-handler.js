import { CustomError } from "./customError";


const errorHandler = async (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({error: err.message})
    }
    return res.status(500).json({msg: 'Something went wrong'});
}

module.exports = errorHandler;