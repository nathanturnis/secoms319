import React, { useState, useEffect } from "react";
import Products from "./products.json";

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
                        </div>
                    </div>
                    <div className="border bg-body-secondary d-flex justify-content-end">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-outline-danger">-</button>
                            <button type="button" className="btn btn-outline-success">+</button>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
}

const Browse = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);
    console.log(ProductsCategory);

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

    // const listItems = products.map((el) => (
    //     <div class="row border-top border-bottom" key={el.id}>
    //         <div class="row main align-items-center">
    //             <div class="col-2">
    //                 <img class="img-fluid" src={el.image} />
    //             </div>
    //             <div class="col">
    //                 <div class="row text-muted">{el.title}</div>
    //                 <div class="row">{el.category}</div>
    //             </div>
    //             <div class="col">
    //                 <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
    //                 <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
    //             </div>
    //             <div class="col">
    //                 ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
    //             </div>
    //         </div>
    //     </div>
    // ));

    const handleChange = (e) => {
        setQuery(e.target.value);
        const results = Products.filter(eachProduct => {
            if (e.target.value === "") return ProductsCategory;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setProductsCategory(results);

    }

    return (
        <div>
            <div>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <button type="button" className="btn btn-primary">Checkout</button>
                    </div>
                </nav>
            </div>
            <div className="container">
                <div>
                    {listItems(ProductsCategory)}
                </div>
                <div>Itesm in Cart :</div>
                <div>{cartItems}</div>
                <div>Order total to pay :{cartTotal}</div>
            </div>
        </div>
    );
}

export default Browse;