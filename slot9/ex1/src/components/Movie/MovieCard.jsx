import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { movies } from '../../data/movie';

const MovieCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [processingMovie, setProcessingMovie] = useState(null); // Track which movie is being processed
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Function to handle adding to favorites
  const handleAddToFavorites = (movie) => {
    // Prevent multiple clicks on the same movie
    if (processingMovie === movie.id) return;
    
    setProcessingMovie(movie.id);
    
    // Check if movie is already in favorites
    const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (isAlreadyFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(fav => fav.id !== movie.id);
      setFavorites(newFavorites);
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
    } else {
      // Add to favorites - double check for duplicates
      const movieExists = favorites.some(fav => fav.id === movie.id);
      if (!movieExists) {
        const newFavorites = [...favorites, movie];
        setFavorites(newFavorites);
        localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
        setShowToast(true);
      }
    }
    
    // Reset processing state after a short delay
    setTimeout(() => {
      setProcessingMovie(null);
    }, 500);
  };

  // Function to check if movie is in favorites
  const isMovieInFavorites = (movie) => {
    return favorites.some(fav => fav.id === movie.id);
  };

  // Function to handle viewing details
  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

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
                    variant={isMovieInFavorites(movie) ? "success" : "outline-primary"}
                    size="sm"
                    onClick={() => handleAddToFavorites(movie)}
                    disabled={processingMovie === movie.id}
                    className="mb-1"
                  >
                    {processingMovie === movie.id ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : isMovieInFavorites(movie) ? (
                      <>
                        <i className="bi bi-heart-fill me-1"></i>
                        Added to Favourites
                      </>
                    ) : (
                      <>
                        <i className="bi bi-heart me-1"></i>
                        Add to Favourites
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleViewDetails(movie)}
                  >
                    👁️ View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Movie Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <div className="row">
              <div className="col-md-4">
                <img 
                  src={process.env.PUBLIC_URL + selectedMovie.poster}
                  alt={`${selectedMovie.title} poster`}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-8">
                <h5 className="mb-3">Movie Details</h5>
                <p className="mb-3">{selectedMovie.description}</p>
                
                <div className="row mb-3">
                  <div className="col-6">
                    <strong>Year:</strong> {selectedMovie.year}
                  </div>
                  <div className="col-6">
                    <strong>Country:</strong> {selectedMovie.country}
                  </div>
                  <div className="col-6">
                    <strong>Duration:</strong> {selectedMovie.duration} minutes
                  </div>
                  <div className="col-6">
                    <strong>Genre:</strong>
                    <div className="mt-1">
                      {selectedMovie.genre.map((genre, index) => (
                        <Badge key={index} bg="primary" className="me-1">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <strong>Showtimes:</strong>
                  <div className="mt-2">
                    {selectedMovie.showtimes.map((showtime, index) => (
                      <Badge key={index} bg="success" className="me-2 mb-1">
                        {showtime}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {selectedMovie && (
            <Button 
              variant={isMovieInFavorites(selectedMovie) ? "success" : "outline-primary"}
              onClick={() => {
                handleAddToFavorites(selectedMovie);
                setShowModal(false);
              }}
              disabled={processingMovie === selectedMovie.id}
            >
              {processingMovie === selectedMovie.id ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : isMovieInFavorites(selectedMovie) ? (
                <>
                  <i className="bi bi-heart-fill me-1"></i>
                  Added to Favourites
                </>
              ) : (
                <>
                  <i className="bi bi-heart me-1"></i>
                  Add to Favourites
                </>
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer 
        position="top-center" 
        className="p-3"
        style={{ 
          position: 'fixed',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999
        }}
      >
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
          style={{
            minWidth: '300px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          <Toast.Header className="bg-success text-white">
            <strong className="me-auto">
              <i className="bi bi-check-circle-fill me-2"></i>
              Success!
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white bg-success">
            <div className="d-flex align-items-center">
              <i className="bi bi-heart-fill me-2" style={{ fontSize: '1.2rem' }}></i>
              Added to favourites!
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default MovieCard;
