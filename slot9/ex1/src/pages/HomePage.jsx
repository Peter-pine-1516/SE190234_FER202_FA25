// src/pages/HomePage.jsx
import React from "react";
import { Container } from "react-bootstrap";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movie";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      {/* Featured Movies Collections Section */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Featured Movies Collections</h2>
          <p className="text-muted fs-5">
            Discover our curated collection of the most popular and critically acclaimed movies.
          </p>
        </div>
        <MovieCard movies={movies} />
      </Container>
    </div>
  );
}

