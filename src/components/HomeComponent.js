import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div id="homeSection" className="mySection">
        <Container fluid>
          <Row>
            <div className="col-12 col-md-6">
              <div id="hpGameCard1"></div>
            </div>
            <div className="col-12 col-md-6">
              <h4>Text</h4>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;