const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const categoriesSchema = new Schema(
    {
       menu : {type : ObjectId, require : true},
       name : {type : String, require : true},
       image : {type : String, require : true},
       description : {type : String}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);


module.exports = categoriesSchema;