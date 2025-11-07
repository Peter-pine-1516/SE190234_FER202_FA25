// src/components/MovieForm.jsx
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Modal, Image, Alert } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';
import movieApi from "../api/movieAPI";

// Component con tái sử dụng cho các trường input
const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview, genres, errors = {}, validated = false, actionElement = null }) => {
    const previewSrc = imagePreview || currentMovie.avatar;

    return (
        <>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="formAvatar">
                        <Form.Label>Ảnh Avatar Phim</Form.Label>
                        <Form.Control
                            type="file"
                            name="avatarFile"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mb-2"
                        />
                        <Form.Control
                            type="text"
                            name="avatar"
                            value={currentMovie.avatar || ''}
                            onChange={handleInputChange}
                            placeholder="Hoặc nhập URL hình ảnh"
                            isInvalid={validated && errors.avatar}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.avatar}
                        </Form.Control.Feedback>
                        {previewSrc && (
                            <div className="mt-2">
                                <Image
                                    src={previewSrc}
                                    alt="Preview"
                                    thumbnail
                                    style={{ maxWidth: '150px', maxHeight: '100px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>
                            Tên Phim <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={currentMovie.title || ''}
                            onChange={handleInputChange}
                            placeholder="Tên phim"
                            required
                            isInvalid={validated && errors.title}
                            isValid={validated && !errors.title && currentMovie.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <Form.Group controlId="formDescription">
                        <Form.Label>
                            Mô tả <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="description"
                            value={currentMovie.description || ''}
                            onChange={handleInputChange}
                            placeholder="Mô tả phim"
                            required
                            isInvalid={validated && errors.description}
                            isValid={validated && !errors.description && currentMovie.description}
                            style={{ resize: 'vertical' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3 align-items-end">
                <Col md={3}>
                    <Form.Group controlId="formGenre">
                        <Form.Label>
                            Thể loại <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                            name="genreId"
                            value={currentMovie.genreId || ''}
                            onChange={handleInputChange}
                            required
                            isInvalid={validated && errors.genreId}
                            isValid={validated && !errors.genreId && currentMovie.genreId}
                        >
                            <option value="">Chọn thể loại</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.genreId}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group controlId="formDuration">
                        <Form.Label>
                            Thời lượng (phút) <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="duration"
                            value={currentMovie.duration || ''}
                            onChange={handleInputChange}
                            placeholder="Phút"
                            required
                            min="1"
                            max="600"
                            isInvalid={validated && errors.duration}
                            isValid={validated && !errors.duration && currentMovie.duration}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.duration}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group controlId="formYear">
                        <Form.Label>
                            Năm <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={currentMovie.year || ''}
                            onChange={handleInputChange}
                            placeholder="Năm"
                            required
                            min="1900"
                            max="2030"
                            isInvalid={validated && errors.year}
                            isValid={validated && !errors.year && currentMovie.year}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.year}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group controlId="formCountry">
                        <Form.Label>
                            Quốc gia <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={currentMovie.country || ''}
                            onChange={handleInputChange}
                            placeholder="Quốc gia"
                            required
                            isInvalid={validated && errors.country}
                            isValid={validated && !errors.country && currentMovie.country}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                {actionElement && (
                    <Col md={2} className="d-flex">
                        {actionElement}
                    </Col>
                )}
            </Row>
        </>
    );
};

const MovieForm = ({ isAdmin = false }) => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal, genres } = state;
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [pendingImageDataUrl, setPendingImageDataUrl] = useState(null);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showEditModal) {
      setImagePreview(currentMovie?.avatar || "");
      setSelectedFile(null);
      setPendingImageDataUrl(null);
    }
  }, [showEditModal, currentMovie?.avatar]);

  if (!isAdmin) {
    return (
      <Container className="p-3 mb-4 border rounded" style={{ maxWidth: '100%' }}>
        <h5 className="mb-3">📽️ Thêm Phim Mới</h5>
        <Alert variant="secondary" className="mb-0">
          Chỉ tài khoản <strong>admin</strong> mới có quyền thêm hoặc chỉnh sửa phim.
        </Alert>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value } });

    if (name === "avatar") {
      setSelectedFile(null);
      setPendingImageDataUrl(null);
      setImagePreview(value);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Tạo URL preview cho ảnh
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        setPendingImageDataUrl(imageUrl);
      };
      reader.readAsDataURL(file);

      if (errors.avatar) {
        setErrors((prev) => ({ ...prev, avatar: "" }));
      }
    }
  };

  const handleCloseEditModal = () => {
    dispatch({ type: "CLOSE_EDIT_MODAL" });
    setImagePreview(""); // Reset preview khi đóng modal
    setSelectedFile(null);
    setPendingImageDataUrl(null);
    setValidated(false);
    setErrors({});
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!currentMovie.title?.trim()) {
      newErrors.title = "Tên phim không được để trống";
    } else if (currentMovie.title.length < 2) {
      newErrors.title = "Tên phim phải có ít nhất 2 ký tự";
    }

    if (!currentMovie.description?.trim()) {
      newErrors.description = "Mô tả không được để trống";
    } else if (currentMovie.description.length < 10) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự";
    }

    if (!currentMovie.genreId) {
      newErrors.genreId = "Vui lòng chọn thể loại";
    }

    if (!currentMovie.duration) {
      newErrors.duration = "Thời lượng không được để trống";
    } else if (currentMovie.duration < 1 || currentMovie.duration > 600) {
      newErrors.duration = "Thời lượng phải từ 1 đến 600 phút";
    }

    if (!currentMovie.year) {
      newErrors.year = "Năm không được để trống";
    } else if (currentMovie.year < 1900 || currentMovie.year > 2030) {
      newErrors.year = "Năm phải từ 1900 đến 2030";
    }

    if (!currentMovie.country?.trim()) {
      newErrors.country = "Quốc gia không được để trống";
    }

    if (!currentMovie.avatar?.trim() && !selectedFile) {
      newErrors.avatar = "Vui lòng chọn ảnh hoặc nhập URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadSelectedImage = async () => {
    if (!selectedFile || !pendingImageDataUrl) {
      return currentMovie.avatar?.trim() || "";
    }

    try {
      const titleFallback = currentMovie.title || selectedFile.name || "movie";
      const response = await movieApi.post("/images", {
        fileName: selectedFile.name,
        dataUrl: pendingImageDataUrl,
        title: titleFallback,
      });

      const uploadedPath = response?.data?.path;
      if (!uploadedPath) {
        throw new Error("Upload response missing path");
      }

      return uploadedPath;
    } catch (error) {
      console.error("Lỗi tải ảnh lên:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Chuẩn hóa dữ liệu trước khi gửi đi
    let avatarPath = currentMovie.avatar?.trim() || "";

    if (selectedFile) {
      try {
        avatarPath = await uploadSelectedImage();
        dispatch({
          type: "UPDATE_FIELD",
          payload: { name: "avatar", value: avatarPath },
        });
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Không thể tải ảnh lên máy chủ. Vui lòng thử lại.",
        }));
        return;
      }
    }

    if (!avatarPath.trim()) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Vui lòng chọn ảnh hoặc nhập URL",
      }));
      return;
    }

    const dataToSend = {
      ...currentMovie,
      avatar: avatarPath,
      duration: parseInt(currentMovie.duration || 0),
      year: parseInt(currentMovie.year || 0),
      genreId: parseInt(currentMovie.genreId || 1),
    };

    // Gọi hàm CRUD từ Context
    const success = await handleCreateOrUpdate(
      dataToSend,
      isEditing !== null,
      isEditing
    );

    // Reset form nếu thành công
    if (success) {
      if (isEditing === null) {
        // Reset form khi thêm mới thành công
        setImagePreview("");
        setSelectedFile(null);
        setPendingImageDataUrl(null);
        setValidated(false);
        setErrors({});
      } else {
        // Đóng modal khi sửa thành công
        handleCloseEditModal();
      }
    }
  };

  // Logic cho Form Thêm mới (khi isEditing là null)
  const isCreating = isEditing === null;
  const createFormProps = {
    currentMovie: isCreating ? currentMovie : initialMovieState.currentMovie,
    handleInputChange: isCreating ? handleInputChange : () => {},
    handleFileChange: isCreating ? handleFileChange : () => {},
    imagePreview: isCreating ? imagePreview : imagePreview || currentMovie.avatar,
    genres: genres,
    errors: isCreating ? errors : {},
    validated: isCreating ? validated : false,
  };

  if (isCreating) {
    createFormProps.actionElement = (
      <Button variant="success" type="submit" className="w-100">
        ➕ Thêm Phim
      </Button>
    );
  }

  return (
    <>
      {/* FORM THÊM MỚI (Luôn hiển thị) */}
      <Container className="p-3 mb-4 border rounded" style={{ maxWidth: '100%' }}>
        <h5 className="mb-3">📽️ Thêm Phim Mới</h5>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <MovieFields {...createFormProps} />
        </Form>
      </Container>

      {/* MODAL CHỈNH SỬA (Chỉ hiện khi showEditModal là true) */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={imagePreview || currentMovie.avatar}
              genres={genres}
              errors={errors}
              validated={validated}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Hủy
            </Button>
            <Button variant="warning" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;

