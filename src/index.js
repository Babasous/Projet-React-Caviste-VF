import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import axios from 'axios';
const borderTable = {
  border: '2px solid red'
}

function FilterableProductTable() {

  const [wines, setData] = useState([]);
  // useEffect est similaire à "componentDidMount" et "componentDidUpdate"
  useEffect(() => {
    fetch('https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines')
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        }
      )
  }, [])
  console.log(wines);
    return <div>{JSON.stringify(wines)}</div>
  
  //  <h1 style={borderTable}>{data.map(item => (
  //   <p key={item.id}>{item.region} {item.name} {item.price} {item.country}</p>
  // ))}</h1>
}

//export default FilterableProductTable;
ReactDOM.render(<FilterableProductTable/>, document.getElementById('root'));