import React, { useState, useEffect } from "react";
import Products from "./products.json";

const Browse = () => {

    const [pageState, setPageState] = useState(0);

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);

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

    const listCartItems = cart.map((el) => (
        <tr>
            <th scope="row" style={{ width: 30 + '%' }}><img src={el.image} width={150}></img></th>
            <th>{el.title}</th>
            <td>hi</td>
            <td>${el.price}</td>
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
                            <button type="button" className="btn btn-primary" onClick={() => setPageState(1)}>Checkout ({cart.length})</button>
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
                            </tbody>
                        </table>
                    </div>

                    <div>Itesm in Cart :</div>
                    <div>{cartItems}</div>
                    <div>Order total to pay :{cartTotal}</div>
                </div>
            </div>
        );
    }
}

export default Browse;