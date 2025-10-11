import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const Filter = ({ searchTerm, setSearchTerm, yearFilter, setYearFilter, sortOption, setSortOption }) => {
  const handleClearFilters = () => {
    setSearchTerm("");
    setYearFilter("");
    setSortOption("");
  };

  const hasActiveFilters = searchTerm || yearFilter || sortOption;

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filter & Search Movies
        </h5>
        {hasActiveFilters && (
          <Button 
            variant="light" 
            size="sm" 
            onClick={handleClearFilters}
          >
            <i className="bi bi-x-circle me-1"></i>
            Clear All
          </Button>
        )}
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {/* Search Box */}
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-search me-2"></i>
                Search
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Form.Text className="text-muted">
                  Searching for: "{searchTerm}"
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          {/* Filter by Year */}
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-calendar me-2"></i>
                Filter by Year
              </Form.Label>
              <Form.Select 
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="<=2000">2000 and earlier</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value=">2015">After 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sorting */}
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-sort-down me-2"></i>
                Sort By
              </Form.Label>
              <Form.Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Select sorting...</option>
                <option value="year-asc">Year ↑ (Oldest first)</option>
                <option value="year-desc">Year ↓ (Newest first)</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑ (Shortest first)</option>
                <option value="duration-desc">Duration ↓ (Longest first)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Filter;

