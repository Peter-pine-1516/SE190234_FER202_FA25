//UserTable.jsx hiển thị danh sách users dưới dạng bảng
import React, { useState } from 'react';
import { Table, Button, Badge, Modal, Alert } from 'react-bootstrap';
import { FiAlertCircle } from 'react-icons/fi';
import ConfirmModal from './ConfirmModal';
import { useAuth } from '../contexts/AuthContext';
import { useAppDispatch } from '../store/hooks';
import { toggleAdminStatus, updateUserStatus } from '../features/users/usersSlice';
import './css/UserTable.css';

const UserTable = ({ filteredUsers }) => {
    // Lấy thông tin user hiện tại
    const { user: currentUser } = useAuth();
    const dispatch = useAppDispatch();
    
    // State for modals
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showBanModal, setShowBanModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const handleBanClick = (user) => {
        // Validation: Không được ban chính mình
        if (currentUser && currentUser.id === user.id) {
            setErrorMessage('Bạn không thể khóa hoặc mở khóa tài khoản của chính mình!');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return;
        }
        
        setSelectedUser(user);
        setShowBanModal(true);
    };

    const handleConfirmBan = async () => {
        if (selectedUser) {
            // Validation: Kiểm tra lại để đảm bảo không ban chính mình
            if (currentUser && currentUser.id === selectedUser.id) {
                setErrorMessage('Bạn không thể khóa hoặc mở khóa tài khoản của chính mình!');
                setShowBanModal(false);
                setSelectedUser(null);
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
                return;
            }
            
            try {
                const newStatus = selectedUser.status === 'active' ? 'blocked' : 'active';
                await dispatch(updateUserStatus({
                    id: selectedUser.id,
                    userData: {
                        ...selectedUser,
                        status: newStatus,
                    },
                })).unwrap();
                
                setShowBanModal(false);
                setSelectedUser(null);
            } catch (error) {
                setErrorMessage('Không thể cập nhật trạng thái user: ' + error.message);
                setShowBanModal(false);
                setSelectedUser(null);
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            }
        }
    };

    const handleCancelBan = () => {
        setShowBanModal(false);
        setSelectedUser(null);
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedUser(null);
    };

    // Get status badge variant
    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <Badge bg="success">Active</Badge>;
            case 'blocked':
                return <Badge bg="danger">Blocked</Badge>;
            case 'locked':
                return <Badge bg="warning">Locked</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    // Get role badge variant
    const getRoleBadge = (role) => {
        return role === 'admin' 
            ? <Badge bg="primary">Admin</Badge>
            : <Badge bg="info">User</Badge>;
    };

    if (filteredUsers.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">Không tìm thấy user nào.</p>
            </div>
        );
    }

    return (
        <>
            {/* Hiển thị thông báo lỗi nếu có */}
            {errorMessage && (
                <Alert 
                    variant="danger" 
                    className="mb-3 d-flex align-items-center error-alert" 
                    onClose={() => setErrorMessage('')}
                    dismissible
                >
                    <FiAlertCircle className="me-2" size={20} />
                    <span>{errorMessage}</span>
                </Alert>
            )}
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{getRoleBadge(user.role)}</td>
                            <td>{getStatusBadge(user.status)}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleViewDetails(user)}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => dispatch(toggleAdminStatus(user.id))}
                                    disabled={currentUser && currentUser.id === user.id}
                                    title={currentUser && currentUser.id === user.id ? 'Bạn không thể thay đổi quyền của chính mình' : ''}
                                >
                                    Toggle Admin
                                </Button>
                                <Button
                                    variant={user.status === 'active' ? 'danger' : 'success'}
                                    size="sm"
                                    onClick={() => handleBanClick(user)}
                                    disabled={currentUser && currentUser.id === user.id}
                                    title={currentUser && currentUser.id === user.id ? 'Bạn không thể ban chính mình' : ''}
                                >
                                    {user.status === 'active' ? 'Ban Account' : 'Unban Account'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* User Details Modal */}
            <Modal show={showDetailsModal} onHide={handleCloseDetails} centered>
                <Modal.Header closeButton className="user-details-modal-header">
                    <Modal.Title className="user-details-modal-title">User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="user-details-modal-body">
                    {selectedUser && (
                        <div>
                            {/* Avatar ở trên cùng, căn giữa */}
                            <div className="text-center mb-4 user-details-avatar-section">
                                {selectedUser.avatar ? (
                                    <img 
                                        src={selectedUser.avatar} 
                                        alt={selectedUser.username}
                                        className="user-details-avatar-img"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/100?text=' + selectedUser.username.charAt(0).toUpperCase();
                                        }}
                                    />
                                ) : (
                                    <div className="user-details-avatar-placeholder">
                                        {selectedUser.username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 user-details-field">
                                <p className="mb-2"><strong>Username:</strong> {selectedUser.username}</p>
                            </div>
                            <div className="mb-3 user-details-field">
                                <p className="mb-2"><strong>Full Name:</strong> {selectedUser.fullName}</p>
                            </div>
                            <div className="mb-3 user-details-field">
                                <p className="mb-2"><strong>ID:</strong> {selectedUser.id}</p>
                            </div>
                            <div className="mb-3 user-details-field">
                                <p className="mb-2"><strong>Role:</strong> {getRoleBadge(selectedUser.role)}</p>
                            </div>
                            <div className="mb-3 user-details-field">
                                <p className="mb-2"><strong>Status:</strong> {getStatusBadge(selectedUser.status)}</p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="user-details-modal-footer">
                    <Button variant="secondary" onClick={handleCloseDetails} className="user-details-close-btn">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Ban Account Confirmation Modal */}
            <ConfirmModal
                show={showBanModal}
                title={selectedUser?.status === 'active' ? "Xác nhận khóa tài khoản" : "Xác nhận mở khóa tài khoản"}
                message={
                    selectedUser?.status === 'active'
                        ? `Bạn có chắc chắn muốn khóa tài khoản của user "${selectedUser?.username}" (${selectedUser?.fullName})?`
                        : `Bạn có chắc chắn muốn mở khóa tài khoản của user "${selectedUser?.username}" (${selectedUser?.fullName})?`
                }
                onConfirm={handleConfirmBan}
                onCancel={handleCancelBan}
            />
        </>
    );
};

export default UserTable;

