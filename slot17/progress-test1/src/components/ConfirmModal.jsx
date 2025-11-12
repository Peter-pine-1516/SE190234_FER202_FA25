//ConfirmModal.jsx được dùng để hiển thị một modal xác nhận hành động
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
