// Error handling utility to avoid repetitive try-catch patterns

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        });
    };
};

module.exports = { asyncHandler };
