import React from 'react';
import { Choice } from './Choice';
import './App.css';

let finalScore;

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      sets: 0,
      playedSets: 0,
      myPreviousHandText: "",
      cpuPreviousHandText: "",
      buttonNotPressed: true,
      myScore: 0,
      cpuScore: 0,
      gameOver: false,
      notDraw: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Hanterar knapptryckningen när man väljer set.
   */
  handleSubmit(event) {
    if(this.state.buttonNotPressed) { 
      this.setState(
        {buttonNotPressed: false,
        sets: event.target.value})
    } else {
        if(this.state.playedSets<this.state.sets) {
          this.checkSetWinner(event.target.value, Choice[this.generateCpuHand()])
        }
        if(!this.state.gameOver) {
        }
    }
  }
  /**
   * Genererar en hand åt datorn. Börjar bara med att slumpa fram ett tal mellan
   * 0-2. När första rundan är avklarad börjar datorn kolla om den vann eller inte. 
   * Om den vann lägger den sin förra hand och en slumpad i en array, där den
   * nya handen slumpas fram. (För att behålla lite slumpmässighet). Förlorar
   * datorn förra handen slumpar den fram båda värden istället för att använda
   * den förra handen.
   */
  generateCpuHand() {
    let cpuChoice = new Array(2);
    if(this.state.notDraw) {
      if(this.state.cpuWonSet) {
        cpuChoice[0] = Choice[this.state.cpuPreviousHandText];
        cpuChoice[1] = Math.floor(Math.random() * Math.floor(3))
        return cpuChoice[Math.floor(Math.random() * Math.floor(2))]
    } else {
        cpuChoice[0] = Math.floor(Math.random() * Math.floor(3))
        cpuChoice[1] = Math.floor(Math.random() * Math.floor(3))
        return cpuChoice[Math.floor(Math.random() * Math.floor(2))]
      }
    } else {
      return Math.floor(Math.random() * Math.floor(3))
    }
  }

  /**
   * Kollar vem som vann det senaste settet och lägger till poäng till vinnaren.
   * Blir settet oavgjort spelas rundan om. Default hanterar Scissors.
   * @param {Spelarens senaste hand} myHand 
   * @param {Datorns senaste hand} cpuHand 
   */
  checkSetWinner(myHand, cpuHand) {
    this.setState(
      {myPreviousHandText: myHand,
      cpuPreviousHandText: cpuHand})
    switch(myHand) {
      case "Rock":
        if(cpuHand==="Rock") {
          this.setState({playedSets: this.state.playedSets - 1})
        } else if(cpuHand==="Paper") {
          this.setState(
            {cpuScore: this.state.cpuScore + 1,
            playedSets: this.state.playedSets + 1,
            notDraw: true,
            cpuWonSet: true})
        } else {
          this.setState(
            {myScore: this.state.myScore + 1,
            playedSets: this.state.playedSets + 1,
            notDraw: true,
            cpuWonSet: false})
        }
        break;
      case "Paper":
        if(cpuHand==="Rock") {
          this.setState(
            {myScore: this.state.myScore + 1,
            playedSets: this.state.playedSets + 1,
            notDraw: true,
            cpuWonSet: false})
        } else if(cpuHand==="Paper") {
          this.setState({playedSets: this.state.playedSets - 1})
        } else {
          this.setState(
            {cpuScore: this.state.cpuScore + 1,
            playedSets: this.state.playedSets + 1,
            notDraw: true,
            cpuWonSet: true})
        }
        break;
      default:
        if(cpuHand==="Rock") {
          this.setState(
            {cpuScore: this.state.cpuScore + 1,
            playedSets: this.state.playedSets + 1,
            notDraw: true,
            cpuWonSet: true})
        } else if(cpuHand==="Paper") {
          this.setState(
            {myScore: this.state.myScore + 1,
            playedSets: this.state.playedSets + 1,
            notDraw: true,
            cpuWonSet: false})
        } else {
          this.setState({playedSets: this.state.playedSets - 1})
        break;
    }
  }
}

  /**
   * Kontrollerar vem som vunnit spelet och skickar poängen och vinstmeddelandet
   * till en komponent. Default hanterar 5 set.
   */
  componentDidUpdate() {
    if(!this.state.gameOver) {
      switch(this.state.sets) {
        case "1":
          if(this.state.myScore===+this.state.sets) {
            this.setState({gameOver: true})
            finalScore = <FinalScore winLose="You win" myScore={this.state.myScore} cpuScore={this.state.cpuScore}/>
          } else if(this.state.cpuScore===+this.state.sets) {
            this.setState({gameOver: true})
            finalScore = <FinalScore winLose="Cpu wins" myScore={this.state.myScore} cpuScore={this.state.cpuScore}/>
          }
          break;
        case "3":
          if(this.state.myScore+this.state.sets%2===+this.state.sets) {
            this.setState({gameOver: true})
            finalScore = <FinalScore winLose="You win" myScore={this.state.myScore} cpuScore={this.state.cpuScore}/>
        } else if(this.state.cpuScore+this.state.sets%2===+this.state.sets) {
            this.setState({gameOver: true})
            finalScore = <FinalScore winLose="Cpu wins" myScore={this.state.myScore} cpuScore={this.state.cpuScore}/>
          }
          break;
        default:
          if(this.state.myScore+this.state.sets%2+1===+this.state.sets) {
            this.setState({gameOver: true})
            finalScore = <FinalScore winLose="You win" myScore={this.state.myScore} cpuScore={this.state.cpuScore}/>
        } else if(this.state.cpuScore+this.state.sets%2+1===+this.state.sets) {
            this.setState({gameOver: true})
            finalScore = <FinalScore winLose="Cpu wins" myScore={this.state.myScore} cpuScore={this.state.cpuScore}/>
          }
          break;
      }
    }
  }

  /**
   * Renderar sidan med hjälp av en if-sats ifall man valt set eller inte och om
   * spelet är slut eller inte.
   */
  render() {
    if(this.state.buttonNotPressed) {
      return (
        <div className="App">
          <h1>Rock, Paper, Scissors</h1>
          <SetText header="Choose a number of sets"/>
          <SetForm click={this.handleSubmit} value1={1} value2={3} value3={5}/>
        </div>
      );
    } else if(!this.state.gameOver) {
      return(
        <div className="App">
          <h1>Rock, Paper, Scissors</h1>
          <SetText header="Choose hand" rounds={this.state.sets + " set"}/>
          <SetForm click={this.handleSubmit} value1={Choice[0]} value2={Choice[1]} value3={Choice[2]}/>
          <UpdateScoreboard myScore={this.state.myScore} cpuScore={this.state.cpuScore} 
          myLastHand={this.state.myPreviousHandText} cpuLastHand={this.state.cpuPreviousHandText}/>
        </div>
      );
    } else {
        return(
          <div className="App">
          <h1>Rock, Paper, Scissors</h1>
            {finalScore}
            <form>
              <input type="submit" value="Restart"/>
            </form>
        </div>
        );
      }
  }
}

