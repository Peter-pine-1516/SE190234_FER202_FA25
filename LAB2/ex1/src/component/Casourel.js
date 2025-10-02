import React from 'react';

const ImageCarousel = () => {
  const carouselSlides = [
    {
      id: 1,
      image: "/pic1.jpg",
      title: "Neapolitan Pizza",
      description: "If you are looking for a traditional Italian pizza, the Neapolitan is the best option!",
      isActive: true
    },
    {
      id: 2,
      image: "/pic2.jpg",
      title: "Pepperoni Supreme",
      description: "Loaded with premium pepperoni and extra cheese on our signature crust",
      isActive: false
    },
    {
      id: 3,
      image: "/pic3.jpg",
      title: "Vegetarian Delight",
      description: "Fresh vegetables and herbs for a healthy and delicious choice",
      isActive: false
    }
  ];

  const getBackgroundStyle = (imageUrl) => ({
    height: '600px',
    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  });

  const SlideItem = ({ slide }) => (
    <div className={`carousel-item ${slide.isActive ? 'active' : ''} position-relative`}>
      <div className="w-100" style={getBackgroundStyle(slide.image)}></div>
      <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100 position-absolute top-0 start-0 w-100">
        <h1 className="display-3 fw-bold text-white mb-3">{slide.title}</h1>
        <p className="lead text-white">{slide.description}</p>
      </div>
    </div>
  );

  const NavigationButton = ({ direction, target, slide }) => (
    <button 
      className={`carousel-control-${direction}`}
      type="button" 
      data-bs-target={target} 
      data-bs-slide={slide}
    >
      <span className={`carousel-control-${direction}-icon`} aria-hidden="true"></span>
      <span className="visually-hidden">{direction === 'prev' ? 'Previous' : 'Next'}</span>
    </button>
  );

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {carouselSlides.map((slide) => (
          <SlideItem key={slide.id} slide={slide} />
        ))}
      </div>
      
      <NavigationButton direction="prev" target="#carouselExampleCaptions" slide="prev" />
      <NavigationButton direction="next" target="#carouselExampleCaptions" slide="next" />
    </div>
  );
};

export default ImageCarousel;
