import React, { useState } from 'react';

const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const navigationItems = [
    { href: '#home', text: 'Home', isActive: true },
    { href: '#about', text: 'About Us', isActive: false },
    { href: '#contact', text: 'Contact', isActive: false }
  ];

  const SearchIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand fw-bold text-white" href="#home">
          Pizza House
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mainNavbar" 
          aria-controls="mainNavbar" 
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navigationItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a 
                  className={`nav-link ${item.isActive ? 'active' : ''} text-white`} 
                  href={item.href}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>

          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              style={{ backgroundColor: 'white' }}
            />
            <button className="btn btn-danger d-flex align-items-center" type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;