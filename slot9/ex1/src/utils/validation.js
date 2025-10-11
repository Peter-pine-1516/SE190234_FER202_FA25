// Validation utility functions

/**
 * Validate contact form fields
 * @param {Object} formData - Form data object containing name, email, subject, message
 * @returns {Object} - Object containing validation errors
 */
export const validateContactForm = (formData) => {
  const errors = {};

  // Validate Name
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (formData.name.trim().length > 50) {
    errors.name = 'Name must not exceed 50 characters';
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
    errors.name = 'Name can only contain letters and spaces';
  }

  // Validate Email
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate Subject
  if (!formData.subject || formData.subject.trim() === '') {
    errors.subject = 'Subject is required';
  } else if (formData.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (formData.subject.trim().length > 100) {
    errors.subject = 'Subject must not exceed 100 characters';
  }

  // Validate Message
  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (formData.message.trim().length > 500) {
    errors.message = 'Message must not exceed 500 characters';
  }

  return errors;
};

/**
 * Validate account form (AboutForm)
 * @param {Object} formData - Form data object
 * @returns {Object} - Object containing validation errors
 */
export const validateAboutForm = (formData) => {
  const errors = {};

  // Validate First Name
  if (!formData.firstName || formData.firstName.trim() === '') {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Validate Last Name
  if (!formData.lastName || formData.lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Validate Email
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate Phone
  if (!formData.phone || formData.phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10,11}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Phone number must be 10-11 digits';
  }

  // Validate Age
  if (!formData.age) {
    errors.age = 'Age is required';
  } else if (formData.age < 18 || formData.age > 120) {
    errors.age = 'Age must be between 18 and 120';
  }

  // Validate Avatar
  if (!formData.avatar) {
    errors.avatar = 'Please select an avatar image';
  }

  return errors;
};

/**
 * Validate account security form
 * @param {Object} formData - Form data object
 * @returns {Object} - Object containing validation errors
 */
export const validateAccountForm = (formData) => {
  const errors = {};

  // Validate Username
  if (!formData.username || formData.username.trim() === '') {
    errors.username = 'Username is required';
  } else if (formData.username.trim().length < 4) {
    errors.username = 'Username must be at least 4 characters';
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    errors.username = 'Username can only contain letters, numbers, and underscores';
  }

  // Validate Password
  if (!formData.password || formData.password === '') {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = 'Password must contain uppercase, lowercase, and number';
  }

  // Validate Confirm Password
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Validate Secret Question
  if (!formData.secretQuestion || formData.secretQuestion === '') {
    errors.secretQuestion = 'Please select a secret question';
  }

  // Validate Answer
  if (!formData.answer || formData.answer.trim() === '') {
    errors.answer = 'Answer is required';
  } else if (formData.answer.trim().length < 2) {
    errors.answer = 'Answer must be at least 2 characters';
  }

  return errors;
};

/**
 * Validate address form
 * @param {Object} formData - Form data object
 * @returns {Object} - Object containing validation errors
 */
export const validateAddressForm = (formData) => {
  const errors = {};

  // Validate Street
  if (!formData.street || formData.street.trim() === '') {
    errors.street = 'Street address is required';
  } else if (formData.street.trim().length < 5) {
    errors.street = 'Street address must be at least 5 characters';
  }

  // Validate City
  if (!formData.city || formData.city.trim() === '') {
    errors.city = 'City is required';
  } else if (formData.city.trim().length < 2) {
    errors.city = 'City name must be at least 2 characters';
  }

  // Validate Country
  if (!formData.country || formData.country === '') {
    errors.country = 'Please select a country';
  }

  // Validate Zip Code
  if (!formData.zipCode || formData.zipCode.trim() === '') {
    errors.zipCode = 'Zip code is required';
  } else if (!/^\d{5,6}$/.test(formData.zipCode)) {
    errors.zipCode = 'Zip code must be 5-6 digits';
  }

  return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object
 * @returns {boolean} - True if form is valid (no errors)
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};


