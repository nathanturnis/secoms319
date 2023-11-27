import React, { useState, useEffect } from "react";

function App() {

  const [pageState, setPageState] = useState(0);

  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');

  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [filteredCart, setFilteredCart] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  const addToCart = (el) => {
    setCart([...cart, el]);
  }
  const removeFromCart = (el) => {

    const indexToRemove = cart.findIndex(item => item.id === el.id);

    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);
      setCart(updatedCart);

      // Update filteredCart as well
      setFilteredCart(prevFilteredCart => {
        const updatedFilteredCart = prevFilteredCart.filter(item => {
          // Check if the item exists in the updated cart
          return updatedCart.some(updatedItem => updatedItem.id === item.id);
        });
        return updatedFilteredCart;
      });
    }
  };

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
          <div className="col d-flex flex-column" key={el.id}>
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
                <button type="button" className="btn btn-primary btn-sm" data-product-id="${productID}" onClick={() => addToCart(el)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  }

  const listCartItems = filteredCart.map((el) => (
    <tr key={el.id}>
      <th scope="row" style={{ width: 30 + '%' }}>
        <div className="me-5 mt-2 mb-2" style={{ textAlign: 'center' }}>
          <img className="img-fluid" id="cart-image" src={`http://localhost:8081/${el.image}`}></img>
        </div>
      </th>
      <th>
        <div>{el.name}</div>
        <div className="fw-normal mt-1"><a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" onClick={() => { removeFromCart(el) }}>Remove</a></div>
      </th>
      <td>{howManyofThis(el.id)}</td>
      <td>${(el.price * howManyofThis(el.id)).toFixed(2)} (${el.price} x {howManyofThis(el.id)})</td>
    </tr>

  ));

  function filterCart() {

    setFilteredCart(() => {
      // Clear the previous filteredCart
      let newFilteredCart = [];

      for (let i = 0; i < Products.length; i++) {
        for (let j = 0; j < cart.length; j++) {
          if (Products[i].id === cart[j].id) {
            console.log(Products[i]);
            newFilteredCart = [...newFilteredCart, Products[i]];
            break;
          }
        }
      }

      return newFilteredCart;
    });
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
    removeCategory();
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
      document.getElementById("category-text").innerHTML = "";
      document.getElementById("selected-category").classList.remove("visible");
      document.getElementById("selected-category").classList.add("invisible");
      return;
    }
    let filtred = Products.filter(item => item.category === e.target.value);
    setFilteredProducts(filtred);
    document.getElementById("category-text").innerHTML = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    document.getElementById("selected-category").classList.remove("invisible");
    document.getElementById("selected-category").classList.add("visible");
    document.getElementById("category-select").firstChild.value = "";
  }

  const removeCategory = () => {
    setFilteredProducts(Products);
    document.getElementById("category-text").innerHTML = "";
    document.getElementById("selected-category").classList.remove("visible");
    document.getElementById("selected-category").classList.add("invisible");
    document.getElementById("category-select").firstChild.value = "";
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
                <button className="btn btn-outline-success invisible" type="submit">Search</button>
              </form>
              <div className="d-flex" id="cart-div" onClick={() => { setPageState(2); filterCart(); }}>
                <a><img src="./images/cart-icon.png" width="44px" className="ms-1 me-4" /></a>
                <div id="cart-counter">{cart.length}</div>
              </div>
            </div>
          </div>
        </nav >

        <div className="container" data-bs-theme="light">
          <div className="mt-3 d-flex">
            <div id="category-select">
              <select className="form-select border border-2 border-dark focus-ring focus-ring-dark rounded-pill"
                onChange={handleCategoryChange}>
                <option defaultValue={true} value="">Categories</option>
                <option value="clothing" >Clothing</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="bedroom">Bedroom</option>
                <option value="vanity">Vanity</option>
                <option value="health">Health</option>
                <option value="toys">Toys</option>
              </select>
            </div>
            <div className="ms-3 fs-6 border border-2 border-dark rounded-pill d-flex invisible" id="selected-category">
              <div className="ms-2 mt-1" id="category-text"></div>
              <button type="button" className="btn-close ms-2 me-1 mt-1" onClick={removeCategory}></button>
            </div>
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
              <form className="d-flex invisible" role="search" id="product-search">
                <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <div className="d-flex" id="cart-div" onClick={() => { setPageState(2); filterCart(); }}>
                <a><img src="./images/cart-icon.png" width="44px" className="ms-1 me-4" /></a>
                <div id="cart-counter">{cart.length}</div>
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

    //CART PAGE
  } else if (pageState == 2) {
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-body-tertiary " data-bs-theme="dark">
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
                  <a className="nav-link" onClick={() => { setPageState(1) }}>About</a>
                </li>
              </ul>
              <form className="d-flex invisible" role="search" id="product-search">
                <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <div className="d-flex" id="cart-div">
                <a><img src="./images/cart-icon.png" width="44px" className="ms-1 me-4" /></a>
                <div id="cart-counter">{cart.length}</div>
              </div>
            </div>
          </div>
        </nav>

        <div className="container">
          <h1 className="mt-4">Cart</h1>

          <div className="border mt-3" style={{ width: 60 + '%' }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {listCartItems}
                <tr>
                  <th scope="row"></th>
                  <th></th>
                  <th>Subtotal <br></br>Tax<br></br>Total</th>
                  <td>${(cartTotal).toFixed(2)}<br></br>${(cartTotal * .06).toFixed(2)}<br></br>${(cartTotal + cartTotal * .06).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  } else {
    return (
      <div></div>
    );
  }
}

export default App;
