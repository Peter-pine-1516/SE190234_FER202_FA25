import React from "react";
import { Carousel, Badge } from "react-bootstrap";
import { carouselMovies } from "../../data/carousel";

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
            className="d-block w-100"
            src={process.env.PUBLIC_URL + m.poster}
            alt={m.title}
            style={{ 
              height: "35vh", 
              minHeight: 750,
              objectFit: "cover",
              objectPosition: "center center"
            }}
          />
          <Carousel.Caption
            className="text-start"
            style={{
              background: "rgba(0,0,0,0.6)",
              borderRadius: 12,
              padding: "1rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <h3 className="mb-2">
              {m.title}{" "}
              <Badge bg="info" className="text-dark">{m.genre}</Badge>{" "}
              <Badge bg="secondary">{m.year}</Badge>
            </h3>
            <p className="mb-0" style={{ fontSize: "0.9rem" }}>
              {m.description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
