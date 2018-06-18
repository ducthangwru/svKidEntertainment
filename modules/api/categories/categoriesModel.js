const mongoose = require('mongoose');
const categoriesSchema = require('./categoriesSchema');
let categoriesModel = mongoose.model('categories', categoriesSchema);
const categoryDetailsModel = require('../categoryDetails/categoryDetailsModel');

const findByIdMenu = async (idmenu, iduser) => {
    try
    {
        return await categoriesModel.find({menu : idmenu, user : iduser}).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const selectByIdMenu = (idmenu, iduser, callback) => {
    categoriesModel.find({menu : idmenu, user : iduser}).exec(function(err, categories) {
        callback(err, categories);
    });
}

const createCategory = async (category) => {
    try
    {
        return await categoriesModel.create(category);
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const updateCategory = async (category) => {
    try
    {
        try
        {
            var id = category._id;
            var queryUpdate = {
                name : category.name,
                image : category.image,
                description : category.description
            }
        
            return await categoriesModel.findOneAndUpdate(id, queryUpdate).exec();
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

const removeCategory = async (id) => {
    try
    {
        let categoryDetails = await categoryDetailsModel.findByIdCategory(id);
        console.log(categoryDetails);
        if(categoryDetails === [])
            return await categoriesModel.remove({_id : id}).exec();
        else 
            return 0;
    }
    catch(err)
    {
        return null;
    }
}


module.exports = {
    findByIdMenu, createCategory, updateCategory, removeCategory, selectByIdMenu
}