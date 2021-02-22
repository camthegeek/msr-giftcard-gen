import React, { Component } from 'react';
import { Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import config from '../config.json';
import QRCode from "react-qr-code";
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

const options = {
  orientation: 'portrait'
};

class Main extends Component {
  constructor(props) {
    super(props)
    this.printRef = React.createRef();
    this.state = {
      wallet: [],
      loading: false,
      input: ''
    }
  }

  generateWallet = (e) => {
    if (e) e.preventDefault();
    try {
    axios.get('//' + config.api.url + ':' + config.api.port + '/api/new')
      .then((wallet) => {
        this.setState({
          wallet: wallet.data,
          loading: false
        })
      })
    } catch(err) {
      console.log(err);
    }
  }

  handleChange = (e) => {
    if (e) e.preventDefault();
    this.setState({
      input: e.target.value
    });
  }

  converttopdf = () => { 
    let card = document.getElementById('printme');
    let pdf = new jsPDF();
    if (pdf) {
      domtoimage.toPng(card)
      .then(data => {
        pdf.addImage(data, 'PNG', 10, 10);
        pdf.save('gicard.pdf');
      })
    }
  }

  render() {
    return (
      <>
        {this.state.wallet.length < 1 &&
          <Row>
            <Col md={12}>
              <ul>
                <li>What is this?</li>
                <ul>
                  <li>Simply put, it's an address generator that outputs the address and mnemonic phrase into a QR code. You may print the output on paper and deliver to a friend.</li>
                </ul>
                <li>Who owns the wallet?</li>
                <ul>
                  <li>After generating, you technically own the wallet. What you choose to do with it is up to you. Our server deletes the generated wallet files immediately after displaying on your screen.</li>
                </ul>
                <li>How can I trust this site?</li>
                <ul>
                  <li>Trust is a personal choice. Source code available here: <a href="https://github.com/camthegeek/msr-giftcard-gen">https://github.com/camthegeek/msr-giftcard-gen</a>.</li>
                </ul>
              </ul>
              <p>Leave a short message to go on the front of the gift card!</p>
              <input size="35" name="message" onChange={this.handleChange}></input> 
              <button onClick={() => { this.generateWallet() }}>Generate gift card</button>
            </Col>
          </Row>
        }
        {this.state.wallet.length >= 1 &&
        <>
        <Row> 
          <h1>A wild new Masari wallet has appeared!</h1>
        </Row>
        <div id="printme" ref={this.printRef}>
          <Row className="mb-2 mt-2">
            <Col md={6}>              
              <Card>
              <Card.Img src="https://raw.githubusercontent.com/masari-project/Masari-Marketing/master/Wallpapers/Multiple_Green_%20Background.jpg" alt="Card image" />
               <Card.ImgOverlay>
                <Card.Body>
                  <Row className="text-white">
                    <Col sm={4} className="mt-3">
                      <h3>Address</h3>
                      <QRCode size="128" value={this.state.wallet[0].addr} />
                    </Col>
                    <Col sm={4} className="">
                      
                    </Col>
                    <Col sm={4} className="mt-3">
                      <h3>Seed</h3>
                      <QRCode size="128" value={this.state.wallet[0].seed} />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>                      
                      <p>{this.state.input ? this.state.input : "" }</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>                      
                      <p></p>
                    </Col>
                  </Row>
                 </Card.Body>
                </Card.ImgOverlay>
              </Card>                     
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>How to redeem?</h2>
              <ul>
                <li>Scan your SEED with a QR reader. Write down the seed phrase.</li>
                <li>Open your internet browser and go to wallet.getmasari.org.</li>
                <li>Click on Import wallet.</li>
                <li>Choose 'From a mnemonic phrase'</li>
                <li>Give your wallet a password</li>
                <li>Set  height to 1439000</li>
                <li>Type in your SEED</li>
                <li>Click import and wait!</li>
              </ul>
              <p></p>
            </Col>
          </Row>
          </div> 
          <Row>
            <Col md={12}>
              <button onClick={this.converttopdf}>Generate pdf</button>
            </Col>
          </Row>
          </>
        }
      </>
    )
  }
}

export default Main;