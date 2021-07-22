import React from 'react';
import "./App.css";
// import Sounds from "./Sounds"

const Sounds = [
  { name: "Dsc_Oh", file: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { name: "Kick_n_Hat", file: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { name: "RP4_KICK_1", file: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { name: "Chord_1", file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
  { name: "Chord_2", file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
  { name: "Chord_3", file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
  { name: "Give_us_a_light", file: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
  { name: "Dry_Ohh", file: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
  { name: "side_stick_1", file: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3 " }

]





class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className="html-div">
        <div className="body-div">
          <div className="App" className="board" >
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
    this.keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
    this.Sounds = Sounds
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      keyIsDown: false,
      sounds: [],
      display: "",
      playingIndex: -1
    }
    this.playAudio = this.playAudio.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)

  }
  componentDidMount() {
    console.log("mounted")
    const arr = []
    for (let i = 0; i < 9; i++) {
      let audio = new Audio;
      audio.src = Sounds[i]['file']
      arr.push(audio)
    }
    this.setState({ sounds: arr })
  }
  updateDisplay(text) {
    this.setState({ display: text })
  }
  handleKeyPress(e) {
    const index = this.keys.indexOf(e.key.toUpperCase())
    if (index !== -1) {
      this.playAudio(index)
    }

  }
  playAudio(index) {
    const audio = document.getElementById(this.keys[index])
    console.log(audio)
    if (audio.paused === true) {
      console.log("true")
      audio.play();
    }
    else if (audio.paused === false) {
      audio.pause()
      audio.currentTime = 0.0
      audio.play();
    }
    this.updateDisplay(this.Sounds[index]['name'])



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
        id={id}
        playingIndex={this.state.playing}
        updateDisplay={this.updateDisplay} />
    ))
    return (
      <div >
        <div className="board" id="drum-machine">
          <h1 className="heading">David's Drum Machine</h1>
          {btnGroup}
          <h2 className="heading"
            id="display">
            {this.state.display}</h2>
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
    this.keyTrigger = ""

  }
  componentDidMount() {
    const id = this.props.id
    this.keyTrigger = (function () {
      const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
      let index = id.toString().substring(id.length - 1);
      let keyTrigger = keys[index]
      return keyTrigger
    })();

  }


  handleClick() {
    this.playSound()
    const button = document.getElementById(this.props.soundName)
    console.log(button)

  }
  playSound() {
    const audio = document.getElementById(this.keyTrigger)
    console.log(audio)
    if (audio.paused === true) {
      console.log("true")
      audio.play();
    }
    else if (audio.paused === false) {
      audio.pause()
      audio.currentTime = 0.0
      audio.play();
    }
    this.props.updateDisplay(this.props.soundName)

  }
  render() {
    const id = this.props.id;
    // const soundRef = this.soundRef
    const keyTrigger = (function () {
      const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"]
      let index = id.toString().substring(id.length - 1);
      let keyTrigger = keys[index]
      return keyTrigger.toUpperCase()
    })();

    return (
      <div className="button-container drum-pad"
        id={this.props.soundName}
        onClick={() => this.handleClick()}>
        <audio
          className="clip"
          id={keyTrigger}
          src={this.props.audioSrc}
        ></audio>
        <button className={"button "}
          type="button">{keyTrigger}
        </button>

      </div>
    )
  }

}


export default App;
