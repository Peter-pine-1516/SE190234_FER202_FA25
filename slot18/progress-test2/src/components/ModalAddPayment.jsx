import React, { useState } from "react";
import { Card, Form, Button, Alert, Modal } from "react-bootstrap";
import { useExpenseDispatch } from "../contexts/ExpenseContextContext";
import { useAuth } from "../contexts/AuthContext";

export const ModalAddExpense = ({ show, onHide }) => {
  const { createExpense } = useExpenseDispatch();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    courseName: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // Ngày hiện tại
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (
      !formData.semester ||
      !formData.courseName ||
      !formData.amount ||
      !formData.date
    ) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError("Số tiền phải là số dương!");
      return;
    }

    setIsSubmitting(true);

    try {
      const newPayment = {
        userId: user.id,
        semester: formData.semester,
        courseName: formData.courseName,
        amount: parseFloat(formData.amount),
        date: formData.date,
      };
      await createPayment(newPayment);
      alert("Thêm payment thành công!");
      onHide();
    } catch (err) {
      setError("Lỗi khi thêm payment: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      semester: "",
      courseName: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Card className="shadow-sm">
        <Card.Header
          as="h4"
          className="bg-primary text-white d-flex justify-content-between align-items-center"
        >
          <div>
            <i className="bi bi-plus-circle me-2"></i>
            Thêm Payment Mới
          </div>
          <Button variant="secondary" onClick={onHide}>
            <i className="bi bi-x-circle me-1"></i>
            Close
          </Button>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-calendar3 me-2"></i>
                Semester <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Ví dụ: Fall 2025"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-book me-2"></i>
                Course Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="Ví dụ: Web Development"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-currency-dollar me-2"></i>
                Amount (₫) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Ví dụ: 3500000"
                min="0"
                step="1000"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                <i className="bi bi-calendar-event me-2"></i>
                Date <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <i className="bi bi-x-circle me-1"></i>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-1"></i>
                    Thêm Payment
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Modal>
  );
};
