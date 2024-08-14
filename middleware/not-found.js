
const notFound = (req, res, next) => {
    return res.status(404).send('Not found');
}

module.exports = notFound