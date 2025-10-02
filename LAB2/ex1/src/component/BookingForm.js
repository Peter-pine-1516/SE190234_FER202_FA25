import React, { useState } from 'react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    comment: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Form submission logic would go here
  };

  const serviceOptions = [
    { value: '', label: 'Select a Service', disabled: true },
    { value: 'Dine In', label: 'Dine In' },
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Take Away', label: 'Take Away' }
  ];

  const FormField = ({ type, placeholder, required, className, value, onChange, children }) => {
    const commonProps = {
      className,
      style: { backgroundColor: 'white' },
      value,
      onChange: (e) => onChange(e.target.value)
    };

    if (type === 'select') {
      return (
        <select {...commonProps} required={required}>
          {children}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea 
          {...commonProps}
          rows="6"
          placeholder={placeholder}
          required={required}
        />
      );
    }

    return (
      <input 
        type={type}
        placeholder={placeholder}
        required={required}
        {...commonProps}
      />
    );
  };

  const FormRow = ({ children }) => (
    <div className="row g-3 mb-3">
      {children}
    </div>
  );

  const FormColumn = ({ children, size = "col-md-4" }) => (
    <div className={size}>
      {children}
    </div>
  );

  return (
    <section className="booking bg-dark py-5" id="booking">
      <div className="container text-center">
        <h2 className="text-white mb-4 display-4 fw-bold">Book Your Table</h2>
        
        <form 
          className="mx-auto" 
          style={{ maxWidth: '800px' }} 
          onSubmit={handleFormSubmit}
        >
          <FormRow>
            <FormColumn>
              <FormField
                type="text"
                placeholder="Your Name *"
                required={true}
                className="form-control"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
              />
            </FormColumn>
            <FormColumn>
              <FormField
                type="email"
                placeholder="Your Email *"
                required={true}
                className="form-control"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
              />
            </FormColumn>
            <FormColumn>
              <FormField
                type="select"
                required={true}
                className="form-select"
                value={formData.service}
                onChange={(value) => handleInputChange('service', value)}
              >
                {serviceOptions.map((option, index) => (
                  <option 
                    key={index} 
                    value={option.value} 
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </FormField>
            </FormColumn>
          </FormRow>
          
          <div className="mb-3">
            <FormField
              type="textarea"
              placeholder="Please write your comment"
              className="form-control"
              value={formData.comment}
              onChange={(value) => handleInputChange('comment', value)}
            />
          </div>
          
          <button type="submit" className="btn btn-warning px-5 py-2 fw-bold">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;