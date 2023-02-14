const bcrypt = require('bcrypt')

const hash = (password) =>{
    return bcrypt.hashSync(password, 8);
}

const compare = (password, hashPassword)=>{
   return bcrypt.compareSync(password, hashPassword)
}

module.exports= {hash, compare}