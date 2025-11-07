import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ 
    searchTerm, 
    selectedRole, 
    selectedStatus, 
    sortBy, 
    roles, 
    statuses, 
    onSearchChange, 
    onRoleChange, 
    onStatusChange, 
    onSortChange 
}) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by username or full name */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Username/Full Name)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by username or full name"
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Role */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Role</Form.Label>
                                <Form.Select 
                                    value={selectedRole}
                                    onChange={(e) => onRoleChange(e.target.value)}
                                >
                                    <option value="">All Roles</option>
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Filter by Status */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Status</Form.Label>
                                <Form.Select 
                                    value={selectedStatus}
                                    onChange={(e) => onStatusChange(e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select 
                                    value={sortBy}
                                    onChange={(e) => onSortChange(e.target.value)}
                                >
                                    <option value="id_asc">ID ascending</option>
                                    <option value="id_desc">ID descending</option>
                                    <option value="username_asc">Username ascending</option>
                                    <option value="username_desc">Username descending</option>
                                    <option value="fullName_asc">Full Name ascending</option>
                                    <option value="fullName_desc">Full Name descending</option>
                                    <option value="role_asc">Role ascending</option>
                                    <option value="role_desc">Role descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserFilter;

