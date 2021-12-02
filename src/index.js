import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const borderTable = {
  border: '2px solid yellow'
}
const borderSearch = {
  border: '2px solid blue'
}
const borderAffiche = {
  border: '2px solid black'
}

function WineRow({wine}){
  return <tr>
    <td>{wine.name}</td>
    <td>{wine.price}</td>
  </tr>
}

function WineRegionRow({region}){
  return <tr>
    <th colSpan="2">{region}</th>
  </tr>
}

function WineTable({wines}){
  const rows = []
  let lastRegion = null

  wines.forEach(wine => {
    if(wine.region !== lastRegion){
      lastRegion = wine.region
      rows.push(<WineRegionRow key={lastRegion} region={lastRegion}/>)
    }
    rows.push(<WineRow key={wine.id} wine={wine}/>)
  })
  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </table>
}

class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleSelectCountryChange = this.handleSelectCountryChange.bind(this)
  }
  handleFilterTextChange(e){
    this.props.onFilterTextChange(e.target.value)
  }

  handleSelectCountryChange(e){
    this.props.onCountryChange(e.target.value)
  }

  render(){
    const {filterText, selectCountry} = this.props
    return <div style={borderSearch} className="mb-4">
      <div className="form-group mb-0">
        <input type="text" value={filterText} className="form-control" placeholder="Rechercher..." onChange={this.handleFilterTextChange} />
      </div>
      <div className="form-select">
      <select className="form-select" selected={selectCountry} onChange={this.handleSelectCountryChange}>
            <option value="allCountry">All Country</option>
            <option value="France">France</option>
            <option value="USA">Etats Unis</option>
            <option value="Spain">Espagne</option>
            <option value="Argentina">Argentine</option>
            <option value="Italy">Italie</option>
        </select>
      </div>
    </div>
  }
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
  // console.log(wines);
    return <div style={borderTable} >
      <WineTable 
        wines={wines}
        // filterText={this.state.filterText}
        // selectCountry={this.state.selectCountry}
      />      
    </div>
}

class Affichage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      filterText: 'BLOCK NINE',
      selectCountry: 'All Country'
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleSelectCountryChange = this.handleSelectCountryChange.bind(this)
  }

  handleFilterTextChange(filterText){
    this.setState({filterText})
  }

  handleSelectCountryChange(selectCountry){
    this.setState({selectCountry})
  }

  render(){
    
    return <React.Fragment>
      <div  style={borderAffiche}>
          {JSON.stringify(this.state)}
        <SearchBar 
          filterText={this.state.filterText}
          selectCountry={this.state.selectCountry}
          onFilterTextChange={this.handleFilterTextChange}
          onCountryChange={this.handleSelectCountryChange}
        />
        <FilterableProductTable />
      </div>
    </React.Fragment>
    
  }
}
//export default FilterableProductTable;
ReactDOM.render(<Affichage/>, document.getElementById('root'));