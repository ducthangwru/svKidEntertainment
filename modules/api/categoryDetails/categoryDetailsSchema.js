const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const categoryDetailsSchema = new Schema(
    {
       category : {type : ObjectId, require : true},
       namevideo : {type : String, require : true},
       description : {type : String, require : true},
       link : {type : String, require : true}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);


module.exports = categoryDetailsSchema;