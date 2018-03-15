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

const createCategoryDetail = async(categoryDetail) => {
    try
    {
        return await categoryDetailsModel.create(categoryDetail);
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}


const updateCategoryDetail = async (categoryDetail) => {
    try
    {
        try
        {
            var id = categoryDetail._id;
            var queryUpdate = {
                category : categoryDetail.category,
                link : categoryDetail.link,
                description : categoryDetail.description
            }
        
            return await categoryDetailsModel.findOneAndUpdate(id, queryUpdate).exec();
        }
        catch(err)
        {
            return null;
        }
    }
    catch(err)
    {
        return null;
    }
}

const removeCategoryDetail = async (id) => {
    try
    {
        return await categoryDetailsModel.remove({_id : id}).exec();
    }
    catch(err)
    {
        return null;
    }
}


module.exports = {
    findByIdCategory, createCategoryDetail, updateCategoryDetail, removeCategoryDetail
}