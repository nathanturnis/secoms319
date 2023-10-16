let productsGrid = document.getElementById("products-grid");

fetch('./data.json')
  .then((response) => response.json())
  .then((products) => loadProducts(products))
  .catch(function (err) {
    console.log("Error: " + err)
  });

//load products grid with all the data in the data.json file
function loadProducts(data) {
  console.log(data);
  let innerHTML = ``;
  for (let i = 0; i < data.products.length; i++) {

    let productName = data.products[i].name;
    let productImage = data.products[i].image;
    let starsImage = `images/ratings/rating-${data.products[i].rating.stars * 10}.png`;
    let productReviewCount = data.products[i].rating.count;
    let productPrice = data.products[i].priceInCents / 100; //divide by 100 to convert to proper decimal
    productPrice = productPrice.toFixed(2); //only show to 2 decimal places

    //add to product list with the following HTML
    innerHTML += `<div class="col d-flex flex-column">
          <div class="card">
            <div
              class="mb-1 p-3 d-flex justify-content-center align-items-center"
              style="height: 200px">
              <img
                src="./${productImage}"
                class="img-fluid"
                style="max-height: 100%" />
            </div>
            <div class="overflow-hidden px-3 mt-2" style="height: 50px">
              ${productName}
            </div>
            <div class="mb-3 px-3 d-flex">
              <img
                src="./${starsImage}"
                class="img-fluid"
                style="width: 100px; height: fit-content; margin-top: 2px" />
              <div class="ms-1">${productReviewCount}</div>
            </div>
            <div class="mb-2 px-3 fw-bold">$${productPrice}</div>
            <div class="mt-2 mb-2 ms-4 me-4 px-3 d-grid">
              <button type="button" class="btn btn-primary btn-sm" onclick="addToCart()">
                Add To Cart
              </button>
            </div>
          </div>
        </div>`;
  }
  productsGrid.innerHTML = innerHTML;
}

function search() {
  console.log(document.getElementById("search-input").value);
}