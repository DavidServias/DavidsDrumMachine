import React from 'react';
import "./App.css";
import Sounds from "./Sounds"


class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className="html-div">
        <div className="body-div">
          <div className="App" className="board">
            <header className="App-header">
            </header>
            <Board />
          </div>
        </div>
      </div>
    )
  }

}


class Board extends React.Component {
  constructor(props) {
    super(props)
    this.keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"]
    this.Sounds = Sounds
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {keyIsDown: false,
                  sounds: [],
                  disableKeys: []};
    this.playAudio = this.playAudio.bind(this)

  }

  componentDidMount() {
    console.log("mounted")
    const arr = []
    for (let i = 0; i < 9; i++){
      let audio = new Audio;
      audio.src = Sounds[i]['file']
      arr.push(audio)
    } 
    this.setState({sounds:arr})
  }

  handleKeyPress(e) {
    const index = this.keys.indexOf(e.key)
    if (index !== -1 ) {
      this.playAudio(index)
    }
    
  }

  playAudio(index){
    let audio = this.state.sounds[index]
    if (audio.paused === true) {
      audio.play();
    }
    else if (audio.paused === false) {
      audio.pause()
      audio.currentTime = 0.0
      audio.play();
    }
    
  }

  render() {
    var ids = [];
    var i;
    for (i = 0; i < 9; i++) {
      ids.push(i)
    }
    document.addEventListener('keydown', this.handleKeyPress, false);
    document.addEventListener('keyup', this.handleKeyUp, false);

    const btnGroup = ids.map((id) => (
      <Button key={"id" + id}
        audioSrc={this.Sounds[id]['file']}
        soundName={this.Sounds[id]["name"]}
        keyPressed={this.keys[id]}
        id={id} />
    ))
    return (
      <div>
        <div className="board">
          <h1 className="heading">David's Drum Machine</h1>
          <p className="sub-heading">(It works, kind of!)</p>
          {btnGroup}
        </div>
      </div>
    )
  }

}


class Button extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.playSound = this.playSound.bind(this)
    this.audio = new Audio;
    this.audio.src = this.props.audioSrc
  }
  handleClick(audioEl) {
    this.playSound()
    
  }
  playSound() {
    const audio = this.audio;
    if (audio.paused === true) {
      audio.play();
    }
    else if (audio.paused === false) {
      audio.pause()
      audio.currentTime = 0.0
      audio.play();
    }
    
  }
  componentDidMount(){
    console.log("in button, test: " + this.audio.src)
  }
  render() {
    const id = this.props.id;   
    const soundRef = this.soundRef
    
    return (
      <div className="button-container">
        
        <button className={"button "}
          type="button"
          onClick={() => this.handleClick()}>{this.props.soundName}</button>

      </div>
    )
  }

}
  


export default App;
