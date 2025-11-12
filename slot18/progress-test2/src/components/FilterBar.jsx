import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ 
    searchTerm, 
    selectedName, 
    selectedCourse, 
    sortBy, 
    names, 
    courses, 
    onSearchChange, 
    onNameChange, 
    onCourseChange, 
    onSortChange 
}) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by name  */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Name/Course)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by name or course name"
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Name  */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Name</Form.Label>
                                <Form.Select 
                                    value={selectedName}
                                    onChange={(e) => onNameChange(e.target.value)}
                                >
                                    <option value="">All Names</option>
                                    {names.map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Filter by Course name */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Course</Form.Label>
                                <Form.Select 
                                    value={selectedCourse}
                                    onChange={(e) => onCourseChange(e.target.value)}
                                >
                                    <option value="">All Courses</option>
                                    {courses.map((course) => (
                                        <option key={course} value={course}>
                                            {course}
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
                                    <option value="course_asc">Course name ascending</option>
                                    <option value="course_desc">Course name descending</option>
                                    <option value="date_asc">Date ascending</option>
                                    <option value="date_desc">Date descending</option>
                                    <option value="amount_asc">Amount ascending</option>
                                    <option value="amount_desc">Amount descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
