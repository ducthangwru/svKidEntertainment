const express = require('express');
const Router = express.Router();
const categoriesModel = require('../categories/categoriesModel');
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
            let result = await categoriesModel.findByIdMenu(req.query.idmenu, req.query.idlogin);
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

//Thêm mới category
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
            let category = {
                menu : "5a71332c734d1d71dd52a78d",
                user : req.body.idlogin,
                description : req.body.description,
                image : req.body.image,
                name : req.body.name
            }

            let result = await categoriesModel.createCategory(category);

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
            let category = {
                _id : req.body.id,
                menu : "5a71332c734d1d71dd52a78d",
                description : req.body.description,
                image : req.body.image,
                name : req.body.name
            }

            let result = await categoriesModel.updateCategory(category);

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

            let result = await categoriesModel.removeCategory(req.query.id);

            if (result === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG});
            }
            else if(result === 0) {
                res.send({ status : false, msg : config.KHONG_THE_XOA});
            } 
            else {
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