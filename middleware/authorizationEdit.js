const {Food} = require('../models')

async function authorizationEdit(req, res, next){
    try {
        const food= await Food.findByPk(req.params.id)
       
        if (!food){
            throw {name : 'NotFound'}
        }
      
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