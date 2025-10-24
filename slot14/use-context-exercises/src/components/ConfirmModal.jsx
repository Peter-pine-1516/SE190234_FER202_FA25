import React from 'react';

/**
 * ConfirmModal - Reusable confirmation modal component
 * 
 * Props:
 * @param {boolean} show - Show/hide modal
 * @param {function} onHide - Function called when closing modal
 * @param {function} onConfirm - Function called when confirming
 * @param {string} title - Modal title
 * @param {string} message - Message content
 * @param {string} confirmText - Text for confirm button (default: "Confirm")
 * @param {string} cancelText - Text for cancel button (default: "Cancel")
 * @param {string} variant - Variant for confirm button (default: "primary")
 * @param {boolean} loading - Loading state for confirm button
 */
function ConfirmModal({
    show,
    onHide,
    onConfirm,
    title = "Confirm",
    message = "Are you sure you want to perform this action?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "primary",
    loading = false
}) {
    if (!show) return null;

    // Handle confirm action
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        if (onHide) {
            onHide();
        }
    };

    // Styles
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    };

    const modalStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    };

    const headerStyle = {
        padding: '20px 20px 0 20px',
        borderBottom: '1px solid #eee',
        marginBottom: '20px'
    };

    const titleStyle = {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#333'
    };

    const bodyStyle = {
        padding: '0 20px',
        marginBottom: '20px'
    };

    const messageStyle = {
        margin: 0,
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.5'
    };

    const footerStyle = {
        padding: '0 20px 20px 20px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end'
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s'
    };

    const getButtonColor = (type) => {
        switch (type) {
            case 'primary':
                return '#007bff';
            case 'success':
                return '#28a745';
            case 'danger':
                return '#dc3545';
            case 'warning':
                return '#ffc107';
            default:
                return '#6c757d';
        }
    };

    return (
        <div style={overlayStyle} onClick={handleCancel}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h3 style={titleStyle}>{title}</h3>
                </div>
                
                <div style={bodyStyle}>
                    <p style={messageStyle}>{message}</p>
                </div>
                
                <div style={footerStyle}>
                    <button 
                        style={{
                            ...buttonStyle,
                            backgroundColor: '#6c757d',
                            color: '#fff'
                        }}
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>
                    
                    <button 
                        style={{
                            ...buttonStyle,
                            backgroundColor: loading ? '#6c757d' : getButtonColor(variant),
                            color: '#fff'
                        }}
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;