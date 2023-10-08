const Product = require('../models/product');

// function to show all the products
module.exports.products = async function(req, res){
   const product=await Product.find({});
   if(!product){
     console.log("error in finding product");
   } else{
     return res.status(200).json({
        success:true,
        message:"product fetched successfully",
        product
     });
   }
}

// function to create a new product
module.exports.create = async function(req, res){
    try {
        // const { content } = req.body;
        console.log("content",req.body);
        let post = await Product.create({
            name:req.body.name,
            quantity:req.body.quantity,
            // user: req.user._id,
        });
        // res.send("Product created");
        return res.status(200).json({ data:post,message:"Product created"});
        
        // return res.redirect('back');
    } catch (error) {
        // req.flash('error', error);
        console.log("error",error);
        return res.redirect('back');
    }  
}

// function to delete a product using it's ID
module.exports.delete = function(req, res){
    Product.deleteOne(
        {_id: req.params.productID},
        function(err){
            if(err){
                res.send(err);
            }else{
                res.send({
                    message: "Product deleted"
                });
            }
        });
}

// function to update a product's quantity
module.exports.updateQunatity = function(req, res){
    const ID = req.params.productID;
    // find the product using id
    Product.findById(ID, function(err, found){
        if(err){
            res.send(err);
        }else{

            // Note - To increment the quantity of the product put number as a positive value in the query 
            //        and to decrement the quantity put the number as negative value in the query

            const newQty = parseInt(found.quantity) + parseInt(req.query.number);
            // update the product's quantity
            Product.findByIdAndUpdate(ID, {quantity: newQty}, function(err, updatedProduct){
                if(err){
                    res.send(err);
                }else{
                    updatedProduct.quantity = newQty;
                    res.send({
                        product: updatedProduct,
                        message: 'updated successfully'
                    });
                }
            });
        }
    });
}