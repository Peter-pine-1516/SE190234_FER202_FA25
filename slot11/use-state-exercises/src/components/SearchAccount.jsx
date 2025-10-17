//SearchAccount component using useState to search accounts by username
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, ListGroup, Image, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchAccount() {
    //Dữ liệu mẫu accounts
    const [accounts] = useState([
        { id: 1, username: 'john_doe', password: 'password123', avatar: '/DE180020.jpg' },
        { id: 2, username: 'jane_smith', password: 'securepass', avatar: '/DE180814.jpg' },
        { id: 3, username: 'mike_wilson', password: 'mypassword', avatar: '/DE190234.jpg' },
        { id: 4, username: 'sarah_jones', password: 'strongpass', avatar: '/DE190491.jpg' }
    ]);

    //State cho search term
    const [searchTerm, setSearchTerm] = useState('');
    
    //State cho filtered accounts
    const [filteredAccounts, setFilteredAccounts] = useState(accounts);

    //Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        
        if (term === '') {
            setFilteredAccounts(accounts);
        } else {
            const filtered = accounts.filter(account => 
                account.username.toLowerCase().includes(term)
            );
            setFilteredAccounts(filtered);
        }
    };


    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="text-center mb-0">Tìm Kiếm Account</h3>
                        </Card.Header>
                        <Card.Body>
                            {/* Input tìm kiếm */}
                            <Form.Group className="mb-4">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <i className="bi bi-search"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập username để tìm kiếm..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="form-control-lg"
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* Hiển thị kết quả */}
                            {filteredAccounts.length === 0 ? (
                                <Alert variant="warning" className="text-center">
                                    <i className="bi bi-exclamation-triangle"></i>
                                    Không tìm thấy kết quả
                                </Alert>
                            ) : (
                                <div>
                                    <h5 className="text-center mb-3 text-muted">
                                        Danh sách Accounts ({filteredAccounts.length})
                                    </h5>
                                    <ListGroup variant="flush">
                                        {filteredAccounts.map(account => (
                                            <ListGroup.Item key={account.id} className="border-0">
                                                <div className="d-flex align-items-center">
                                                    <Image
                                                        src={account.avatar}
                                                        alt={`Avatar of ${account.username}`}
                                                        roundedCircle
                                                        width={50}
                                                        height={50}
                                                        className="me-3"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <div className="fw-bold text-primary">
                                                            @{account.username}
                                                        </div>
                                                        <small className="text-muted">
                                                            Password: {account.password}
                                                        </small>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchAccount;
