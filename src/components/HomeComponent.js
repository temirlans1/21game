import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import arrowDown from '../icons/arrowDown.png';

class Home extends Component {
  render() {
    return (
      <div id="homeSection" className="mySection">
        <Container fluid>
          <Row>
            <div className="col-12 col-xl-6" id="cardsGroup">
              <div className="gameCard type21">
                <div className="innerCard">
                  <h2 className="cardNumber firstCard">21</h2>
                </div>
              </div>
              <div className="gameCard type20">
                <div className="innerCard">
                  <h2 className="cardNumber secondCard">20</h2>
                </div>
              </div>
              <div className="gameCard type19">
                <div className="innerCard">
                  <h2 className="cardNumber thirdCard">19</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6" id="homePageText">
              <div className="textsGroup">
                <div className="text1">test your mind</div>
                <div className="text2">make as few</div>
                <div className="text2">attempts as possible</div>
              </div>
              
            </div>
          </Row>
          <Row className="toRules">
            <a className="toRules" href="#rulesSection">
              <div>rules</div>
              <img src={arrowDown} alt="rules"></img>
            </a>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;