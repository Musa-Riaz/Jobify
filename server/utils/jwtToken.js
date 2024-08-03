exports.sendToken = (user, statusCode, res, message) => {
const token = user.getJwtToken();
const options = {
    expires : new Date (
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
};


res.status(statusCode).cookie('token', token, options).json({
    status : 'success',
    user,
    message,
    token,
})
}