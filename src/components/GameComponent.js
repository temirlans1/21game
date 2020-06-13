import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

function RenderWinner({winner}) {
  return (
    <tr><td>{winner.name}</td></tr>
  );
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCard: 1,
      secondCard: 2,
      thirdCard: 3,
      fade: false,
      selectedCard: 0,
      selectedInOrder: 0,
      gameStarted: false,
      moveOrder: true,
      moveChanging: false,
      animationCheck: false,
      endingState: 0,
      botsMove: false,
      winnersAmount: 0,
      totalGames: 0,
      winners: []
    }
    this.cardSelected = this.cardSelected.bind(this);
    this.changeNumbers = this.changeNumbers.bind(this);
    this.moveOrderChoose = this.moveOrderChoose.bind(this);
    this.selectPressed = this.selectPressed.bind(this);
    this.gameOverState = this.gameOverState.bind(this);
    this.endingButtonPress = this.endingButtonPress.bind(this);
  }

  componentDidMount() {
    axios.get(baseUrl + 'records/', {
      auth: {
        username: 'clientSide',
        password: 'thisissupposedtobesafe'
      }
    })
    .then(res => {
      this.setState({
        totalGames: res.data.totalGames,
        winnersAmount: res.data.winners,
        winners: res.data.records
      });
    })
    .catch(error => {
      console.log(error.response)
    });
  }

  cardSelected(cardNumber, cardOrder) {
    if(cardNumber === 21)return;
    this.setState({
      selectedCard: cardNumber,
      selectedInOrder: cardOrder
    });
  }

  changeNumbers(selected) {

    if(this.state.firstCard === 21) {
      setTimeout(this.gameOverState, 2000);
    }
    if(this.state.firstCard > selected)return;
    if(!this.state.animationCheck) {
      this.setState({
        firstCard: selected + 1,
        secondCard: selected + 2,
        thirdCard: selected + 3,
        fade: false,
        moveChanging: false,
        animationCheck: true
      });
    }
    if(!this.state.moveOrder) {
      this.setState({ botsMove: true });
    }
  }

  gameOverState() {
    
    var whoWin = (this.state.moveOrder) ? 2 : 1;
    this.setState({
      firstCard: 1,
      secondCard: 2,
      thirdCard: 3,
      gameStarted: false,
      selectedInOrder: 0,
      selectedCard: 0,
      endingState: whoWin
    });
  }

  endingButtonPress() {
    var whoWin = (this.state.moveOrder) ? 2 : 1;
    if(whoWin === 1) {
      var winnerName = document.getElementById('winnerName').value;
      if(winnerName) {
        axios.post(baseUrl + 'records/winner/', {
          name: winnerName,
          auth: {
            username: 'clientSide',
            password: 'thisissupposedtobesafe'
          }
        })
        .then(res => {
          this.setState({
            totalGames: res.data.totalGames,
            winnersAmount: res.data.winners,
            winners: res.data.records,
            gameStarted: false,
            selectedInOrder: 0,
            selectedCard: 0,
            endingState: 0
          });
        })
        .catch(error => {
          console.log(error.response)
        });
      }
    }
    else {
      axios.get(baseUrl + 'records/', {
        auth: {
          username: 'clientSide',
          password: 'thisissupposedtobesafe'
        }
      })
      .then(res => {
        this.setState({
          totalGames: res.data.totalGames,
          winnersAmount: res.data.winners,
          winners: res.data.records,
          gameStarted: false,
          selectedInOrder: 0,
          selectedCard: 0,
          endingState: 0
        });
      })
      .catch(error => {
        console.log(error.response)
      });
    }
  }

  selectPressed() {
    if(this.state.selectedInOrder === 0)return;

    this.setState({
      fade: true,
      selectedInOrder: 0,
      moveChanging: true,
      moveOrder: !this.state.moveOrder,
      animationCheck: false
    });
  }

  moveOrderChoose(order) {
    this.setState({
      gameStarted: true,
      moveOrder: order,
      botsMove: !order
    });
    axios.post(baseUrl + 'records/', {
      auth: {
        username: 'clientSide',
        password: 'thisissupposedtobesafe'
      }
    })
    .then(res => {
      
    })
    .catch(error => {
      console.log(error.response)
    });
  }


  render() {
    const fadingProperty = (this.state.fade) ? " fadeOut" : "";
    const fadeinProperty = (!this.state.fade) ? " fadeIn" : "";

    var firstSelection = (this.state.selectedInOrder === 1) ? " selected" : "";
    var secondSelection = (this.state.selectedInOrder === 2) ? " selected" : "";
    var thirdSelection = (this.state.selectedInOrder === 3) ? " selected" : "";

    firstSelection = (this.state.firstCard === 21) ? " redCard" : firstSelection;
    secondSelection = (this.state.secondCard === 21) ? " redCard" : secondSelection;
    thirdSelection = (this.state.thirdCard === 21) ? " redCard" : thirdSelection;

    const firstCardClass = (!this.state.moveChanging) ? "playCard" + firstSelection + fadeinProperty : "playCard " + firstSelection + fadingProperty;
    const secondCardClass = (!this.state.moveChanging) ? "playCard" + secondSelection + fadeinProperty: "playCard " + secondSelection + fadingProperty;
    const thirdCardClass = (!this.state.moveChanging) ? "playCard" + thirdSelection + fadeinProperty : "playCard " + thirdSelection + fadingProperty;
    
    const turnText = (this.state.moveOrder) ? "your turn" : "wait a moment";

    const gameOverText = (this.state.endingState === 1) ? "OMG, another winner!!!" : "Not this time, I guess";

    const confirmButtonText = (this.state.endingState === 1) ? "submit" : "try again";

    if (this.state.botsMove && this.state.gameStarted) {
      
      var nextNum;
      axios.get(baseUrl + 'gameMove/' + this.state.selectedCard, {
        auth: {
          username: 'clientSide',
          password: 'thisissupposedtobesafe'
        }
      })
      .then(res => {
        const number = res.data;
        nextNum = number.number;
        var nextNumOrder;
        if(nextNum === this.state.firstCard)nextNumOrder = 1;
        else if(nextNum === this.state.secondCard)nextNumOrder = 2;
        else nextNumOrder = 3;
        setTimeout(() => { this.cardSelected(nextNum, nextNumOrder) }, 500);
        setTimeout(() => this.selectPressed(), 1500);
        this.setState({ botsMove: false });
      })
      .catch(error => {
        console.log(error.response)
      });      
    }
    const winnersTable = this.state.winners.map((winner) => {
      if(winner != null) {
        return (
          <RenderWinner winner={winner} />
        );
      }
      else {
        return (<tr></tr>);
      }
    });

    return (
      <div id="gameSection" className="mySection">
        <Container fluid>
          <Row>
          <div className="col-12 col-xl-6 rankings">
            <div className="rankingText">
              Total wins: { this.state.winnersAmount }
            </div>
              <div className="rankingTable">
                <table>
                  <thead>
                    <tr><th>Last Winners</th></tr>
                  </thead>
                  <tbody>
                    {(this.state.winners) ? winnersTable : null}
                  </tbody>
                </table>
              </div>
          </div>
          
          <div className="col-12 col-xl-6 mainGame">
            <div className="moveOrder">
              <div className={(this.state.gameStarted || this.state.endingState > 0) ? "startingCard fadeOut": "startingCard"}>
                <div className="innerCard">
                  <div className="startingCardNumber">21</div>
                </div>
              </div>
              <div className={(this.state.gameStarted) ? "orderingCard fadeIn": "orderingCard"}
                hidden={(!this.state.gameStarted || this.state.endingState > 0) ? true: null}>
                <div className="innerCard">
                  <div className="orderingCardText">{turnText}</div>
                </div>
              </div>
              
            </div>
            
            <div className="cardsRow">
              <div hidden={(this.state.gameStarted || this.state.endingState !== 0) ? true: null}>
                  <div className="gamePlayedMessage">
                    Total games: {this.state.totalGames}
                  </div>
                </div>
              <div hidden={(this.state.endingState === 0) ? true : null}
                className={(this.state.endingState === 1) ? "gameOverMessage fadeIn winner" : "gameOverMessage fadeIn loser"}>
                  <div className="innerCard">
                    {gameOverText}
                  </div>
                </div>
              <div hidden={(!this.state.gameStarted) ? true: null}
                className={firstCardClass}
                onAnimationEnd={() => this.changeNumbers(this.state.selectedCard)}
                onClick={() => (this.state.moveOrder) ? this.cardSelected(this.state.firstCard, 1) : null}>
                  <div className="innerCard">{this.state.firstCard}</div>
              </div>
              <div hidden={(!this.state.gameStarted || this.state.secondCard > 21) ? true: null}
                className={secondCardClass}
                onClick={() => (this.state.moveOrder) ? this.cardSelected(this.state.secondCard, 2) : null}>
                  <div className="innerCard">{this.state.secondCard}</div>
              </div>
              <div hidden={(!this.state.gameStarted || this.state.thirdCard > 21) ? true: null}
                className={thirdCardClass}
                onClick={() => (this.state.moveOrder) ? this.cardSelected(this.state.thirdCard, 3) : null}>
                  <div className="innerCard">{this.state.thirdCard}</div>
              </div>
            </div>
            
            <div className="nameField" hidden={(this.state.endingState === 0) ? true : null}>
              <input type="text" className="textField" id="winnerName" placeholder="Your Name"
                hidden={(this.state.endingState === 2) ? true : null} />
              <div className={(this.state.endingState === 1) ? "confirmButton fadeIn winner" : "confirmButton fadeIn loser"}
                onClick={() => this.endingButtonPress()}>
                {confirmButtonText}
              </div>
            </div>

            <div className={(this.state.gameStarted) ? "underGameText fadeOut": "underGameText"}
              hidden={(this.state.gameStarted || this.state.endingState > 0) ? true : null}>
              <div className="orderAskText">I want to start</div>
              <div className="orderBtn first"
                onClick={() => this.moveOrderChoose(true)}>first</div>
              <div className="orderBtn second"
                onClick={() => this.moveOrderChoose(false)}>second</div>
            </div>
          
            <div className={(this.state.gameStarted) ? "gameOrderingControls fadeIn": "gameOrderingControls"}
              hidden={(!this.state.gameStarted || this.state.endingState > 0) ? true : null}>
              <div className={(this.state.moveOrder) ? "orderBtn confirmation" : "orderBtn waiting"}
                onClick={() => (this.state.moveOrder) ? this.selectPressed() : null}>{(this.state.moveOrder) ? "confirm" : "waiting"}</div>
            </div>
          </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Game;