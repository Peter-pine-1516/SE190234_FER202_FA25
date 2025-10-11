import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from '../components/NavBar/NavBar';

const AboutPage = () => {
  return (
    <div>
      <NavBar />
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h2 className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  About Us
                </h2>
              </Card.Header>
              <Card.Body className="p-4">
                <h4 className="mb-3">Welcome to Movie App</h4>
                <p className="lead">
                  Your ultimate destination for discovering and exploring movies from around the world.
                </p>
                
                <h5 className="mt-4 mb-3">Our Mission</h5>
                <p>
                  We are dedicated to providing movie enthusiasts with a comprehensive platform 
                  to discover, explore, and enjoy their favorite films. Our collection spans across 
                  various genres, years, and countries, ensuring there's something for everyone.
                </p>

                <h5 className="mt-4 mb-3">What We Offer</h5>
                <ul>
                  <li>Extensive movie database with detailed information</li>
                  <li>Advanced search and filtering options</li>
                  <li>Personalized favorites list</li>
                  <li>User-friendly interface with modern design</li>
                  <li>Regular updates with new releases</li>
                </ul>

                <h5 className="mt-4 mb-3">Contact Information</h5>
                <p>
                  <i className="bi bi-envelope me-2"></i>
                  Email: info@movieapp.com
                </p>
                <p>
                  <i className="bi bi-telephone me-2"></i>
                  Phone: +84 123 456 789
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;

