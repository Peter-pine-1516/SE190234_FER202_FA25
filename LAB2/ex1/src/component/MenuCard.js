import React from 'react';

const MenuSection = () => {
  const menuData = [
    {
      id: 1,
      name: "Margherita Pizza",
      originalPrice: "$40.00",
      salePrice: "$24.00",
      image: "/pic4.jpg",
      tag: "SALE"
    },
    {
      id: 2,
      name: "Mushroom Pizza",
      originalPrice: "$25.00",
      salePrice: null,
      image: "/pic5.jpg",
      tag: null
    },
    {
      id: 3,
      name: "Hawaiian Pizza",
      originalPrice: "$30.00",
      salePrice: null,
      image: "/pic1.jpg",
      tag: "NEW"
    },
    {
      id: 4,
      name: "Pesto Pizza",
      originalPrice: "$40.00",
      salePrice: "$30.00",
      image: "/pic2.jpg",
      tag: "SALE"
    }
  ];

  const MenuItemCard = ({ item }) => {
    const hasSalePrice = item.salePrice !== null;
    
    const PriceDisplay = () => {
      if (hasSalePrice) {
        return (
          <div className="mb-3">
            <span className="text-muted text-decoration-line-through me-2">
              {item.originalPrice}
            </span>
            <span className="h5 text-warning fw-bold">{item.salePrice}</span>
          </div>
        );
      }
      return (
        <div className="mb-3">
          <span className="h5 text-dark fw-bold">{item.originalPrice}</span>
        </div>
      );
    };

    const TagBadge = () => {
      if (!item.tag) return null;
      return (
        <span 
          className="position-absolute top-0 start-0 badge bg-warning text-dark fs-6 px-3 py-2"
          style={{ margin: '10px' }}
        >
          {item.tag}
        </span>
      );
    };

    return (
      <div className="col-lg-3 col-md-6">
        <div className="card h-100 bg-white border-0 shadow">
          <div className="position-relative">
            <img 
              src={item.image} 
              className="card-img-top" 
              alt={item.name}
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <TagBadge />
          </div>
          <div className="card-body d-flex flex-column text-center">
            <h5 className="card-title fw-bold text-dark mb-3">{item.name}</h5>
            <div className="mt-auto">
              <PriceDisplay />
              <button className="btn btn-dark btn-sm px-4">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-5 bg-dark" id="menu">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="display-4 fw-bold text-white">Our Menu</h2>
          </div>
        </div>
        
        <div className="row g-4">
          {menuData.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
