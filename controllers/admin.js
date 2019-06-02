const Product = require('../models/product')
//const { validationResult } = require('express-validator/check');
const alert = require('alert-node')

exports.postAddProduct = (req,res,next)=>{
     const name = req.body.name;
     const quantity = req.body.quantity;
     const price = req.body.price;
     const product = new Product({
         name:name,
         quantity:quantity,
         price:price 
     })
     product.save()
     .then(result=>{
     res.redirect('/admin/entry-Product')
     console.log(result)
     })
     .catch(()=>{
     alert('Please Enter product information Correctly...')
     res.redirect('/admin/entry-Product')
     })
     }


exports.getNewProductForm = (req,res,next)=>{
     //const errors = validationResult(req);
     res.render('admin/entry-product',{
          path:'admin/entry-product',
          pageTitle:'Entry A new Product'
          
     })
}


exports.getEditProductForm = (req,res,next)=>{
     Product.find().then(result=>{
          const product = result.map(re=>{
                return re
           })
          res.render('admin/edit-product',{
               path:'admin/edit-product',
               pageTitle:'Edit A Product',
               rows:product
          })
          }).catch(err=>{
               console.log(err)
          })
     
}


exports.getDeleteProductForm = (req,res,next)=>{
Product.find().then(result=>{
    const product = result.map(re=>{
          return re
     })
     res.render('admin/delete-product',{
          path:'admin/delete-product',
          pageTitle:'Delete A Product',
          rows:product
     })
     //console.log(b)
}).catch(err=>{
     console.log(err)
})
}


exports.postEditProduct = (req,res,next)=>{
     const id = req.body.selectpicker;
     const quantity = req.body.quantity;
     const price = req.body.price;

Product.findByIdAndUpdate({_id:id})
.then(product=>{
     product.quantity = quantity,
     product.price = price

     return product.save().then(result=>{
          res.redirect('/admin/edit-Product')
          console.log(`
          Updated Product Info is:
          product quantity:${result.quantity}
          product price:${result.price}
          `)
     })
}).catch(()=>{
alert('Please Fill The Product Information Correctly..')
res.redirect('/admin/edit-Product')
})
}


exports.deleteProduct = (req,res,next)=>{
     const id = req.body.selectpicker;
Product.findByIdAndDelete({_id:id})
.then(product=>{
     res.redirect('/admin/delete-Product')
     console.log(product)
})
.catch(()=>{
     alert('Please Select Product Correctly..')
res.redirect('/admin/delete-Product')
})
}