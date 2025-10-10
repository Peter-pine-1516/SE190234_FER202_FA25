// Validation utilities cho wizard form
// Tách riêng logic validation để code sạch và dễ quản lý

// Validation cho bước About Information
export const validateAboutStep = (formData) => {
  const aboutErrors = {};
  const about = formData.about;

  // First Name validation
  if (!about.firstName?.trim()) {
    aboutErrors.firstName = 'First name is required';
  }

  // Last Name validation
  if (!about.lastName?.trim()) {
    aboutErrors.lastName = 'Last name is required';
  }

  // Email validation
  if (!about.email?.trim()) {
    aboutErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(about.email)) {
    aboutErrors.email = 'Email is invalid';
  }

  // Phone validation
  if (!about.phone?.trim()) {
    aboutErrors.phone = 'Phone is required';
  } else {
    const phoneDigits = about.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      aboutErrors.phone = 'Phone must be 10-11 digits';
    }
  }

  // Age validation
  if (!about.age?.trim()) {
    aboutErrors.age = 'Age is required';
  } else {
    const age = parseInt(about.age);
    if (isNaN(age) || age < 1 || age > 120) {
      aboutErrors.age = 'Age must be between 1 and 120';
    }
  }

  return aboutErrors;
};

// Validation cho bước Account Information
export const validateAccountStep = (formData) => {
  const accountErrors = {};
  const account = formData.account;

  // Username validation
  if (!account.username?.trim()) {
    accountErrors.username = 'Username is required';
  } else if (account.username.length < 3) {
    accountErrors.username = 'Username must be at least 3 characters';
  } else if (account.username.length > 20) {
    accountErrors.username = 'Username must be less than 20 characters';
  } else if (!/^[a-zA-Z0-9_]+$/.test(account.username)) {
    accountErrors.username = 'Username can only contain letters, numbers, and underscores';
  }

  // Password validation
  if (!account.password?.trim()) {
    accountErrors.password = 'Password is required';
  } else if (account.password.length < 6) {
    accountErrors.password = 'Password must be at least 6 characters';
  } else if (account.password.length > 50) {
    accountErrors.password = 'Password must be less than 50 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(account.password)) {
    accountErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }

  // Confirm Password validation
  if (!account.confirmPassword?.trim()) {
    accountErrors.confirmPassword = 'Confirm password is required';
  } else if (account.password !== account.confirmPassword) {
    accountErrors.confirmPassword = 'Passwords do not match';
  }

  // Secret Question validation
  if (!account.secretQuestion?.trim()) {
    accountErrors.secretQuestion = 'Secret question is required';
  }

  // Answer validation
  if (!account.answer?.trim()) {
    accountErrors.answer = 'Answer is required';
  } else if (account.answer.length < 3) {
    accountErrors.answer = 'Answer must be at least 3 characters';
  }

  return accountErrors;
};

// Validation cho bước Address Information
export const validateAddressStep = (formData) => {
  const addressErrors = {};
  const address = formData.address;

  // Street validation
  if (!address.street?.trim()) {
    addressErrors.street = 'Street is required';
  } else if (address.street.length < 5) {
    addressErrors.street = 'Street address must be at least 5 characters';
  }

  // City validation
  if (!address.city?.trim()) {
    addressErrors.city = 'City is required';
  } else if (address.city.length < 2) {
    addressErrors.city = 'City must be at least 2 characters';
  }

  // State validation
  if (!address.state?.trim()) {
    addressErrors.state = 'State is required';
  } else if (address.state.length < 2) {
    addressErrors.state = 'State must be at least 2 characters';
  }

  // Zip Code validation
  if (!address.zipCode?.trim()) {
    addressErrors.zipCode = 'Zip code is required';
  } else {
    const zipDigits = address.zipCode.replace(/\D/g, '');
    if (zipDigits.length < 5 || zipDigits.length > 6) {
      addressErrors.zipCode = 'Zip code must be 5-6 digits';
    }
  }

  // Country validation
  if (!address.country?.trim()) {
    addressErrors.country = 'Country is required';
  }

  return addressErrors;
};

// Validation cho toàn bộ form
export const validateAllSteps = (formData) => {
  const aboutErrors = validateAboutStep(formData);
  const accountErrors = validateAccountStep(formData);
  const addressErrors = validateAddressStep(formData);

  return {
    about: aboutErrors,
    account: accountErrors,
    address: addressErrors
  };
};

// Kiểm tra xem có lỗi validation nào không
export const hasValidationErrors = (errors) => {
  return Object.values(errors).some(stepErrors => 
    Object.keys(stepErrors).length > 0
  );
};

// Kiểm tra xem một bước có lỗi validation không
export const hasStepErrors = (stepErrors) => {
  return Object.keys(stepErrors).length > 0;
};

// Validation constants
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50,
    PATTERN: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  },
  PHONE: {
    MIN_DIGITS: 10,
    MAX_DIGITS: 11
  },
  ZIP_CODE: {
    MIN_DIGITS: 5,
    MAX_DIGITS: 6
  },
  AGE: {
    MIN: 1,
    MAX: 120
  }
};

// Helper function để format phone number
export const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else if (digits.length === 11) {
    return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1-$2-$3-$4');
  }
  return phone;
};

// Helper function để format zip code
export const formatZipCode = (zipCode) => {
  const digits = zipCode.replace(/\D/g, '');
  if (digits.length === 5) {
    return digits;
  } else if (digits.length === 6) {
    return digits.replace(/(\d{3})(\d{3})/, '$1-$2');
  }
  return zipCode;
};
