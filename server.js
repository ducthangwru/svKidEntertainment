const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configPort = process.env.PORT || 3000;
const config = require('./config.json');
const userApi = require('./modules/api/users/usersController');
const categoryApi = require('./modules/api/categories/categoriesController');

var app = express();

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/api/user', userApi);
app.use('/api/category', categoryApi);

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
})

app.listen(configPort , () => {
  console.log(`App listen on ${configPort}`);
})