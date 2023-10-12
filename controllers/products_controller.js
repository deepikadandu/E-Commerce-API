const Product = require('../models/product');

// function to show all the products
module.exports.products = async function(req, res){
   const product=await Product.find({});
   console.log("product",product);
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
module.exports.delete = async function(req,res){
    // console.log(req.params.id);
    
    try{
        console.log(req.params);
        //Extracting the id from the URL which are passed through params
        const id = req.params.productID;
        console.log(id);
        // Fetching the product via its id
        let product = await Product.findById(id);
        console.log(product);
        // If product is not found
        if(!product){
            
            // Throws Error
            return res.status(404).json({
                message: "Product not found!!"
            });
        }
        
        // Deleting the particular product
        let deleteProduct = await product.deleteOne();
        
        // on success shows the deleted product
        return res.status(200).json({
            data : {
                product : {
                    id : deleteProduct.id,
                    name: req.body.name,
                    quantity: req.body.quantity
                }
            },
            message : "Product deleted successfully"
        });
        
    }catch(err){
        
        // To view error
        console.log("****",err);
        
        //Throws error on failure
        return res.status(500).json({
            message : "Error in deleting product"
        });
    }
};

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