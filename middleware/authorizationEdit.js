const {Food} = require('../models')

async function authorizationEdit(req, res, next){
    try {
       
        // cek apakah role orang yg login itu admin atau bukan
        if (req.user.role === "Admin" ) {
            next()
        } else {
            if (food.authorId === req.user.id) {
                next()
            } else {
                throw {name : 'forbidden'}
            }
        }
        
    } catch (err) {
        // console.log(err);
       next(err)
    }
}

module.exports = authorizationEdit