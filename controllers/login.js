const Product = require('../models/product')
const Admin = require('../models/admin')
const Shopper = require('../models/shopper')
const bcrypt = require('bcrypt')
const alert = require('alert-node')


exports.getLoginPage = (req,res,next)=>{
     res.render('index',{
          path: '/',
          pageTitle: 'Login'
})
}

exports.getShopperLogin = (req,res,next)=>{
    
     res.render('shopper/shopper-login',{
          path:'shopper/shopper-login',
          pageTitle:'Login as a Shopper'
          
     })
}

exports.getAdminLogin = (req,res,next)=>{
     res.render('admin/admin-login',{
          path:'admin/admin-login',
          pageTitle:'Login as a Admin'
     })
}

exports.postShopperLogin =(req,res)=>{
     const username = req.body.username;
     const password = req.body.password;

     Shopper.findOne({name:username})
     .then(user=>{
               bcrypt.compare(password,user.password).then(doMatch=>{
                    if(doMatch){
                         Product.find().then(result=>{
                              const product = result.map(re=>{
                                   return re
                              })
                         res.render('shopper/sale',{
                              path:'shopper/sale',
                              pageTitle:'Sale a Product',
                              rows:product
                          })
                         })
                    }else{
                         alert('Please Enter Correct Username or Password!!!')
                    res.redirect('/')
                    }  
               })
     }).catch(()=>{
          alert('Can not found Any Shopper for the given username!!')  
          res.redirect('/') 
     })
}

exports.postAdminLogin =(req,res,next)=>{
     const username = req.body.username;
     const password = req.body.password;

     Admin.findOne({name:username})
     .then(user=>{
          bcrypt.compare(password,user.password).then(doMatch=>{
               if(doMatch){
                    req.session.isLoggedIn = true
                    res.render('admin/adminwork',{
                         path:'admin/adminwork',
                         pageTitle:'Admin Work List',
                     })
               } else{
                    alert('Please Enter Correct Username or Password!!!')
                    res.redirect('/')
               }
          })
     }).catch(()=>{
          alert('Can not found Any Admin for the given username!!')  
          res.redirect('/') 
     })
   
}



exports.getAuthLogin = (req,res,next)=>{
     res.render('auth/auth-login',{
          path:'auth/auth-login',
          pageTitle:'Login as a Author'
     })
}

exports.postAuthLogin =(req,res)=>{
     const username = req.body.username;
     const password = req.body.password;

     if(username === 'auntor'&& password === '10047'){
          res.render('auth/authCreateAccount',{
               path:'auth/authCreateAccount',
               pageTitle:'Create Employes Account',
               rows:['Admin','Shopper']
           })
     }else{
         alert('Please Enter Correct Username or Password!!!')
         res.redirect('/')
     }
   
}



