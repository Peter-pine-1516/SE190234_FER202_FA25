import React, { useState, useEffect } from 'react';

/**
 * ToastSignin - Reusable toast notification component
 * 
 * Props:
 * @param {boolean} show - Show/hide toast
 * @param {function} onClose - Function called when closing toast
 * @param {string} title - Toast title
 * @param {string} message - Message content
 * @param {string} variant - Toast variant (success, danger, warning, info)
 * @param {number} delay - Auto close delay (ms, default: 5000)
 */
function ToastSignin({
    show = false,
    onClose,
    title = "Notification",
    message = "",
    variant = "success",
    delay = 5000
}) {
    const [showToast, setShowToast] = useState(show);

    // Sync internal state with prop
    useEffect(() => {
        setShowToast(show);
    }, [show]);

    // Auto hide after delay
    useEffect(() => {
        if (showToast && delay > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [showToast, delay]);

    // Handle close
    const handleClose = () => {
        setShowToast(false);
        if (onClose) {
            onClose();
        }
    };

    // Get colors based on variant
    const getColors = () => {
        switch (variant) {
            case 'success':
                return {
                    bg: '#d4edda',
                    border: '#c3e6cb',
                    text: '#155724',
                    icon: '✓'
                };
            case 'danger':
                return {
                    bg: '#f8d7da',
                    border: '#f5c6cb',
                    text: '#721c24',
                    icon: '✕'
                };
            case 'warning':
                return {
                    bg: '#fff3cd',
                    border: '#ffeaa7',
                    text: '#856404',
                    icon: '⚠'
                };
            case 'info':
                return {
                    bg: '#d1ecf1',
                    border: '#bee5eb',
                    text: '#0c5460',
                    icon: 'ℹ'
                };
            default:
                return {
                    bg: '#e2e3e5',
                    border: '#d6d8db',
                    text: '#383d41',
                    icon: '📢'
                };
        }
    };

    if (!showToast) return null;

    const colors = getColors();

    const toastStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
        padding: '12px 16px',
        minWidth: '300px',
        maxWidth: '400px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1001,
        animation: 'slideIn 0.3s ease-out'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    };

    const titleStyle = {
        margin: 0,
        fontSize: '14px',
        fontWeight: '600',
        color: colors.text,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const messageStyle = {
        margin: 0,
        fontSize: '13px',
        color: colors.text,
        lineHeight: '1.4'
    };

    const closeButtonStyle = {
        background: 'none',
        border: 'none',
        color: colors.text,
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0',
        marginLeft: '10px'
    };

    return (
        <div style={toastStyle}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <span>{colors.icon}</span>
                    {title}
                </div>
                <button
                    style={closeButtonStyle}
                    onClick={handleClose}
                    title="Close"
                >
                    ×
                </button>
            </div>
            <div style={messageStyle}>
                {message}
            </div>
        </div>
    );
}

// Custom hook để sử dụng toast dễ dàng hơn
export const useToast = () => {
    const [toastConfig, setToastConfig] = useState({
        show: false,
        title: '',
        message: '',
        variant: 'success'
    });

    const showToast = (title, message, variant = 'success') => {
        setToastConfig({
            show: true,
            title,
            message,
            variant
        });
    };

    const hideToast = () => {
        setToastConfig(prev => ({
            ...prev,
            show: false
        }));
    };

    const ToastComponent = () => (
        <ToastSignin
            show={toastConfig.show}
            onClose={hideToast}
            title={toastConfig.title}
            message={toastConfig.message}
            variant={toastConfig.variant}
        />
    );

    return {
        showToast,
        hideToast,
        ToastComponent
    };
};

export default ToastSignin;