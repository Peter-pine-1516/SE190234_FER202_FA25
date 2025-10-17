import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, ListGroup, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  { id: 1, name: 'Apple', category: 'Fruit' },
  { id: 2, name: 'Carrot', category: 'Vegetable' },
  { id: 3, name: 'Banana', category: 'Fruit' },
  { id: 4, name: 'Broccoli', category: 'Vegetable' },
];

function SearchItem() {
  const [searchTerm, setSearchTerm] = useState('');

  // Tính toán danh sách được lọc dựa trên searchTerm
  const filteredList = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header className="bg-info text-white">
              <h4 className="text-center mb-0">
                <i className="bi bi-search"></i> Tìm kiếm theo tên
              </h4>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm theo tên..."
                  size="lg"
                  className="border-info"
                />
              </Form.Group>
              
              {filteredList.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="bi bi-exclamation-triangle"></i>
                  Không tìm thấy kết quả
                </Alert>
              ) : (
                <ListGroup variant="flush">
                  {filteredList.map(item => (
                    <ListGroup.Item key={item.id} className="border-0 bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">{item.name}</span>
                        <span className="badge bg-info">{item.category}</span>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default SearchItem;