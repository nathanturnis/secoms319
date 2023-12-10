import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [pageState, setPageState] = useState([0]);
  const [products, setProducts] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  function clearSetOneProduct() {
    setOneProduct([]);
  }

  const getAllProducts = () => {
    fetch("http://localhost:8081/getAllRobots")
      .then((response) => response.json())
      .then((data => {
        console.log(data);
        setProducts(data);
      }))
  };

  const getOneProduct = (id) => {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:8081/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct([data]);
        });
    } else {
      console.log("Wrong number of Product id.");
    }
  };

  const showAllItems = products.map((el) => (
    <div key={el.id} className='mt-5'>
      <div className='d-flex'>
        <img src={el.image} width={130}></img>
        <div className='ms-3 mt-2'>
          Title: {el.title} <br></br>
          Price: ${el.price} <br></br>
          Description: {el.description} <br></br>
          Category: {el.category} <br></br>
          Rating: {el.rating.rate} / 5.0
          of {el.rating.count} reviews
        </div>
      </div>

    </div>
  ))

  const showOneItem = oneProduct.map((el) => (
    <div key={el.id} className='mt-5'>
      <div className='d-flex'>
        <img src={el.image} width={130}></img>
        <div className='ms-3 mt-2'>
          Title: {el.title} <br></br>
          Price: ${el.price} <br></br>
          Description: {el.description} <br></br>
          Category: {el.category} <br></br>
          Rating: {el.rating.rate} / 5.0
          of {el.rating.count} reviews
        </div>
      </div>

    </div>
  ))

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);

    const newProduct = {
      id: Number(document.querySelector("#id").value),
      title: document.querySelector("#title").value,
      price: Number(document.querySelector("#price").value),
      description: document.querySelector("#description").value,
      category: document.querySelector("#category").value,
      image: document.querySelector("#image").value,
      rating: {
        rate: Number(document.querySelector("#rate").value),
        count: Number(document.querySelector("#count").value)
      }
    }

    console.log(newProduct);

    fetch("http://localhost:8081/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert("Product created");
        }
      });
  }

  const updateOneProduct = (id, price) => {

    console.log(price);

    const body = {
      itemId: id,
      newPrice: price
    }

    fetch("http://localhost:8081/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("product upated");
        getOneProduct(id);
      })
  }

  const deleteOneProduct = (id) => {
    fetch("http://localhost:8081/deleteProduct", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "id": id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", id);
        console.log(data);
        if (data) {
          const key = Object.keys(data);
          const value = Object.values(data);
          alert(key + value);
        }
      });
  }

  if (pageState == 0) {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1); getAllProducts() }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2) }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3) }}>Delete</button>
        </header>

        <div className="container mt-5">
          <h2>Create a Product</h2>

          <div>
            <label className='form-label'>Product ID</label>
            <input id='id' className='form-control' name='id'></input>
            <label className='form-label'>Product Title</label>
            <input id='title' className='form-control' name='title'></input>
            <label className='form-label'>Product Price</label>
            <input id='price' className='form-control' name='price'></input>
            <label className='form-label'>Product Description</label>
            <input id='description' className='form-control' name='description'></input>
            <label className='form-label'>Product Category</label>
            <input id='category' className='form-control' name='category'></input>
            <label className='form-label'>Product Image</label>
            <input id='image' className='form-control' name='image'></input>
            <label className='form-label'>Product Rating out of 5.0</label>
            <input id='rate' className='form-control' name='rate'></input>
            <label className='form-label'>Product Rating Count</label>
            <input id='count' className='form-control' name='count'></input>
          </div>

          <button className='btn btn-success mt-3' onClick={handleOnSubmit}>Submit</button>

        </div>

      </div>
    );
  } else if (pageState == 1) {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1); getAllProducts() }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2) }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3) }}>Delete</button>
        </header>

        <div className="container mt-5">
          <h2>All Products</h2>

          <div>
            {showAllItems}
          </div>
        </div>

      </div>
    );
  } else if (pageState == 2) {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1); getAllProducts() }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2) }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3); clearSetOneProduct() }}>Delete</button>
        </header>

        <div className="container mt-5">
          <h2>Update a Product</h2>

          <div className='mt-3'>
            <label className='form-label'>Product ID to Update</label>
            <input id='update-id' className='form-control' name='update-id'></input>
            <button className='btn btn-primary mt-2 btn-sm' onClick={() => { getOneProduct(document.querySelector("#update-id").value) }}>Show Product to Update</button>
          </div>

          <div>{showOneItem}</div>
          <div className='mt-3'>
            <label className='form-label'>Price</label>
            <input id='update-price' className='form-control' name='update-price'></input>
            <button id='update-btn-price' className='btn btn-success mt-2 btn-sm'
              onClick={() => { updateOneProduct(Number(document.querySelector("#update-id").value), Number(document.querySelector("#update-price").value)) }}>Update Price</button>
          </div>

        </div>

      </div>
    );
  } else {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1); getAllProducts() }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2); clearSetOneProduct() }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3) }}>Delete</button>
        </header>

        <div className="container mt-5">
          <h2>Delete a Product</h2>

          <div className='mt-3'>
            <label className='form-label'>Product ID to Delete</label>
            <input id='delete-id' className='form-control' name='deleye-id'></input>
            <button className='btn btn-primary mt-2 btn-sm' onClick={() => { getOneProduct(document.querySelector("#delete-id").value) }}>Show Product to Update</button>
          </div>

          <div>{showOneItem}</div>

          <button className='btn btn-danger btn-sml mt-3' onClick={() => { deleteOneProduct(Number(document.querySelector("#delete-id").value)) }}>Delete Product</button>

        </div>

      </div>
    );
  }


}

export default App;
