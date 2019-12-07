const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');
const expressValidator=require('express-validator');
const mongoose=require('mongoose');
//mongooseconnect
mongoose.connect('mongodb://localhost/sportsblog');
const db=mongoose.connection;
const port=3400;
//init app
const app=express();
const index=require('./routes/index');
const articles=require('./routes/articles');
const categories=require('./routes/categories');
const manage=require('./routes/manage');
//view setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//set static folder
app.use(express.static(path.join(__dirname,'public')));
//Express Messages midddleware
app.use(require('connect-flash')());
app.use((req,res,next)=> {
  res.locals.messages=require('express-messages')(req,res);
  next();
})
//Express Validator midddleware
const { check } = require('express-validator');

app.post('/user', [
  check('email').custom(value => {
    return User.findByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  check('password').custom((value, { req }) => {
    if (value !== req.body.passwordConfirmation) {
      throw new Error('Password confirmation is incorrect');
    }
  })
], (req, res) => {
  // Handle the request somehow
});
app.use('/',index);
app.use('/articles',articles);
app.use('/categories',categories);
app.use('/manage',manage);
app.listen(port,()=>{
  console.log('server started on port'+port);
});
