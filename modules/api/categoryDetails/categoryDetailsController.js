const express = require('express');
const Router = express.Router();
const categoryDetailsModel = require('../categoryDetails/categoryDetailsModel');
const config = require('../../../configString.json');
const Utils = require('../../../utils/Utils');

Router.get('/', async (req, res) => {
    try
    {
       let idlogin = req.query.idlogin;
    //    if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
    //    {
    //        res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
    //    }
    //    else
    //    {
            let result = await categoryDetailsModel.findByIdCategory(req.query.idcategory);
            if (result === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG, data : null});
            } else {
                res.send({ status : true, msg : config.THANH_CONG, data : result});
            }
       // }
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});


//Thêm mới categoryDetails
Router.post('/', async (req, res) => {
    try
    {
       let idlogin = req.body.idlogin;
    //    if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
    //    {
    //        res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
    //    }
    //    else
    //    {
            let categoryDetail = {
                category : req.body.category,
                namevideo : req.body.namevideo,
                description : req.body.description,
                link : req.body.link
            }

            let result = await categoryDetailsModel.createCategoryDetail(categoryDetail);

            if (result === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG});
            } else {
                res.send({ status : true, msg : config.THANH_CONG});
            }
       // }
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});


//Chỉnh sửa categoryDetails
Router.put('/', async (req, res) => {
    try
    {
       let idlogin = req.body.idlogin;
    //    if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
    //    {
    //        res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
    //    }
    //    else
    //    {
            let categoryDetail = {
                _id : req.body.id,
                namevideo : req.body.namevideo,
                category : req.body.category,
                description : req.body.description,
                link : req.body.link
            }

            let result = await categoryDetailsModel.updateCategoryDetail(categoryDetail);

            if (result === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG});
            } else {
                res.send({ status : true, msg : config.THANH_CONG});
            }
       // }
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

//Xóa categoryDetails
Router.delete('/', async (req, res) => {
    try
    {
       let idlogin = req.query.idlogin;
    //    if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
    //    {
    //        res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
    //    }
    //    else
    //    {

            let result = await categoryDetailsModel.removeCategoryDetail(req.query.id);

            if (result === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG});
            } else {
                res.send({ status : true, msg : config.THANH_CONG});
            }
       // }
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});



module.exports = Router;