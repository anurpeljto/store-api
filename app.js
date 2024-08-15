require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const products = require('./routes/products');

// middleware

app.use(express.json());

// route(s)

app.get('/', (req, res) => {
    res.send('<h1> Store API </h1> <a href="/api/v1/products"> Products </a>')
})

app.use('/api/v1/products', products)

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();

