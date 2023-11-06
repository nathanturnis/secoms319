import React, { useState, useEffect } from "react";
import Products from "./products.json";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Browse = () => {

    const [pageState, setPageState] = useState(0);

    const [cart, setCart] = useState([]);
    const [filteredCart, setFilteredCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [card, setCard] = useState("");
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

        //validate name
        if (name.length <= 0) {
            nameInput.setAttribute("class", "form-control is-invalid");
            isValidated = false;
        } else {
            nameInput.setAttribute("class", "form-control is-valid")
            isValidated = true;
        }

        //validate email
        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            emailInput.setAttribute("class", "form-control is-invalid");
            isValidated = false;
        } else {
            emailInput.setAttribute("class", "form-control is-valid");
            isValidated = true;
        }

        //validate card
        if (!card.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
            cardInput.setAttribute("class", "form-control is-invalid");
            isValidated = false;
        } else {
            cardInput.setAttribute("class", "form-control is-valid")
            isValidated = true;
        }

        //open modal if validated
        if (isValidated) {
            // document.getElementById("staticBackdrop").setAttribute("class", 'show');
        }


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

                    <h2 className="mt-3 mb-3">Payment Information</h2>

                    <div id="liveAlertPlaceholder"></div>

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
                            <select id="inputState" className="form-select" onSelect={(e) => { setState(e.target.value) }}>
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label for="inputZip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="inputZip" onChange={(e) => { setZipCode(e.target.value) }} />
                        </div>
                        <div className="col-12">
                            <button type="button" className="btn btn-success" onClick={(e) => { validate(e); }}>
                                <i className="bi-bag-check"></i> Order
                            </button>
                        </div>
                    </form>

                    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" style={{ display: 'block' }}>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Modal
                        show={show}
                        //  onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            I will not close if you click outside me. Don not even try to press
                            escape key.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary">
                                Close
                            </Button>
                            <Button variant="primary">Understood</Button>
                        </Modal.Footer>
                    </Modal> */}

                </div>

            </div>
        );
    }
}

export default Browse;