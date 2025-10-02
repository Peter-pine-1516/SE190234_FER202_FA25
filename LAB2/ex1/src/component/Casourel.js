import React from 'react';

export default function Casourel() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active position-relative">
          <div 
            className="w-100" 
            style={{ 
              height: '600px', 
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/pic1.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100 position-absolute top-0 start-0 w-100">
            <h1 className="display-3 fw-bold text-white mb-3">Neapolitan Pizza</h1>
            <p className="lead text-white">If you are looking for a traditional Italian pizza, the Neapolitan is the best option!</p>
          </div>
        </div>
        
        <div className="carousel-item position-relative">
          <div 
            className="w-100" 
            style={{ 
              height: '600px', 
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/pic2.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100 position-absolute top-0 start-0 w-100">
            <h1 className="display-3 fw-bold text-white mb-3">Pepperoni Supreme</h1>
            <p className="lead text-white">Loaded with premium pepperoni and extra cheese on our signature crust</p>
          </div>
        </div>
        
        <div className="carousel-item position-relative">
          <div 
            className="w-100" 
            style={{ 
              height: '600px', 
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/pic3.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100 position-absolute top-0 start-0 w-100">
            <h1 className="display-3 fw-bold text-white mb-3">Vegetarian Delight</h1>
            <p className="lead text-white">Fresh vegetables and herbs for a healthy and delicious choice</p>
          </div>
        </div>
      </div>
      
      <button 
        className="carousel-control-prev" 
        type="button" 
        data-bs-target="#carouselExampleCaptions" 
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      
      <button 
        className="carousel-control-next" 
        type="button" 
        data-bs-target="#carouselExampleCaptions" 
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
