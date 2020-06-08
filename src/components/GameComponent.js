import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

class Game extends Component {
  render() {
    return (
      <div id="gameSection" className="mySection">
        <Container fluid>
          <Row className="rankings">
            <div className="rankingText">Global Rankings</div>
            <div className="rankingTable">Table</div>
          </Row>
          <Row className="mainGame">
            <div className="moveOrder">
              <div className="startingCard">
                <div className="innerCard">
                  <div className="startingCardNumber">21</div>
                </div>
              </div>
            </div>
            <div className="cardsRow"></div>
          </Row>
          <Row className="underGameText">
            <div className="orderAskText">I want to start</div>
            <div className="orderBtn first">first</div>
            <div className="orderBtn second">second</div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Game;