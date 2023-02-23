const ErrorMiddleware = (err, req, res, _next) => {
  res.status(500).json({ error: err.message });
};
export default ErrorMiddleware;
