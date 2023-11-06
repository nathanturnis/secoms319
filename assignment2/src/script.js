import React, { useState, useEffect } from "react";
import Products from "./products.json";

const Browse = () => {

    const [pageState, setPageState] = useState(0);

    const [cart, setCart] = useState([]);
    const [filteredCart, setFilteredCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

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

    const addToCart = (el) => {
        setCart([...cart, el]);
    }

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    };

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <img className="img-fluid" src={el.image} width={150} />
            {el.title}
            ${el.price}
        </div>
    ));

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const listItems = (ProductsCategory) => {
        return <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1">
            {
                ProductsCategory.map((el) => (
                    <div className="col" key={el.id}>
                        <div className="card">
                            <img className="card-img-top p-4" src={el.image}></img>
                            <div className="card-body">
                                <h5 className="card-title">{el.title}</h5>
                                <p className="card-text">${el.price}</p>
                                <p className="card-text">{el.description}</p>
                                <div className="d-flex justify-content-between align-items-center bg-body-tertiary p-3">
                                    <p>1</p>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => removeFromCart(el)}>-</button>
                                        <button type="button" className="btn btn-outline-success" onClick={() => addToCart(el)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    }

    const listCartItems = filteredCart.map((el) => (
        <tr>
            <th scope="row" style={{ width: 30 + '%' }}><img src={el.image} width={150}></img></th>
            <th>{el.title}</th>
            <td>{howManyofThis(el.id)}</td>
            <td>${el.price * howManyofThis(el.id)} (${el.price} x {howManyofThis(el.id)})</td>
        </tr>

    ));

    const handleChange = (e) => {
        setQuery(e.target.value);
        const results = Products.filter(eachProduct => {
            if (e.target.value === "") return ProductsCategory;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setProductsCategory(results);

    }

    const filterCart = () => {

        setFilteredCart((prevFilteredCart) => {
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



    if (pageState == 0) {
        return (
            <div>
                <div>
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange} />
                                <button className="btn btn-outline-success" type="button">Search</button>
                            </form>
                            <button type="button" className="btn btn-primary" onClick={() => { setPageState(1); filterCart(); }}>Checkout ({cart.length})</button>
                        </div>
                    </nav>
                </div>
                <div className="container mt-4 mb-4">
                    <div>
                        {listItems(ProductsCategory)}
                    </div>
                </div>
            </div>
        );
    } else if (pageState == 1) {
        return (
            <div>
                <div>
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <button type="button" className="btn btn-primary" onClick={() => setPageState(0)}>Return</button>
                        </div>
                    </nav>
                </div>

                <div className="container">
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
                                    <td>${cartTotal}<br></br>${(cartTotal * .06).toFixed(2)}<br></br>${(cartTotal + cartTotal * .06).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="liveAlertPlaceholder"></div>

                    <form className="row g-3" id="checkout-form">
                        <div className="col-md-6">
                            <label for="inputName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="inputName" />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">Must be like, "John Doe"</div>
                        </div>

                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" />
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
                                    aria-describedby="basic-addon1" />
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
                                placeholder="1234 Main St" />
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
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="col-md-4">
                            <label for="inputState" className="form-label">State</label>
                            <select id="inputState" className="form-select">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label for="inputZip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="inputZip" />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">
                                <i className="bi-bag-check"></i> Order
                            </button>
                        </div>
                    </form>

                    <div className="card collapse" style={{ width: 18 + '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Order summary</h5>
                            <p className="card-text">Here is a summary of your order.</p>
                        </div>
                        <ul className="list-group list-group-flush"></ul>
                        <a href="" onClick="location.reload()" className="btn btn-secondary">
                            <i className="bi-arrow-left-circle"></i> Return</a>

                    </div>

                </div>
            </div>
        );
    }
}

export default Browse;