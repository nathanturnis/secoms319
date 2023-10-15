var productsInCart = 0;
var countText = document.getElementById("cart-counter");
countText.innerHTML = productsInCart;

//adds a product to the cart
function addToCart() {
    productsInCart++;
    countText.innerHTML = productsInCart;
}

//remove a product from the cart 
function removeFromCart() {
    productsInCart--;
    countText.innerHTML = productsInCart;
}