const checkVerified = (req, res, next) => {
    if (!req.user.isVerified) {
        return res.status(403).json({ message: 'Account verification required to access this resource' });
    }
    next();
};
module.exports = checkVerified;