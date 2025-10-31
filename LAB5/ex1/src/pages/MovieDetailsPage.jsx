import React from "react";
import { Button, Row, Col, Image, Badge, Card } from "react-bootstrap";
import { useMovieState } from "../contexts/MovieContext";

const getCategoryBadgeVariant = (genreName) => {
  const categoryColors = {
    "Sci-Fi": "primary",
    Comedy: "warning",
    Drama: "info",
    Horror: "dark",
    Romance: "danger",
    Action: "success",
    Thriller: "secondary",
  };

  return categoryColors[genreName] || "secondary";
};

const MovieDetailsPage = ({ movie, onBack }) => {
  const { genres } = useMovieState();

  if (!movie) {
    return null;
  }

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const genreName = genreMap[movie.genreId] || "Unknown";

  return (
    <div className="movie-details-page">
      <Card className="shadow-sm border-0">
        <Row className="g-0">
          <Col md={4} className="p-4 border-end">
            <Image
              src={movie.avatar}
              alt={movie.title}
              fluid
              rounded
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col md={8} className="p-4">
            <h2 className="mb-3">{movie.title}</h2>
            <div className="mb-3 text-muted">{movie.description}</div>

            <Row className="mb-2">
              <Col xs={5} md={4} className="fw-semibold">
                ID
              </Col>
              <Col xs={7} md={8}>
                <Badge bg="secondary">#{movie.id}</Badge>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col xs={5} md={4} className="fw-semibold">
                Thể loại
              </Col>
              <Col xs={7} md={8}>
                <Badge bg={getCategoryBadgeVariant(genreName)}>
                  {genreName}
                </Badge>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col xs={5} md={4} className="fw-semibold">
                Năm sản xuất
              </Col>
              <Col xs={7} md={8}>{movie.year}</Col>
            </Row>

            <Row className="mb-2">
              <Col xs={5} md={4} className="fw-semibold">
                Quốc gia
              </Col>
              <Col xs={7} md={8}>{movie.country}</Col>
            </Row>

            <Row className="mb-4">
              <Col xs={5} md={4} className="fw-semibold">
                Thời lượng
              </Col>
              <Col xs={7} md={8}>{movie.duration} phút</Col>
            </Row>

            <Button variant="primary" onClick={onBack}>
              Back to list
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MovieDetailsPage;

