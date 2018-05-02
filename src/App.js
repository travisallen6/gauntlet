import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from './questions.json'
import shuffle from 'lodash.shuffle'

class App extends Component {
  constructor(){
    super()
    this.state = {
      leftWord: '',
      rightWord: '',
      timer: 0,
      index: 0,
      questions: [],
      startTime: 10,
      rotateTime: 10,
      running: false
    }
  }

  componentDidMount(){
    let shuffQs = shuffle(questions)
    this.setState({
      questions: shuffQs
    })

  }

  countDown = () => {
    let seconds = this.state.timer - 1;

    if(this.state.timer === 0){
      if(this.state.index >= this.state.questions.length - 2){
        clearInterval(this.timer)
        alert("All done!")
        this.setState({
          running: false
        })
      } else {
          this.setState({
            index: this.state.index + 2,
            leftWord: this.state.questions[this.state.index + 2],
            rightWord: this.state.questions[this.state.index + 3],
            timer: this.state.startTime
          })
      }
    } else {
      this.setState({
        timer: seconds
      })
    }
  }

  setTimer = () => {
    if(this.state.running){
      clearInterval(this.timer)
    }

    let { questions: qs, index } = this.state
    this.setState({
      timer: this.state.startTime,
      leftWord: qs[index],
      rightWord: qs[index + 1],
      index: index + 2,
      running: true
    })
    this.timer = setInterval(this.countDown, 1000)
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: +e.target.value
    })
  }

  playPause = () => {
    if(this.state.running){
      clearInterval(this.timer)
      this.setState({
        running: !this.state.running
      })
    } else {
      this.timer = setInterval(this.countDown, 1000)
      this.setState({
        running: !this.state.running
      })
    }
  }


  render() {

    let leftClass = this.state.timer >= this.state.startTime/2 ? "selected left" : "left" ;
    let rightClass = this.state.timer < this.state.startTime/2 ? "selected right" : "right"

    return (
      <div className="App">
        <div className="head">
          <div className="controls-container">
          <h1>Timer is set to: 
          <input style={{width: "50px"}} type="text" name="startTime" onChange={this.handleInput} value={this.state.startTime} /> seconds</h1>
          <h1>Rotation pause: 
          <input style={{width: "50px"}} type="text" name="rotateTime" onChange={this.handleInput} value={this.state.rotateTime} /> seconds</h1>
          <button
          onClick={this.setTimer}>Launch/Reset</button>
          <button
          onClick={this.playPause}>Play/Pause</button>
        </div>
          
          <div className="timer-container">
            <h1>{this.state.timer}</h1>
          </div>
        
        </div>
        <div className="left-right">
          <div className={leftClass}>
            <h1>{this.state.leftWord}</h1>
          </div>
          <div className={rightClass}>
            <h1>{this.state.rightWord}</h1>
          
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
