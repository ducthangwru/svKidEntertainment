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

module.exports = Router;