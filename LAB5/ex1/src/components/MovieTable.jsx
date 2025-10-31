// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = ({ filteredMovies, onViewDetails, isAdmin = false }) => {
  const state = useMovieState();
  // Lấy confirmDelete từ Context (chứa logic xóa phim)
  const { dispatch, confirmDelete } = useMovieDispatch();

  const { movies, genres, loading, movieToDelete, showDeleteModal } = state;
  
  // Sử dụng filteredMovies nếu có, ngược lại dùng movies từ state
  const displayMovies = filteredMovies !== null ? filteredMovies : movies;

  // Tạo genre map từ dữ liệu API
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
    if (!isAdmin) return;
    // Mở Modal Sửa và gán dữ liệu vào state
    dispatch({ type: "OPEN_EDIT_MODAL", payload: movie });
  };

  const handleDeleteClick = (movie) => {
    if (!isAdmin) return;
    // Mở Modal Xác nhận Xóa và gán phim vào movieToDelete
    dispatch({ type: "OPEN_DELETE_MODAL", payload: movie });
  };

  const handleViewDetails = (movie) => {
    if (typeof onViewDetails === 'function') {
      onViewDetails(movie);
    }
  };

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            className="me-2"
          />
          <Alert variant="info" className="mt-3">
            Đang tải dữ liệu phim...
          </Alert>
        </div>
      ) : displayMovies.length === 0 ? (
        <Alert variant="warning" className="mt-3">
          Không tìm thấy phim nào phù hợp với bộ lọc.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-4" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '10%', textAlign: 'center' }}>Avatar</th>
              <th style={{ width: '8%', textAlign: 'center' }}>ID</th>
              <th style={{ width: '25%' }}>Tên Phim</th>
              <th style={{ width: '12%', textAlign: 'center' }}>Danh mục</th>
              <th style={{ width: '12%', textAlign: 'center' }}>Thời lượng</th>
              <th style={{ width: '18%', textAlign: 'center' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {displayMovies.map((movie, index) => {
              const genreName = genreMap[movie.genreId] || "Unknown";
              return (
                <tr key={movie.id}>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Image
                      src={movie.avatar}
                      alt={movie.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      rounded
                    />
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <strong>#{movie.id}</strong>
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={movie.title}>
                      <strong>{movie.title}</strong>
                    </div>
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {genreName}
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {movie.duration} phút
                  </td>

                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <div className="d-flex flex-column gap-1" style={{ minWidth: '110px', alignItems: 'stretch' }}>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewDetails(movie)}
                        style={{ width: '100%', fontSize: '0.875rem', padding: '0.375rem 0.5rem' }}
                      >
                        View Details
                      </Button>
                      {isAdmin && (
                        <div className="d-flex gap-1">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleEditClick(movie)}
                            style={{ flex: 1, fontSize: '0.875rem', padding: '0.375rem 0.5rem' }}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(movie)}
                            style={{ flex: 1, fontSize: '0.875rem', padding: '0.375rem 0.5rem' }}
                          >
                            Xóa
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal
        show={showDeleteModal}
        onHide={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim **"{movieToDelete?.title}"** (ID:{" "}
          {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="danger"
            onClick={() => confirmDelete(movieToDelete.id)}
          >
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
