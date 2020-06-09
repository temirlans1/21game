import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

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
      animationCheck: false
    }
    this.cardSelected = this.cardSelected.bind(this);
    this.changeNumbers = this.changeNumbers.bind(this);
    this.moveOrderChoose = this.moveOrderChoose.bind(this);
    this.selectPressed = this.selectPressed.bind(this);
    this.gameOverState = this.gameOverState.bind(this);
  }
  cardSelected(cardNumber, cardOrder) {
    if(cardNumber === 21)return;
    this.setState({
      selectedCard: cardNumber,
      selectedInOrder: cardOrder
    });
  }
  changeNumbers(selected) {
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
    if(this.state.firstCard === 21) {
      setTimeout(this.gameOverState, 3000);
    }
  }

  gameOverState() {
    this.setState({
      firstCard: 1,
      secondCard: 2,
      thirdCard: 3,
      gameStarted: false,
      selectedInOrder: 0,
      selectedCard: 0
    });
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
      moveOrder: order
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

    return (
      <div id="gameSection" className="mySection">
        <Container fluid>
          <Row className="rankings">
            <div className="rankingText">Global Rankings</div>
            <div className="rankingTable">Table</div>
          </Row>
          <Row className="mainGame">
            <div className="moveOrder">
              <div className={(this.state.gameStarted) ? "startingCard fadeOut": "startingCard"}>
                <div className="innerCard">
                  <div className="startingCardNumber">21</div>
                </div>
              </div>
              <div className={(this.state.gameStarted) ? "orderingCard fadeIn": "orderingCard"}
                hidden={(!this.state.gameStarted) ? "true": null}>
                <div className="innerCard">
                  <div className="orderingCardText">{turnText}</div>
                </div>
              </div>
              
            </div>
            
            <div className="cardsRow">
              <div hidden={(!this.state.gameStarted) ? "true": null}
                className={firstCardClass}
                onAnimationEnd={() => this.changeNumbers(this.state.selectedCard)}
                onClick={() => this.cardSelected(this.state.firstCard, 1)}>{this.state.firstCard}</div>
              <div hidden={(!this.state.gameStarted || this.state.secondCard > 21) ? "true": null}
                className={secondCardClass}
                onClick={() => this.cardSelected(this.state.secondCard, 2)}>{this.state.secondCard}</div>
              <div hidden={(!this.state.gameStarted || this.state.thirdCard > 21) ? "true": null}
                className={thirdCardClass}
                onClick={() => this.cardSelected(this.state.thirdCard, 3)}>{this.state.thirdCard}</div>
            </div>
          </Row>
          <Row >
            <div className={(this.state.gameStarted) ? "underGameText fadeOut": "underGameText"}
              hidden={(this.state.gameStarted) ? "true" : null}>
              <div className="orderAskText">I want to start</div>
              <div className="orderBtn first"
                onClick={() => this.moveOrderChoose(true)}>first</div>
              <div className="orderBtn second"
                onClick={() => this.moveOrderChoose(false)}>second</div>
            </div>
            <div className={(this.state.gameStarted) ? "gameOrderingControls fadeIn": "gameOrderingControls"}
              hidden={(!this.state.gameStarted) ? "true" : null}>
              <div className={(this.state.moveOrder) ? "orderBtn confirmation" : "orderBtn waiting"}
                onClick={() => this.selectPressed()}>{(this.state.moveOrder) ? "confirm" : "waiting"}</div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Game;