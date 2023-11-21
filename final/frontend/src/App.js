import React, { useState, useEffect } from "react";

function App() {

  const [Products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = () => {
    fetch("http://localhost:8081/allProducts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };

  const listProducts = Products.map((el) => (

    <div className="col d-flex flex-column">
      <div className="card">
        <div
          className="mb-1 p-3 d-flex justify-content-center align-items-center" id="product-card">
          <img
            src={`http://localhost:8081/${el.image}`}
            className="img-fluid"
            id="product-image" />
        </div>
        <div className="overflow-hidden px-3 mt-2" id="product-name">
          {el.name}
        </div>
        <div className="mb-3 px-3 d-flex">
          <img
            src={`http://localhost:8081/images/ratings/rating-${el.rating.stars * 10}.png`}
            className="img-fluid"
            id="product-rating-image" />
          <div className="ms-1">{el.rating.count}</div>
        </div>
        <div className="mb-2 px-3 fw-bold">${el.price}</div>
        <div className="mt-2 mb-2 ms-4 me-4 px-3 d-grid">
          <button type="button" className="btn btn-primary btn-sm" data-product-id="${productID}" onclick="addToCart(this)">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div data-bs-theme="dark">
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Sahara</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active">Browse</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Listings</a>
              </li>
              <li className="navbar-item">
                <a className="nav-link">About</a>
              </li>
            </ul>
            <form className="d-flex" role="search" id="product-search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className="d-flex">
              <a><img src="./images/cart-icon.png" width="44px" className="ms-1 me-4" /></a>
              <div id="cart-counter">0</div>
            </div>
          </div>
        </div>
      </nav >

      <div className="container" data-bs-theme="light">
        <div
          className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 g-2 d-flex mt-5 mb-5"
          id="products-grid">{listProducts}</div>
      </div>
    </div >
  );
}

export default App;
