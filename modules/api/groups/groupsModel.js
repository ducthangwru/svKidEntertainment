const mongoose = require('mongoose');
const groupsSchema = require('./groupsSchema');
let groupsModel = mongoose.model('groups', groupsSchema);

const findByIdGroup = async (idgroup) => {
    try
    {
        return await groupsModel.findById(id).exec();
    }
    catch(err)
    {
        return null;
    }
}


module.exports = {
    findByIdGroup
}