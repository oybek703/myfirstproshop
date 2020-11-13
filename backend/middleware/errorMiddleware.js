module.exports = (err, req, res, next) => {
    console.error(err.message);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({msg: err.message});
}