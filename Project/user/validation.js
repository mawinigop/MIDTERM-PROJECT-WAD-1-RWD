const form = document.getElementById('forms');
const names = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const birth = document.getElementById('birth');
const allergies = document.getElementById('allergies');
const medications = document.getElementById('medications');
const pregnancys = document.getElementById('pregnancy');
const noneBox = document.getElementById('nones');
const medicalservices = document.getElementById('medicalservices');

form.addEventListener('submit', e => {
  if (!validateForm()) {
    e.preventDefault(); 
  } else {
    alert("Form submitted username: " + names.value);
  }
});


[names, email, phone, birth, allergies, medications, pregnancys].forEach(input => {
  if (input) {
    input.addEventListener('input', () => {
      validateInputs(input);
    });
  }
});

if (medicalservices) {
  medicalservices.addEventListener('change', () => {
    validateInputs(medicalservices);
  });
}

if (noneBox) {
  noneBox.addEventListener('change', () => {
    validateInputs(noneBox);
  });
}

const setError = (element, message) => {
  if (!element) return;
  const inputControl = element.parentElement;
  if (!inputControl) return;

  let errorDisplay = inputControl.querySelector('.error');
  if (!errorDisplay) {
    errorDisplay = document.createElement('div');
    errorDisplay.className = 'error';
    inputControl.appendChild(errorDisplay);
  }

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = element => {
  if (!element) return;
  const inputControl = element.parentElement;
  if (!inputControl) return;

  const errorDisplay = inputControl.querySelector('.error');
  if (errorDisplay) errorDisplay.innerText = '';

  inputControl.classList.add('success');
  inputControl.classList.remove('error');

  setTimeout(() => {
    inputControl.classList.remove('success');
  }, 5000);
};

const isValidEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateField = (field) => {
  if (field === names) {
    const value = names.value.trim();
    if (value === '') {
      setError(names, 'Name is required');
      return false;
    } else if (!/^[A-Za-z\s,]+$/.test(value)) {
      setError(names, 'must contain only name');
      return false;
    } else {
      setSuccess(names);
      return true;
    }
  }

  if (field === email) {
    const value = email.value.trim();
    if (value === '') {
      setError(email, 'Email is required');
      return false;
    } else if (!isValidEmail(value)) {
      setError(email, 'Provide a valid email address');
      return false;
    } else {
      setSuccess(email);
      return true;
    }
  }

  if (field === phone) {
    const value = phone.value.trim();
    const digits = value.replace(/\D/g, '');
    if (value === '') {
      setError(phone, 'Phone number is required');
      return false;
    } else if (!/^\d+$/.test(value)) {
      setError(phone, 'Phone number must contain only numbers');
      return false;
    } else if (digits.length < 11) {
      setError(phone, 'Phone number must be at least 11 digits');
      return false;
    } else {
      setSuccess(phone);
      return true;
    }
  }

  if (field === birth) {
    if (birth.value.trim() === '') {
      setError(birth, 'Date of Birth is required');
      return false;
    } else {
      setSuccess(birth);
      return true;
    }
  }

  if (field === allergies) {
    if (allergies.value.trim() === '') {
      setError(allergies, 'Allergies is required');
      return false;
    } else {
      setSuccess(allergies);
      return true;
    }
  }

  if (field === medications) {
    if (medications.value.trim() === '') {
      setError(medications, 'Medications is required');
      return false;
    } else {
      setSuccess(medications);
      return true;
    }
  }

  if (field === pregnancys) {
    if (pregnancys.value.trim() === '') {
      setError(pregnancys, 'Pregnancy is required');
      return false;
    } else {
      setSuccess(pregnancys);
      return true;
    }
  }

  if (field === noneBox) {
    const checkboxes = noneBox.querySelectorAll("input[type='checkbox']");
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);

    if (!isChecked) {
      setError(noneBox, 'Please select at least one condition');
      return false;
    } else {
      setSuccess(noneBox);
      return true;
    }
  }

  if (field === medicalservices) {
    if (!medicalservices.value) {
      setError(medicalservices, 'Please select a medical service');
      return false;
    } else {
      setSuccess(medicalservices);
      return true;
    }
  }

  return true;
};

const validateForm = () => {
  let valid = true;
  [names, email, phone, birth, allergies, medications, pregnancys, noneBox, medicalservices].forEach(f => {
    if (f && !validateField(f)) valid = false;
  });
  return valid;
};