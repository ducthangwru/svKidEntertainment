const mongoose = require('mongoose');
const categoriesSchema = require('./categoriesSchema');
let categoriesModel = mongoose.model('categories', categoriesSchema);

const findByIdMenu = async (idmenu) => {
    try
    {
        return await categoriesModel.find({menu : idmenu}).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}


module.exports = {
    findByIdMenu
}