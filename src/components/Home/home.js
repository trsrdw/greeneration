import React from "react";
import './home.scss';
import { Link } from "react-router-dom";
import { Card, Col, Row, Container } from "react-bootstrap";

export default function Home() {
    return (
        <div className="home-wrapper">
            <div className="section section-one">
                <div className="main-cover">
                    <h1>Empowering <br />Sustainable Living</h1>
                    <h5>We empower individuals and businesses to make sustainable choices and create a better future for our planet.</h5>
                </div>
                <div className="main-button">
                    <Link className="button-primary" as={Link} to="/wastelist">Manage Waste</Link>
                </div>
            </div>

            <div className="more-content section section-two">
                <Row xs={1} md={3} className="g-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Col key={idx}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="footer-content">
                <Container>
                    <Row>
                        <Col>
                            <h5 className="mb-3">Waste Management</h5>
                            <ul className="list-unstyled">
                                <li><Link as={Link} to="/">Home</Link></li>
                                <li><Link as={Link} to="/wastelist">Waste List</Link></li>
                                {/* <li><Link as={Link} to="/about">About</Link></li> */}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="copy-wrapper">
                            <p className="copyright">© 2023 Tiara S. Dewi. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}