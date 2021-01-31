import React, { Component } from 'react'
import Square from './components/Square.js'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      squares: ["?", "?", "?", "?", "?", "?", "?", "?", "?"],
      treasure: null,
      bomb: null,
      //another map function, this array is used to house the new values that we'd use to reassign the value of squares
      counter: 9
    }
  }

componentDidMount(){
  let { squares } = this.state 
   let treasure = 0
   let bomb = 0
  while ( treasure === bomb ){
    treasure = Math.floor(Math.random() * squares.length)
    bomb = Math.floor(Math.random() * squares.length)
  }
  this.setState({treasure: treasure, bomb: bomb})
}

handleLocation = (indexLocation, value) => {
  // alert (indexLocation)
  let { squares, bomb, treasure, counter } = this.state
  
  console.log(bomb, treasure);
  if(indexLocation === bomb || counter === 0){

    squares[indexLocation] = "bomb"
    alert("You lose!!")
    this.setState({squares: squares, counter: counter })

  } else if (indexLocation === treasure) {
    alert("You win!")
    squares[indexLocation] = "treasure"
    counter = counter - 1
    this.setState({squares: squares, counter: counter })

  } else {
    
    squares[indexLocation] = "tree"
    counter = counter - 1
    this.setState({squares: squares, counter: counter })

  }
}

playAgain = () => {
  this.setState({ 
    squares: ["?", "?", "?", "?", "?", "?", "?", "?", "?"],
      treasure: null,
      bomb: null,
      counter: 9
  })
  this.componentDidMount()
}

  render(){
    let box = this.state.squares.map((value, index)=> {
      return (
        <Square
        value = {value}
        index = {index}
        handleLocation = {this.handleLocation}
        squares = {this.squares}
        key = {index}
        />
      )
    })
    return(
      <React.Fragment>
      <h1>What Do You See?</h1>
      <h2>
        Is it a bird... a plane?
      <br />
        Or is it an eclipse... or meteor?
      </h2>
      <div id="board">
        { box }
      </div>
      <p>Counter: { this.state.counter } </p>
      <button id="restart"
      onClick={ this.playAgain }>
        Play Again!
      </button>
      </React.Fragment>
    )
  }
}
export default App
