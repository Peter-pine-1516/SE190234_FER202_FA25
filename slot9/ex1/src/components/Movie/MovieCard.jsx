import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './MovieCard.css';

const MovieCard = ({ img, title, text, genre, year, country, duration, showtimes, id }) => {
  // Function to truncate description
  const truncateDescription = (description, maxLength = 100) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  // Handle Add to Favourites - Toggle (Thêm/Xóa) - KHÔNG DÙNG useState
  const handleAddToFavorites = (buttonElement) => {
    const movie = { id, img, title, text, genre, year, country, duration, showtimes };
    
    // Lấy dữ liệu từ localStorage
    let favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    
    // Kiểm tra xem phim đã có trong danh sách chưa
    const existsIndex = favorites.findIndex(fav => fav.id === id);
    
    if (existsIndex === -1) {
      // Thêm phim vào danh sách
      favorites.push(movie);
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
      
      // Cập nhật button trực tiếp (không cần useState)
      if (buttonElement) {
        buttonElement.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Added to Favourites';
        buttonElement.className = buttonElement.className.replace('outline-dark', 'success');
      }
      
      // Hiển thị thông báo đẹp hơn
      showCustomToast(`✓ Added "${title}" to favourites!`, 'success');
    } else {
      // Xóa phim khỏi danh sách
      favorites.splice(existsIndex, 1);
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
      
      // Cập nhật button về trạng thái ban đầu
      if (buttonElement) {
        buttonElement.innerHTML = '<i class="bi bi-heart me-1"></i>Add to Favourites';
        buttonElement.className = buttonElement.className.replace('success', 'outline-dark');
      }
      
      // Hiển thị thông báo
      showCustomToast(`Removed "${title}" from favourites`, 'info');
    }
  };

  // Kiểm tra phim có trong favourites không
  const isInFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    return favorites.some(fav => fav.id === id);
  };

  // Custom Toast notification (không dùng useState)
  const showCustomToast = (message, type = 'success') => {
    // Tạo element toast
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.textContent = message;
    
    // Thêm vào body
    document.body.appendChild(toast);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
      toast.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  // Handle View Details - Dùng React Bootstrap Modal KHÔNG DÙNG useState
  const handleViewDetails = () => {
    const movie = { id, img, title, text, genre, year, country, duration, showtimes };
    const modalId = `modal-${id}`;
    let modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
      // Tạo modal HTML
      const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content movie-modal-content">
              <div class="modal-header movie-modal-header">
                <h5 class="modal-title movie-modal-title">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-4">
                    <img src="${process.env.PUBLIC_URL || ''}${img}" 
                         alt="${title}" 
                         class="img-fluid rounded"
                         style="width: 100%; height: auto;">
                  </div>
                  <div class="col-md-8">
                    <h6 class="movie-modal-body h6">Movie Details</h6>
                    <p class="movie-modal-body p">${text}</p>
                    
                    <div class="row mb-3">
                      <div class="col-6">
                        <strong class="movie-modal-detail-label">Year:</strong> <span class="movie-modal-detail-value">${year}</span>
                      </div>
                      <div class="col-6">
                        <strong class="movie-modal-detail-label">Country:</strong> <span class="movie-modal-detail-value">${country}</span>
                      </div>
                      <div class="col-6 mt-2">
                        <strong class="movie-modal-detail-label">Duration:</strong> <span class="movie-modal-detail-value">${duration} minutes</span>
                      </div>
                      <div class="col-6 mt-2">
                        <strong class="movie-modal-detail-label">Genre:</strong>
                        <div class="mt-1">
                          ${Array.isArray(genre) ? genre.map(g => 
                            `<span class="badge bg-dark me-1">${g}</span>`
                          ).join('') : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <strong class="movie-modal-detail-label">Showtimes:</strong>
                      <div class="mt-2">
                        ${Array.isArray(showtimes) ? showtimes.map(showtime => 
                          `<span class="badge bg-success me-2 mb-1">${showtime}</span>`
                        ).join('') : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer movie-modal-footer">
                <button type="button" class="btn btn-secondary" id="close-btn-${id}">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Thêm modal vào body
      const div = document.createElement('div');
      div.innerHTML = modalHTML;
      document.body.appendChild(div.firstElementChild);
      modalElement = document.getElementById(modalId);
    }
    
    // Tạo backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.id = 'backdrop-' + id;
    document.body.appendChild(backdrop);
    
    // Handle close function
    const closeModal = () => {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
      document.body.classList.remove('modal-open');
      const backdropEl = document.getElementById('backdrop-' + id);
      if (backdropEl) {
        document.body.removeChild(backdropEl);
      }
    };
    
    // Bind close events
    const bindCloseEvents = () => {
      // Close on backdrop click
      backdrop.onclick = closeModal;
      
      // Close on X button click
      const closeBtn = modalElement.querySelector('.btn-close');
      if (closeBtn) {
        closeBtn.onclick = closeModal;
      }
      
      // Close on Close button click
      const footerCloseBtn = modalElement.querySelector('#close-btn-' + id);
      if (footerCloseBtn) {
        footerCloseBtn.onclick = closeModal;
      }
      
      // Close on ESC key
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      document.addEventListener('keydown', handleEscKey);
    };
    
    // Bind events first
    bindCloseEvents();
    
    // Then show modal
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
    document.body.classList.add('modal-open');
  };

  return (
    <Card className="h-100 shadow-sm border-0 movie-card">
      {/* Movie Poster */}
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={process.env.PUBLIC_URL + img}
          alt={`${title} poster`}
          className="movie-poster"
        />
        <div className="position-absolute top-0 end-0 m-2 year-badge-container">
          <Badge bg="secondary" className="text-white">
            {year}
          </Badge>
        </div>
      </div>
      
      {/* Card Body */}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 mb-2">
          {title}
        </Card.Title>
        
        <Card.Text className="mb-3 flex-grow-1 movie-description">
          {truncateDescription(text)}
        </Card.Text>
        
        {/* Movie Info */}
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-1 mb-2">
            {Array.isArray(genre) && genre.map((g, index) => (
              <Badge key={index} bg="dark" className="me-1">
                {g}
              </Badge>
            ))}
          </div>
          
          <div className="d-flex justify-content-between align-items-center small movie-info-text">
            <span>📍 {country}</span>
            <span>⏱️ {duration} min</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <Button 
            variant={isInFavorites() ? "success" : "outline-dark"}
            size="sm"
            className="mb-1"
            onClick={(e) => handleAddToFavorites(e.currentTarget)}
          >
            {isInFavorites() ? (
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
            variant="dark" 
            size="sm"
            onClick={() => handleViewDetails()}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
