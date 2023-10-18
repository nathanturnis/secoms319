
var productsInCart;
var cartArray = [];
getCart();
var countText = document.getElementById("cart-counter");
countText.innerHTML = productsInCart;

var itemsInCartText = document.getElementById("items-in-cart");

if (itemsInCartText != null) {
    itemsInCartText.innerHTML = `Items in cart: ${productsInCart}`;
}

if (productsInCart > 0 && location.pathname == "/midterm/cart.html") {
    cartArray = localStorage.getItem("cartArray");
    loadItemsInCart();
}

//adds a product to the cart
function addToCart(product) {
    cartArray.push(product.getAttribute("data-product-id"));
    console.log(cartArray);
    productsInCart++;
    countText.innerHTML = productsInCart;
    storeCart();
}

//remove a product from the cart 
function removeFromCart(item) {
    if (productsInCart <= 0) return;
    productsInCart--;
    countText.innerHTML = productsInCart;
    itemsInCartText.innerHTML = `Items in cart: ${productsInCart}`;
    // cartArray.pop();
    console.log(item.getAttribute("data-array-index"));
    cartArray.splice(parseInt(item.getAttribute("data-array-index")), 1);
    storeCart();
}

//stores product count to local storage
function storeCart() {
    localStorage.setItem("cartCount", productsInCart);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
}

//gets the product count from local storage
function getCart() {
    productsInCart = localStorage.getItem("cartCount");
    cartArray = localStorage.getItem("cartArray");
    console.log(cartArray);
    cartArray = JSON.parse(cartArray);
    console.log(cartArray);
    if (productsInCart == null) {
        productsInCart = 0;
    }
}

function loadItemsInCart() {

    var html = ``;

    fetch('./data.json')
        .then((response) => response.json())
        .then((productsList) => {
            cartArray = localStorage.getItem("cartArray");
            cartArray = JSON.parse(cartArray);
            if (cartArray == null) return;
            for (var i = 0; i < cartArray.length; i++) {
                for (let product of productsList.products) {
                    if (product.id == cartArray[i]) {
                        html += `<div class="d-flex p-3">
            <div class="me-3 text-center" style="height: 120px; width: 120px">
                <img
                    src="./${product.image}"
                    class="img-fluid" style="max-height: 100%;"/>
            </div
            <div>
              <div>
                <div
                  class="overflow-hidden"
                  style="
                    font-size: larger;
                    font-weight: bold;
                    height: 60px;
                    width: 300px;
                  ">
                  ${product.name}
                </div>
                <div style="color: tomato; font-size: medium">$8.99</div>
                <div>
                  <a
                    class="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href=""
                    data-array-index="${i}"
                    onclick="removeFromCart(this)"
                    >Remove</a
                  >
                </div>
                </div>
              </div>
            </div>`
                    }
                }
            }
            document.getElementById("cart-products").innerHTML = html;
        }
        )
        .catch(function (err) {
            console.log("Error: " + err)
        });
}