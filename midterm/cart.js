var productsInCart;
getCart();
var countText = document.getElementById("cart-counter");
countText.innerHTML = productsInCart;

var itemsInCartText = document.getElementById("items-in-cart");

if (itemsInCartText != null) {
    itemsInCartText.innerHTML = `Items in cart: ${productsInCart}`;
}

//adds a product to the cart
function addToCart() {
    productsInCart++;
    countText.innerHTML = productsInCart;
    storeCart();
}

//remove a product from the cart 
function removeFromCart() {
    if (productsInCart <= 0) return;
    productsInCart--;
    countText.innerHTML = productsInCart;
    itemsInCartText.innerHTML = `Items in cart: ${productsInCart}`;
    storeCart();
}

//stores product count to local storage
function storeCart() {
    localStorage.setItem("cartCount", productsInCart);
}

//gets the product count from local storage
function getCart() {
    productsInCart = localStorage.getItem("cartCount");
    if (productsInCart == null) {
        productsInCart = 0;
    }
}