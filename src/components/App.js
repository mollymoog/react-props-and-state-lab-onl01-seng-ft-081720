import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    console.log(event.target.value)
    this.setState({
      filters: {
        ...this.state.filters, 
        type: event.target.value
      }
    })
  }
  
  fetchPets = () => {
    let url = '/api/pets'

    if (this.state.filters.type !== "all") {
      url = url + `?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(resp => resp.json())
    .then(pets => this.setState({pets: pets}))
  }

  onAdoptPet = (id) => {
    const pet = this.state.pets.map(pets => {
      if (pets.id === id) {
        return {...pets, isAdopted: true}
      }
    })
    this.setState({pets: pet})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} 
              onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
