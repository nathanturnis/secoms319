import React, { useState, useEffect } from "react";

function App() {

  const [pageState, setPageState] = useState(0);

  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = () => {
    fetch("http://localhost:8081/allProducts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
      });
  };

  const listProducts = (FilteredProducts) => {
    return <div
      className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 g-2 d-flex mt-3 mb-5"
      id="products-grid"> {

        FilteredProducts.map((el) => (
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
        ))
      }
    </div>
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = Products.filter(eachProduct => {
      if (e.target.value === "") return Products;
      return eachProduct.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFilteredProducts(results);
  }

  const handleCategoryChange = (e) => {
    // console.log(e.target.value);
    if (e.target.value === "") {
      setFilteredProducts(Products);
      return;
    }
    let filtred = Products.filter(item => item.category === e.target.value);
    setFilteredProducts(filtred);
  }

  //PRODUCTS PAGE
  if (pageState == 0) {
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
                <li className="nav-item">
                  <a className="nav-link" onClick={() => { setPageState(1) }}>About</a>
                </li>
              </ul>
              <form className="d-flex" role="search" id="product-search">
                <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange} />
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
          <div className="mt-3">
            <select className="form-select" id="category-select" onChange={handleCategoryChange}>
              <option selected value="">Categories</option>
              <option value="clothing" >Clothing</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="bedroom">Bedroom</option>
              <option value="vanity">Vanity</option>
            </select>
          </div>

          {listProducts(FilteredProducts)}
        </div>
      </div >
    );

    //ABOUT PAGE
  } else if (pageState == 1) {
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
                  <a className="nav-link" onClick={() => { setPageState(0) }}>Browse</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Listings</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" onClick={() => { setPageState(1) }}>About</a>
                </li>
              </ul>
              <form className="d-flex" role="search" id="product-search">
                <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <div className="d-flex">
                <a><img src="./images/cart-icon.png" width="44px" className="ms-1 me-4" /></a>
                <div id="cart-counter">0</div>
              </div>
            </div>
          </div>
        </nav >

        <div class="container">
          <div class="mt-3 border-bottom border-black">
            <h1>About The Developers</h1>
          </div>
          <div class="mt-3">
            <h4>SE/ComS319 Construction of User Interfaces, Fall 2023</h4>
            <h5>Date: 11/28/23</h5>
          </div>
          <div class="mt-5">
            <h3>Authors:</h3>
            <p class="text-cool">Nathan Turnis - nturnis@iastate.edu</p>
            <p class="text-cool">Ella Knott - edknott@iastate.edu</p>
          </div>
          <div class="thank-you p-5 rounded-3">
            <h1>Thanks for checking out our site!</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