/**
 * Ändrar instruktionerna på sidan.
 */
function SetText(props) {
  return(
    <div>
      <p>{props.rounds}</p>
      <p>{props.header}</p>
    </div>
  )
}

/**
 * Uppdaterar poängräkningen och båda spelarnas senaste hand.
 */
function UpdateScoreboard(props) {
  return( 
    <div>
      <p>{"Your score: " + props.myScore}</p>
      <p>{"Cpu score: " + props.cpuScore}</p>
      <p>{"Your hand: " + props.myLastHand}</p>
      <p>{"Cpu hand: " + props.cpuLastHand}</p>
    </div>
  )
}

/**
 * Skriver ut vinstmeddelande och båda spelarnas poäng.
 */
function FinalScore(props) {
  return( 
    <div>
      <h1>{props.winLose}</h1>
      <h3>{"Your score: " + props.myScore}</h3>
      <h3>{"Cpu score: " + props.cpuScore}</h3>
    </div>
  )
}

function SetForm(props) {
  return(
    <div className="choiceButton">
      <input
        className="choiceButton"
        type="button"
        value={props.value1}
        onClick={props.click}
        name="sets"/>
      <input 
        className="choiceButton"
        type="button" 
        value={props.value2} 
        onClick={props.click}
        name="sets"/>
      <input 
        className="choiceButton"
        type="button" 
        value={props.value3}
        onClick={props.click}
        name="sets"/>
    </div>
  )
}