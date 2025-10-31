// src/pages/MovieManager.jsx
import React, { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { MovieProvider } from "../contexts/MovieContext";
import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";
import FilterBar from "../components/FilterBar";
import MovieDetailsPage from "./MovieDetailsPage";
import { useAuth } from "../contexts/AuthContext";

// Component con hiển thị nội dung, được bọc bởi Provider
const MovieManagerContent = () => {
    const [filteredMovies, setFilteredMovies] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { user } = useAuth();

    const isAdmin = user?.role === "admin";

    const handleFilterChange = (filtered) => {
        setFilteredMovies(filtered);
    };

    const handleViewDetails = (movie) => {
        setSelectedMovie(movie);
    };

    const handleBackToList = () => {
        setSelectedMovie(null);
    };

    return (
        <Container className="mt-5">
            {selectedMovie ? (
                <MovieDetailsPage movie={selectedMovie} onBack={handleBackToList} />
            ) : (
                <>
                    <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>

                    {!isAdmin && (
                        <Alert variant="info">
                            Bạn đang đăng nhập với quyền <strong>{user?.role || "user"}</strong>. Bạn chỉ có thể xem danh sách phim.
                        </Alert>
                    )}

                    <MovieForm isAdmin={isAdmin} />

                    <h2 className="mt-4">Danh sách Phim</h2>

                    <FilterBar onFilterChange={handleFilterChange} />

                    <MovieTable
                        filteredMovies={filteredMovies}
                        onViewDetails={handleViewDetails}
                        isAdmin={isAdmin}
                    />
                </>
            )}
        </Container>
    );
};

// Component chính cung cấp Context
const MovieManager = () => (
    <MovieProvider>
        <MovieManagerContent />
    </MovieProvider>
);

export default MovieManager;
