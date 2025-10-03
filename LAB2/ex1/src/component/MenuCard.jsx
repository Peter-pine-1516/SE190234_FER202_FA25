import React from 'react';

function MenuCard() {
  return (
    <section className="py-5 bg-dark" id="menu">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="display-4 fw-bold text-white">Our Menu</h2>
          </div>
        </div>
        
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="card h-100 bg-white border-0 shadow">
              <div className="position-relative">
                <img 
                  src="/pic4.jpg" 
                  className="card-img-top" 
                  alt="Margherita Pizza"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <span 
                  className="position-absolute top-0 start-0 badge bg-warning text-dark fs-6 px-3 py-2"
                  style={{ margin: '10px' }}
                >
                  SALE
                </span>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title fw-bold text-dark mb-3">Margherita Pizza</h5>
                <div className="mt-auto">
                  <div className="mb-3">
                    <span className="text-muted text-decoration-line-through me-2">$40.00</span>
                    <span className="h5 text-warning fw-bold">$24.00</span>
                  </div>
                  <button className="btn btn-dark btn-sm px-4">Buy</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card h-100 bg-white border-0 shadow">
              <div className="position-relative">
                <img 
                  src="/pic5.jpg" 
                  className="card-img-top" 
                  alt="Mushroom Pizza"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title fw-bold text-dark mb-3">Mushroom Pizza</h5>
                <div className="mt-auto">
                  <div className="mb-3">
                    <span className="h5 text-dark fw-bold">$25.00</span>
                  </div>
                  <button className="btn btn-dark btn-sm px-4">Buy</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card h-100 bg-white border-0 shadow">
              <div className="position-relative">
                <img 
                  src="/pic1.jpg" 
                  className="card-img-top" 
                  alt="Hawaiian Pizza"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <span 
                  className="position-absolute top-0 start-0 badge bg-warning text-dark fs-6 px-3 py-2"
                  style={{ margin: '10px' }}
                >
                  NEW
                </span>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title fw-bold text-dark mb-3">Hawaiian Pizza</h5>
                <div className="mt-auto">
                  <div className="mb-3">
                    <span className="h5 text-dark fw-bold">$30.00</span>
                  </div>
                  <button className="btn btn-dark btn-sm px-4">Buy</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card h-100 bg-white border-0 shadow">
              <div className="position-relative">
                <img 
                  src="/pic2.jpg" 
                  className="card-img-top" 
                  alt="Pesto Pizza"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <span 
                  className="position-absolute top-0 start-0 badge bg-warning text-dark fs-6 px-3 py-2"
                  style={{ margin: '10px' }}
                >
                  SALE
                </span>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title fw-bold text-dark mb-3">Pesto Pizza</h5>
                <div className="mt-auto">
                  <div className="mb-3">
                    <span className="text-muted text-decoration-line-through me-2">$40.00</span>
                    <span className="h5 text-warning fw-bold">$30.00</span>
                  </div>
                  <button className="btn btn-dark btn-sm px-4">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuCard;
