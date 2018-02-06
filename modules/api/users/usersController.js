const express = require('express');
const Router = express.Router();
const usersModel = require('./usersModel');
const menusModel = require('../menus/menusModel');
const config = require('../../../configString.json');
const Utils = require('../../../utils/Utils');

Router.post('/', async (req, res) => {
    try
    {
        let newUser = {
            // idlogin : req.body.idlogin,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar : req.body.avatar,
            tokenfirebase : req.body.tokenfirebase,
            fullname: req.body.fullname,
            dateofbirth: req.body.dateofbirth,
            status : true,
            group :"5a6fe111734d1d63031a767a"
        };
    
        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await usersModel.createUser(newUser);
            if (result === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG});
            } else {
                res.send({ status : true, msg : config.THANH_CONG});
            }
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.put('/', async (req, res) => {
    try
    {
        let newUser = {
            idlogin : req.body.idlogin,
            id: req.body._id,
            password: req.body.password,
            email: req.body.email,
            avatar : req.body.avatar,
            tokenfirebase : req.body.tokenfirebase,
            fullname: req.body.fullname,
            dateofbirth: req.body.dateofbirth,
            status : req.body.status,
            group : req.body.group
        };

        if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            let result = await usersModel.updateUser(newUser);
            if (result === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG});
            } else {
                res.send({ status : true, msg : config.THANH_CONG});
            }
        }
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.post('/login', async (req, res) => {
    try
    {
        let user = {
            username: req.body.username,
            password: req.body.password,
            tokenfirebase : req.body.tokenfirebase
        }

        let result = await usersModel.selectUser(user);
        if (result === null) 
        {
            res.send({ status : false, msg : config.KHONG_THANH_CONG, data : null, token : ""});
        } else {
            var token = Utils.getToken(result._id);
            let menus = await menusModel.findAllMenus({});
            let update = await usersModel.updateTokenFirebaseUser(result._id, user.tokenfirebase);
            res.send({ status : true, msg : config.THANH_CONG, data : result, token : token, menus : menus});
        }
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.get('/logout', async (req, res) => {
    try
    {
       let id = req.query.id;
       if(!Utils.verifyLogin(req.query.id, req.headers['token']))
       {
           res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
       }
       else
       {
            let update = await usersModel.updateTokenFirebaseUser(id, "");
            if (update === null) {
                res.send({ status : false, msg : config.KHONG_THANH_CONG});
            } else {
                res.send({ status : true, msg : config.THANH_CONG});
            }
        }
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.post('/changepassword', async (req, res) => {
    try
    {
        let user = {
            username: req.body.username,
            password: req.body.password,
            newpassword : req.body.newpassword
        }

        if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            let result = usersModel.changePassword(user);
            if(result === 0)
                res.send({status : false, msg : config.TEN_TK_HOAC_MK_SAI});
            else if(result === -1)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else 
                res.send({ status : true, msg : config.THANH_CONG});
        }
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});


module.exports = Router;