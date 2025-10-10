import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
// Import các component con
import FormHeader from './FormHeader';
import NameInput from './NameInput';
import AddressInput from './AddressInput';
import CitySelect from './CitySelect';
import TravelRadio from './TravelRadio';
import SubmitButton from './SubmitButton';

const FlightBookingForm = () => {
  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {/* Sử dụng Card component từ React Bootstrap */}
          <Card className="shadow">
            
            {/* Component Header */}
            <FormHeader />

            {/* Sử dụng Card.Body component */}
            <Card.Body>
              {/* Sử dụng Form component */}
              <Form className="flight-form">
                
                {/* Component Input Họ tên */}
                <NameInput />

                {/* Component Input Địa chỉ */}
                <AddressInput />

                {/* Component Select Thành phố */}
                <CitySelect />

                {/* Component Radio Button */}
                <TravelRadio />

                {/* Component Submit Button */}
                <SubmitButton />

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FlightBookingForm;
