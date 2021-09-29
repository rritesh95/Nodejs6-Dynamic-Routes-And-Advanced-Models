const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, price){
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products : [],
                totalPrice : 0
            };

            if(!err){
                cart = JSON.parse(fileContent);
            }

            let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {
                    id : id,
                    qty : 1
                }
                cart.products.push(updatedProduct);
            }
            cart.totalPrice = cart.totalPrice + +price;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteProduct(prodId, prodPrice){
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return;
            }

            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === prodId);

            if(!product){
                return;
            }

            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== prodId);
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * prodPrice; 
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        });
    }

    static getCart(callbackfn){
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                callbackfn(null);
            }
            else{ 
                callbackfn(cart);
            }
        });
    }
}