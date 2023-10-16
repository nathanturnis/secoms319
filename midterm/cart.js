var productsInCart;
getCart();
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

function storeCart() {
    localStorage.setItem("cartCount", productsInCart);
}

function getCart() {
    productsInCart = localStorage.getItem("cartCount");
    if (productsInCart == null) {
        productsInCart = 0;
    }
}