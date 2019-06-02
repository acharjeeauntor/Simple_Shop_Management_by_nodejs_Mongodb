const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/login')
const session = require('express-session');
const shopperRoutes = require('./routes/shopper')
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')

app.set('view engine','ejs')
app.set('views','views')

const MONGODB_URL = 'mongodb+srv://maxi_shop_project:auntor@cluster0-u60el.mongodb.net/simpleShop'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')))
app.use(
     session({
       secret: 'my secret',
       resave: false,
       saveUninitialized: false
     })
   );


app.use(loginRoutes)
app.use('/shopper',shopperRoutes)
app.use('/admin',adminRoutes)
app.use('/auth',authRoutes)


mongoose.connect(MONGODB_URL)
.then(result=>{
app.listen(3000)
})
.catch(err=>console.log(err))
