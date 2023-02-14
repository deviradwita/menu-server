const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')


async function authentication (req, res, next) {
    try {
        const access_token = req.headers.access_token
        // console.log(access_token);
        if(!access_token) {
            throw {name : "InvalidToken"}
        }

        const payload = verifyToken(access_token)
        // console.log(payload.id);
        const user = await User.findByPk(payload.id)
        console.log(user);
        if(!user){
            throw {name : "InvalidToken"}
        }
        req.user = {
            id : user.id,
            email : user.email,
            role : user.role
        }

        next()
        
    } catch (err) {
        // console.log(err);
        if (err.name === "InvalidToken" || err.name === "JsonWebTokenError") {
            res.status(401).json({
                message : 'Invalid Token'
            })
        } else {
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

module.exports= authentication 