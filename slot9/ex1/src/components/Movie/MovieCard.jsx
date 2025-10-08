import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { movies } from '../../data/movie';

const MovieCard = () => {
  // Function to truncate description
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <>
      {/* Responsive Grid Layout */}
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} lg={4}>
            <Card 
              className="h-100 shadow-sm border-0"
              style={{ 
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              {/* Movie Poster */}
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={process.env.PUBLIC_URL + movie.poster}
                  alt={`${movie.title} poster`}
                  style={{ 
                    height: '300px', 
                    objectFit: 'cover'
                  }}
                />
                <div 
                  className="position-absolute top-0 end-0 m-2"
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '4px', padding: '4px 8px' }}
                >
                  <Badge bg="secondary" className="text-white">
                    {movie.year}
                  </Badge>
                </div>
              </div>
              
              {/* Card Body */}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h5 mb-2">
                  {movie.title}
                </Card.Title>
                
                <Card.Text className="text-muted mb-3 flex-grow-1">
                  {truncateDescription(movie.description)}
                </Card.Text>
                
                {/* Movie Info */}
                <div className="mb-3">
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {movie.genre.map((genre, index) => (
                      <Badge key={index} bg="primary" className="me-1">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center text-muted small">
                    <span>📍 {movie.country}</span>
                    <span>⏱️ {movie.duration} min</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <Button 
                    variant="outline-primary"
                    size="sm"
                    className="mb-1"
                  >
                    <i className="bi bi-heart me-1"></i>
                    Add to Favourites
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    size="sm"
                  >
                    👁️ View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MovieCard;
