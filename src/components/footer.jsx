import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (
            <Container fluid className="w-100 mt-auto py-3 bg-dark text-white text-center footer">
                <Row>
                    <Container fixed>
                        <Row>
                            <Col md={12} className="mt-2 mb-0">
                                <h5>Site</h5>
                                <ul className="list-group list-group-horizontal">
                                    <li className="list-group-item"><a href="/">Home</a></li>
                                    <li className="list-group-item"><a href="https://getmasari.org">Masari Project</a></li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="mt-2 mb-0">
                                Copyright 2021 msr-giftcard-gen
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}

export default Footer;