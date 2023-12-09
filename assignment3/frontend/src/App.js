import { useState } from 'react';
import './App.css';

function App() {

  const [pageState, setPageState] = useState([0]);


  if (pageState == 0) {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1) }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2) }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3) }}>Delete</button>
        </header>

        <div className="container mt-5">
          <div>{pageState}</div>
        </div>

      </div>
    );
  } else if (pageState == 1) {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1) }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2) }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3) }}>Delete</button>
        </header>

        <div className="container mt-5">
          <div>{pageState}</div>
        </div>

      </div>
    );
  } else if (pageState == 2) {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1) }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2) }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3) }}>Delete</button>
        </header>

        <div className="container">
          <div>{pageState}</div>
        </div>

      </div>
    );
  } else {
    return (
      <div>
        <header className="mt-3">
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(0) }}>Create</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(1) }}>Read</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(2) }}>Update</button>
          <button className="btn btn-primary ms-2" onClick={() => { setPageState(3) }}>Delete</button>
        </header>

        <div className="container">
          <div>{pageState}</div>
        </div>

      </div>
    );
  }


}

export default App;
