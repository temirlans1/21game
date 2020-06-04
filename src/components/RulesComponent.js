import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import arrowDown from '../icons/arrowDown.png';

class Rules extends Component {
  render() {
    return (
      <div id="rulesSection" className="mySection">
        <Container fluid>
          <Row className="rule1">
            <div className="rule1Text">
              Players can choose only one number
            </div>
            <div className="rule1Image">
              <div className="gameCard type3">
                <div className="innerCard">
                  <div className="cardNumber firstCard">3</div>
                </div>
              </div>
              <div className="gameCard type2">
                <div className="innerCard">
                  <div className="cardNumber secondCard">2</div>
                </div>
              </div>
              <div className="gameCard type1">
                <div className="innerCard">
                  <div className="cardNumber thirdCard">1</div>
                </div>
              </div>
            </div>
          </Row>
          <Row className="rule2">
            <div className="rule1Text">
            An opponent will choose from the next 3 numbers. The chosen number can be maximum 21
            </div>
            <div className="rule1Image">
              <div className="gameCard type3">
                <div className="innerCard">
                  <div className="cardNumber greenCard">3</div>
                </div>
              </div>
              <div className="gameCard typeYellow card4">
                <img src={arrowDown} alt="rules"></img>
                <div className="innerCard">
                  <div className="cardNumber yellowCard">4</div>
                </div>
              </div>
              <div className="gameCard typeYellow card5">
                <img src={arrowDown} alt="rules"></img>
                <div className="innerCard">
                  <div className="cardNumber yellowCard">5</div>
                </div>
              </div>
              <div className="gameCard typeYellow card6">
                <img src={arrowDown} alt="rules"></img>
                <div className="innerCard">
                  <div className="cardNumber yellowCard">6</div>
                </div>
              </div>
            </div>
          </Row>
          <Row className="rule3">
            <div className="rule1Text">
            The player who choose 21 will lose
The goal of the game is to leave the opponent a choice of only 21
            </div>
            <div className="rule1Image">
              <div className="gameCard type21red">
                <div className="innerCard">
                  <div className="cardNumber firstCard">21</div>
                </div>
              </div>
              <div className="gameCard type20green">
                <div className="innerCard">
                  <div className="cardNumber secondCard">20</div>
                </div>
              </div>
            </div>
          </Row>
          
          <Row className="startButton">
            <a href="#gameSection">start</a>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Rules;