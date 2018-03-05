const mongoose = require('mongoose');
const categoryDetailsSchema = require('./categoryDetailsSchema');
let categoryDetailsModel = mongoose.model('categoryDetails', categoryDetailsSchema, 'categoryDetails');

const findByIdCategory = async (idCategory) => {
    try
    {
        return await categoryDetailsModel.find({category : idCategory}).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}


module.exports = {
    findByIdCategory
}