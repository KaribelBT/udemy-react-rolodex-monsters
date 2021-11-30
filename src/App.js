import React, { Component } from 'react'; 
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super(); //da acceso al state en el component
    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  componentDidMount() { // call data when component inits
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters: users}))
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter( monster => 
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
    )
    return (
      <div className='App'>
        <h1>Monsters Rolodex</h1>
        <SearchBox
        placeholder='search Monsters'
        handleChange = {e=> this.setState(
            {searchField: e.target.value}, 
            ()=> console.log(this.setState.searchField) //setState es asincrono, por eso para usarlo se necesita el callback
          )}
        />
        <CardList monsters={filteredMonsters}/>
                  
      </div>
    );
  }  
}

export default App;
