import React from 'react';
import { Container, Card, Tabs, Tab, ProgressBar, Button, Row, Col } from 'react-bootstrap';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';

const AccountPage = () => {
  // Note: No hooks as per requirement - just UI display
  const currentStep = 1; // Default to step 1 (About tab)
  const progress = currentStep === 1 ? 33 : currentStep === 2 ? 67 : 100;

  return (
    <Container className="py-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0 text-center">
            <i className="bi bi-person-plus-fill me-2"></i>
            Build Your Profile
          </h3>
        </Card.Header>
        <Card.Body className="p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar 
              now={progress} 
              label={`${progress}%`}
              variant={progress === 100 ? "success" : "primary"}
              animated
              striped
            />
            <p className="text-center mt-2 text-muted">
              Step {currentStep} of 3
            </p>
          </div>

          {/* Wizard Tabs */}
          <Tabs
            defaultActiveKey="about"
            id="profile-wizard-tabs"
            className="mb-4"
          >
            {/* Tab 1: About */}
            <Tab 
              eventKey="about" 
              title={
                <>
                  <i className="bi bi-person-circle me-2"></i>
                  About
                </>
              }
            >
              <div className="p-3">
                <h5 className="mb-3">Personal Information</h5>
                <AboutForm />
                
                {/* Navigation Buttons for About Tab */}
                <Row className="mt-4">
                  <Col>
                    <Button variant="secondary" disabled>
                      <i className="bi bi-arrow-left me-2"></i>
                      Previous
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <Button variant="primary">
                      Next
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Tab>

            {/* Tab 2: Account */}
            <Tab 
              eventKey="account" 
              title={
                <>
                  <i className="bi bi-lock me-2"></i>
                  Account
                </>
              }
            >
              <div className="p-3">
                <h5 className="mb-3">Account Security</h5>
                <AccountForm />
                
                {/* Navigation Buttons for Account Tab */}
                <Row className="mt-4">
                  <Col>
                    <Button variant="secondary">
                      <i className="bi bi-arrow-left me-2"></i>
                      Previous
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <Button variant="primary">
                      Next
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Tab>

            {/* Tab 3: Address */}
            <Tab 
              eventKey="address" 
              title={
                <>
                  <i className="bi bi-geo-alt me-2"></i>
                  Address
                </>
              }
            >
              <div className="p-3">
                <h5 className="mb-3">Contact Address</h5>
                <AddressForm />
                
                {/* Navigation Buttons for Address Tab */}
                <Row className="mt-4">
                  <Col>
                    <Button variant="secondary">
                      <i className="bi bi-arrow-left me-2"></i>
                      Previous
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <Button variant="success">
                      <i className="bi bi-check-circle me-2"></i>
                      Finish
                    </Button>
                  </Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountPage;

