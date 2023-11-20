

function App() {

  fetch("http://localhost:8081/allProducts")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

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
    </div >
  );
}

export default App;
