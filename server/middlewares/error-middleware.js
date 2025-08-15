const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const name = err.name || 'InternalServerError';
    const message = err.message || 'Backend Error';
    const extraDetails = err.extraDetails || "Something went wrong in server";
    res.status(status).json({name,message, extraDetails});
}

module.exports = errorMiddleware;