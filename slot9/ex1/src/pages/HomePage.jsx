// src/pages/HomePage.jsx
import React from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Filter from "../components/Filter/Filter";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movie";

export default function HomePage() {
  // Filter and search functions (without useState as per requirement)
  const [searchTerm, setSearchTerm] = React.useState("");
  const [yearFilter, setYearFilter] = React.useState("");
  const [sortOption, setSortOption] = React.useState("");

  // Filter movies based on search term
  const filterMovies = () => {
    let filtered = [...movies];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply year filter
    if (yearFilter) {
      if (yearFilter === "<=2000") {
        filtered = filtered.filter(movie => movie.year <= 2000);
      } else if (yearFilter === "2001-2015") {
        filtered = filtered.filter(movie => movie.year >= 2001 && movie.year <= 2015);
      } else if (yearFilter === ">2015") {
        filtered = filtered.filter(movie => movie.year > 2015);
      }
    }

    // Apply sorting
    if (sortOption) {
      if (sortOption === "year-asc") {
        filtered.sort((a, b) => a.year - b.year);
      } else if (sortOption === "year-desc") {
        filtered.sort((a, b) => b.year - a.year);
      } else if (sortOption === "title-asc") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === "title-desc") {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
      } else if (sortOption === "duration-asc") {
        filtered.sort((a, b) => a.duration - b.duration);
      } else if (sortOption === "duration-desc") {
        filtered.sort((a, b) => b.duration - a.duration);
      }
    }

    return filtered;
  };

  const filteredMovies = filterMovies();

  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Carousel */}
      <HomeCarousel />
      
      {/* Featured Movies Collections Section */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Featured Movies Collections</h2>
          <p className="text-muted fs-5">
            Discover our curated collection of the most popular and critically acclaimed movies.
          </p>
        </div>
        
        {/* Filter Component */}
        <Filter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        
        {/* Results Info */}
        {(searchTerm || yearFilter || sortOption) && (
          <Alert variant="info" className="mb-4">
            <i className="bi bi-info-circle me-2"></i>
            Found <strong>{filteredMovies.length}</strong> movie(s) matching your criteria.
            {searchTerm && ` Search: "${searchTerm}"`}
            {yearFilter && ` | Year: ${yearFilter}`}
            {sortOption && ` | Sorted by: ${sortOption}`}
          </Alert>
        )}
        
        {/* Movie Cards */}
        {filteredMovies.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredMovies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard 
                  key={movie.id}
                  id={movie.id}
                  img={movie.poster}
                  title={movie.title}
                  text={movie.description}
                  genre={movie.genre}
                  year={movie.year}
                  country={movie.country}
                  duration={movie.duration}
                  showtimes={movie.showtimes}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="warning" className="text-center">
            <i className="bi bi-exclamation-triangle me-2"></i>
            No movies found matching your criteria. Try adjusting your filters.
          </Alert>
        )}
      </Container>
    </div>
  );
}

