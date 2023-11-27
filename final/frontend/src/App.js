import React, { useState, useEffect } from "react";

function App() {

  const [pageState, setPageState] = useState(0);

  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');

  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [filteredCart, setFilteredCart] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

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
        <div className="fw-normal mt-1"><a className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" id="cart-remove"
          onClick={() => { removeFromCart(el) }}>Remove</a></div>
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

  const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  const cardInputDashes = (e) => {
    e.value = e.value.replace(/-/g, '');
    let newVal = '';
    for (var i = 0, nums = 0; i < e.value.length; i++) {
      if (nums != 0 && nums % 4 == 0) {
        newVal += '-';
      }
      newVal += e.value[i]
      if (isNumeric(e.value[i])) {
        nums++;
      }
    }
    e.value = newVal;
  }

  const validate = (e) => {
    let isValidated = true;
    let nameInput = document.getElementById("inputName");
    let emailInput = document.getElementById("inputEmail4");
    let cardInput = document.getElementById("inputCard");

    if (cart.length <= 0) {
      document.getElementById("cartAlert").innerHTML = `<div class="alert alert-danger" role="alert" id="alertCart">No items in the cart!</div>`;
      return;
    }

    //validate name
    if (name.length <= 0) {
      nameInput.setAttribute("class", "form-control is-invalid");
      isValidated = false;
    } else {
      nameInput.setAttribute("class", "form-control is-valid")
    }

    //validate email
    if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      emailInput.setAttribute("class", "form-control is-invalid");
      isValidated = false;
    } else {
      emailInput.setAttribute("class", "form-control is-valid");
    }

    //validate card
    if (!card.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
      cardInput.setAttribute("class", "form-control is-invalid");
      isValidated = false;
    } else {
      cardInput.setAttribute("class", "form-control is-valid")
    }

    //open modal if validated
    if (isValidated) {
      //   setPageState(2);
    }
  }

  const displayInformation = () => {
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Name: {name}</li>
        <li className="list-group-item">Email: {email}</li>
        <li className="list-group-item">Card: XXXX-XXXX-XXXX-{card.slice(-4)}</li>
        <li className="list-group-item">Address: {address}, {city}, {state} {zipCode}</li>
      </ul>);
  }

  //PRODUCTS PAGE
  if (pageState == 0) {
    let alert = document.getElementById("alertCart");
    if (alert != null) {
      alert.remove();
    }
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
    let alert = document.getElementById("alertCart");
    if (alert != null) {
      alert.remove();
    }
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

        <div className="container">
          <div className="mt-3 border-bottom border-black">
            <h1>About The Developers</h1>
          </div>
          <div className="mt-3">
            <h4>SE/ComS319 Construction of User Interfaces, Fall 2023</h4>
            <h5>Date: 11/28/23</h5>
          </div>
          <div className="mt-5">
            <h3>Authors:</h3>
            <p className="text-cool">Nathan Turnis - nturnis@iastate.edu</p>
            <p className="text-cool">Ella Knott - edknott@iastate.edu</p>
          </div>
          <div className="thank-you p-5 rounded-3">
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

          <div id="cartAlert">
          </div>

          <div className="row g-5 ms-0">
            <div className="card" style={{ width: 60 + '%' }}>
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

            <div class="col-12 col-lg-4">
              <div class="card p-3 mb-5">
                <h2 id="items-in-cart">Items in cart: {cart.length}</h2>
                <div class="d-flex justify-content-between">
                  <p>Total</p>
                  <p id="total-price">${(cartTotal + cartTotal * .06).toFixed(2)}</p>
                </div>
                <div class="d-flex justify-content-start">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1" />
                    <label class="form-check-label" for="inlineRadio1">Debit/Credit Card</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2" />
                    <label class="form-check-label" for="inlineRadio2">PayPal</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="option3" />
                    <label class="form-check-label" for="inlineRadio3">Gift Card</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-3 mb-3">Payment Information</h2>

          <form className="row g-3 mb-5" id="checkout-form">
            <div className="col-md-6">
              <label for="inputName" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="inputName" onChange={(e) => { setName(e.target.value) }} />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Must be like, "John Doe"</div>
            </div>

            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4" onChange={(e) => { setEmail(e.target.value) }} />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Must be like, "abc@xyz.efg"</div>
            </div>

            <div className="col-12">
              <label for="inputCard" className="form-label">Card</label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"
                ><i className="bi-credit-card-fill"></i></span>
                <input
                  type="text"
                  id="inputCard"
                  className="form-control"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  maxLength={19}
                  onChange={(e) => { setCard(e.target.value); cardInputDashes(e.target); }} />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Must be like, "7777-7777-7777-7777"
                </div>
              </div>
            </div>

            <div className="col-12">
              <label for="inputAddress" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St" onChange={(e) => { setAddress(e.target.value) }} />
            </div>
            <div className="col-12">
              <label for="inputAddress2" className="form-label">Address 2</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor" />
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">City</label>
              <input type="text" className="form-control" id="inputCity" onChange={(e) => { setCity(e.target.value) }} />
            </div>
            <div className="col-md-4">
              <label for="inputState" className="form-label">State</label>
              <select id="inputState" className="form-select" onChange={(e) => { setState(e.target.value) }}>
                <option selected>Choose...</option>
                <option>Iowa</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-md-2">
              <label for="inputZip" className="form-label">Zip</label>
              <input type="text" className="form-control" id="inputZip" onChange={(e) => { setZipCode(e.target.value) }} />
            </div>
            <div className="col-12">
              <button type="button" className="btn btn-success" onClick={(e) => { validate(e); }}>
                <i className="bi-bag-check"></i> Place Order
              </button>
            </div>
          </form>

        </div>

      </div>
    )
  } else {
    return (
      <div><h1>Page not found.</h1></div>
    );
  }
}

export default App;
