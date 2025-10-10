import React from "react";
import { Carousel, Badge } from "react-bootstrap";
import { carouselMovies } from "../../data/carousel";
import './HomeCarousel.css';

export default function HomeCarousel() {
  // Nếu mảng rỗng, không render để tránh lỗi
  if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;

  return (
    <Carousel 
      interval={3000} 
      indicators={true}
      controls={true}
    >
      {carouselMovies.map((m) => (
        <Carousel.Item key={m.id}>
          <img
            className="d-block w-100 carousel-image"
            src={process.env.PUBLIC_URL + m.poster}
            alt={m.title}
          />
          <Carousel.Caption className="text-start carousel-caption">
            <h3 className="mb-2">
              {m.title}{" "}
              <Badge bg="info" className="text-dark">{m.genre}</Badge>{" "}
              <Badge bg="secondary">{m.year}</Badge>
            </h3>
            <p className="mb-0 carousel-description">
              {m.description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
