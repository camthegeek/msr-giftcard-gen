import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from "react-bootstrap";
import './index.css';
import Header from './components/header';
import Footer from './components/footer';
import Main from './components/content';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <>
  <Container fluid>
      <Row className="bg-light">
        <Container fixed>
          <Col md={12} id="header">
            <Header />
          </Col>
        </Container>
      </Row>
      <Row>
        <Container fixed>
        <Col md={12} id="page-content-wrapper" className="min-vh-100">
          <Main/>
        </Col>
        </Container>
      </Row>
    </Container>
    
    <Footer />
    </>,
  document.getElementById('root')
);