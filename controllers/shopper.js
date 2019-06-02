const Product = require('../models/product')
const alert = require('alert-node')

exports.postSaleProduct = (req,res,next)=>{

     const id=req.body.selectpicker
     
     Product.findByIdAndUpdate({_id:id}).then(result =>{
          
          if(result.quantity<1){
               alert('Product Out Of Stock !!')
                return res.redirect('/')
          }else{
               
               let quantity = result.quantity - req.body.quantity
               // result.name = result.name,
               result.quantity = quantity
               //result.price = result.price
           
               return result.save().then(product=>{  
                    const total = product.price * req.body.quantity
                    res.render('shopper/invoice',{
                         path:'shopper/invoice',
                         pageTitle:'Invoice',
                         info:product,
                         quantity:req.body.quantity,
                         total:total
                    })
                    console.log(`
                    product name:${product.name}
                    product quantity:${req.body.quantity}
                    product price(per):${product.price}
                    Total Amount:${total}
                                      `)
               
          })
     }
     
    
     })
     .catch(()=>{
          alert('Please Fill Product Information Correctly..')
     })
}