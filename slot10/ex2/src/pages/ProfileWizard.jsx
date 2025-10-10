import React, { useState } from 'react';
import { Modal, Button, Nav, ProgressBar, Form } from 'react-bootstrap';
import AboutForm from '../components/AboutForm';
import AccountForm from '../components/AccountForm';
import AddressForm from '../components/AddressForm';
import { 
  validateAboutStep, 
  validateAccountStep, 
  validateAddressStep,
  hasStepErrors 
} from '../utils/validation';

// Component ProfileWizard - Trang chính gộp 3 forms lại
// Sử dụng Modal, Button, Nav, ProgressBar của React Bootstrap
const ProfileWizard = () => {
  // State để quản lý wizard
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    about: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      avatar: ''
    },
    account: {
      username: '',
      password: '',
      confirmPassword: '',
      secretQuestion: '',
      answer: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    about: {},
    account: {},
    address: {}
  });

  // Wizard steps configuration
  const wizardSteps = [
    { id: 'about', title: 'About', icon: '👤' },
    { id: 'account', title: 'Account', icon: '🔒' },
    { id: 'address', title: 'Address', icon: '📍' }
  ];

  // Validate current step using imported validation functions
  const validateCurrentStep = () => {
    let stepErrors = {};
    
    switch (currentStep) {
      case 0:
        stepErrors = validateAboutStep(formData);
        break;
      case 1:
        stepErrors = validateAccountStep(formData);
        break;
      case 2:
        stepErrors = validateAddressStep(formData);
        break;
      default:
        break;
    }

    const stepKey = ['about', 'account', 'address'][currentStep];
    setErrors(prev => ({
      ...prev,
      [stepKey]: stepErrors
    }));

    return !hasStepErrors(stepErrors);
  };

  // Handler functions
  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };
  
  const handleFieldChange = (fieldName, value) => {
    const stepKey = ['about', 'account', 'address'][currentStep];
    setFormData(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [fieldName]: value
      }
    }));
  };
  
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < wizardSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const handleFinish = () => {
    if (validateCurrentStep()) {
      console.log('Form completed!', formData);
      alert('Profile completed successfully!');
    }
  };

  // Render current form based on step
  const renderCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <AboutForm 
            data={formData.about}
            onChange={handleFieldChange}
            errors={errors.about}
          />
        );
      case 1:
        return (
          <AccountForm 
            data={formData.account}
            onChange={handleFieldChange}
            showPassword={showPassword}
            togglePassword={togglePassword}
            errors={errors.account}
          />
        );
      case 2:
        return (
          <AddressForm 
            data={formData.address}
            onChange={handleFieldChange}
            errors={errors.address}
          />
        );
      default:
        return null;
    }
  };

  // Calculate progress percentage
  const progress = ((currentStep + 1) / wizardSteps.length) * 100;

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Modal
        show={true}
        size="lg"
        centered
        backdrop="static"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <Modal.Body style={{ 
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}>
          {/* Header với title và close button */}
          <Modal.Header 
            closeButton={false}
            style={{ 
              border: 'none',
              paddingBottom: '10px',
              backgroundColor: '#fff'
            }}
          >
            <Modal.Title style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <span style={{ 
                marginRight: '10px',
                fontSize: '1.2rem',
                color: '#007bff'
              }}>
                👤
              </span>
              Build Your Profile
            </Modal.Title>
          </Modal.Header>
          
          {/* Progress bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '5px'
            }}>
              <span style={{ 
                fontSize: '0.9rem',
                color: '#6c757d',
                fontWeight: 'bold'
              }}>
                {Math.round(progress)}%
              </span>
            </div>
            <ProgressBar 
              now={progress} 
              style={{ 
                height: '8px',
                borderRadius: '4px',
                backgroundColor: '#e9ecef'
              }}
              variant="primary"
            />
          </div>
          
          {/* Navigation tabs */}
          <Nav 
            variant="tabs" 
            style={{ 
              borderBottom: '1px solid #dee2e6',
              marginBottom: '20px'
            }}
          >
            {wizardSteps.map((step, index) => (
              <Nav.Item key={step.id}>
                <Nav.Link
                  eventKey={step.id}
                  active={index === currentStep}
                  onClick={() => handleStepChange(index)}
                  style={{
                    border: 'none',
                    borderBottom: index === currentStep ? '3px solid #007bff' : 'none',
                    color: index === currentStep ? '#007bff' : '#6c757d',
                    fontWeight: index === currentStep ? 'bold' : 'normal',
                    padding: '10px 20px',
                    backgroundColor: 'transparent'
                  }}
                >
                  {step.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          
          {/* Form content */}
          <Form style={{ marginBottom: '30px' }}>
            {renderCurrentForm()}
          </Form>
          
          {/* Action buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: '10px'
          }}>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              style={{
                padding: '8px 20px',
                borderRadius: '4px'
              }}
            >
              Previous
            </Button>
            
            {currentStep < wizardSteps.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                style={{
                  padding: '8px 20px',
                  borderRadius: '4px',
                  backgroundColor: '#007bff',
                  borderColor: '#007bff'
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleFinish}
                style={{
                  padding: '8px 20px',
                  borderRadius: '4px',
                  backgroundColor: '#28a745',
                  borderColor: '#28a745'
                }}
              >
                Finish
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileWizard;
