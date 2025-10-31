// src/components/FilterBar.jsx
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useMovieState } from '../contexts/MovieContext';

function FilterBar({ onFilterChange }) {
    const { movies, genres } = useMovieState();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [durationFilter, setDurationFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // Tạo genre map
    const genreMap = genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
    }, {});

    // Xử lý thay đổi filter
    useEffect(() => {
        let filtered = [...movies];

        // Tìm kiếm theo tên phim
        if (searchTerm.trim()) {
            filtered = filtered.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo thể loại
        if (selectedGenre) {
            filtered = filtered.filter(movie => 
                movie.genreId.toString() === selectedGenre
            );
        }

        // Lọc theo thời lượng
        if (durationFilter) {
            const duration = parseInt(durationFilter);
            switch (durationFilter) {
                case '60':
                    filtered = filtered.filter(movie => movie.duration <= 60);
                    break;
                case '90':
                    filtered = filtered.filter(movie => movie.duration > 60 && movie.duration <= 90);
                    break;
                case '120':
                    filtered = filtered.filter(movie => movie.duration > 90 && movie.duration <= 120);
                    break;
                case '120+':
                    filtered = filtered.filter(movie => movie.duration > 120);
                    break;
                default:
                    break;
            }
        }

        // Sắp xếp theo tên phim
        if (sortOrder) {
            filtered.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                if (sortOrder === 'asc') {
                    return titleA.localeCompare(titleB);
                } else if (sortOrder === 'desc') {
                    return titleB.localeCompare(titleA);
                }
                return 0;
            });
        }

        // Gọi callback với danh sách đã lọc
        if (onFilterChange) {
            onFilterChange(filtered);
        }
    }, [movies, searchTerm, selectedGenre, durationFilter, sortOrder, onFilterChange]);

    // Reset filters
    const handleReset = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setDurationFilter('');
        setSortOrder('');
    };

    return (
        <div className="mb-4 p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h5 className="mb-3">🔍 Tìm kiếm & Lọc phim</h5>
            <Form>
                <Row className="g-3">
                    {/* Tìm kiếm */}
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Tìm kiếm phim</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên phim..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    {/* Lọc theo thể loại */}
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Thể loại</Form.Label>
                            <Form.Select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Lọc theo thời lượng */}
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Thời lượng</Form.Label>
                            <Form.Select
                                value={durationFilter}
                                onChange={(e) => setDurationFilter(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                <option value="60">≤ 60 phút</option>
                                <option value="90">61-90 phút</option>
                                <option value="120">91-120 phút</option>
                                <option value="120+">> 120 phút</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Sắp xếp */}
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Sắp xếp</Form.Label>
                            <Form.Select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="">Mặc định</option>
                                <option value="asc">Tên A-Z</option>
                                <option value="desc">Tên Z-A</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Reset button */}
                    <Col md={1} className="d-flex align-items-end">
                        <Button
                            variant="secondary"
                            onClick={handleReset}
                            className="w-100"
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default FilterBar;

