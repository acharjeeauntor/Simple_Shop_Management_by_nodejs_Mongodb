const Admin = require('../models/admin')
const Shopper = require('../models/shopper')
const bcrypt = require('bcrypt')
const alert = require('alert-node')



exports.postCreateAccountInfo =(req,res,next)=>{
     const empType = req.body.empType
     const name = req.body.name
     const password = req.body.password


     
if(!empType || !name ||!password){
alert('please fill All the field')
}
else if(empType === 'Admin'){
bcrypt.hash(password,12)
.then(hassedPassword=>{
     const admin = new Admin({
          name:name,
          password:hassedPassword
     })
     admin.save()
     .then(user=>{
          console.log(user)
          res.redirect('/')
     })
}).catch(err=>console.log(err))
    
    }else if(empType === 'Shopper'){
         bcrypt.hash(password,12)
         .then(hassedPassword=>{
          const shopper = new Shopper({
               name:name,
               password:hassedPassword
          })
          shopper.save()
          .then(user=>{
               console.log(user)
               res.redirect('/')
          })
         }).catch(err=>console.log(err))
    }

     
}