// DOM Elements
const loginPage = document.getElementById('loginPage');
const userTypeSelection = document.getElementById('userTypeSelection');
const customerLoginContainer = document.getElementById('customerLoginContainer');
const customerRegisterContainer = document.getElementById('customerRegisterContainer');
const collectorLoginContainer = document.getElementById('collectorLoginContainer');
const collectorRegisterContainer = document.getElementById('collectorRegisterContainer');
const customerLoginForm = document.getElementById('customerLoginForm');
const customerRegisterForm = document.getElementById('customerRegisterForm');
const collectorLoginForm = document.getElementById('collectorLoginForm');
const collectorRegisterForm = document.getElementById('collectorRegisterForm');

// User type selection buttons
const customerBtn = document.getElementById('customerBtn');
const collectorBtn = document.getElementById('collectorBtn');
const backToUserTypeBtn = document.getElementById('backToUserTypeBtn');
const backToUserTypeBtn2 = document.getElementById('backToUserTypeBtn2');

// Customer form buttons
const showCustomerRegisterBtn = document.getElementById('showCustomerRegisterBtn');
const backToCustomerLoginBtn = document.getElementById('backToCustomerLoginBtn');
const sendCustomerOtpBtn = document.getElementById('sendCustomerOtpBtn');
const verifyCustomerOtpBtn = document.getElementById('verifyCustomerOtpBtn');
const resendCustomerOtpBtn = document.getElementById('resendCustomerOtpBtn');
const customerRegisterBtn = document.getElementById('customerRegisterBtn');
const customerOtpInputs = document.querySelectorAll('[id^="customerOtp"]');
const customerRegPassword = document.getElementById('customerRegPassword');
const customerRegConfirmPassword = document.getElementById('customerRegConfirmPassword');
const customerPasswordStrengthMeter = document.getElementById('customerPasswordStrengthMeter');
const customerPasswordFeedback = document.getElementById('customerPasswordFeedback');

// Collector form buttons
const showCollectorRegisterBtn = document.getElementById('showCollectorRegisterBtn');
const backToCollectorLoginBtn = document.getElementById('backToCollectorLoginBtn');
const sendCollectorOtpBtn = document.getElementById('sendCollectorOtpBtn');
const verifyCollectorOtpBtn = document.getElementById('verifyCollectorOtpBtn');
const resendCollectorOtpBtn = document.getElementById('resendCollectorOtpBtn');
const collectorRegisterBtn = document.getElementById('collectorRegisterBtn');
const collectorOtpInputs = document.querySelectorAll('[id^="collectorOtp"]');
const collectorRegPassword = document.getElementById('collectorRegPassword');
const collectorRegConfirmPassword = document.getElementById('collectorRegConfirmPassword');
const collectorPasswordStrengthMeter = document.getElementById('collectorPasswordStrengthMeter');
const collectorPasswordFeedback = document.getElementById('collectorPasswordFeedback');

// Password toggle buttons
const passwordToggles = document.querySelectorAll('.password-toggle');

// Password validation criteria
const customerPasswordCriteria = {
    length: { regex: /.{8,}/, element: document.getElementById('customerLength') },
    uppercase: { regex: /[A-Z]/, element: document.getElementById('customerUppercase') },
    lowercase: { regex: /[a-z]/, element: document.getElementById('customerLowercase') },
    number: { regex: /[0-9]/, element: document.getElementById('customerNumber') },
    special: { regex: /[^A-Za-z0-9]/, element: document.getElementById('customerSpecial') }
};

const collectorPasswordCriteria = {
    length: { regex: /.{8,}/, element: document.getElementById('collectorLength') },
    uppercase: { regex: /[A-Z]/, element: document.getElementById('collectorUppercase') },
    lowercase: { regex: /[a-z]/, element: document.getElementById('collectorLowercase') },
    number: { regex: /[0-9]/, element: document.getElementById('collectorNumber') },
    special: { regex: /[^A-Za-z0-9]/, element: document.getElementById('collectorSpecial') }
};

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const userType = urlParams.get('user');

// Initialize page based on URL parameter
document.addEventListener('DOMContentLoaded', () => {
    if (userType === 'customer') {
        customerBtn.click();
    } else if (userType === 'collector') {
        collectorBtn.click();
    }
});

// User type selection
customerBtn.addEventListener('click', () => {
    userTypeSelection.style.display = 'none';
    customerLoginContainer.style.display = 'block';
});

collectorBtn.addEventListener('click', () => {
    userTypeSelection.style.display = 'none';
    collectorLoginContainer.style.display = 'block';
});

backToUserTypeBtn.addEventListener('click', () => {
    customerLoginContainer.style.display = 'none';
    userTypeSelection.style.display = 'block';
});

backToUserTypeBtn2.addEventListener('click', () => {
    collectorLoginContainer.style.display = 'none';
    userTypeSelection.style.display = 'block';
});

// Show customer registration form
showCustomerRegisterBtn.addEventListener('click', () => {
    customerLoginContainer.style.display = 'none';
    customerRegisterContainer.style.display = 'block';
    resetCustomerRegistrationForm();
});

// Back to customer login form
backToCustomerLoginBtn.addEventListener('click', () => {
    customerRegisterContainer.style.display = 'none';
    customerLoginContainer.style.display = 'block';
});

// Show collector registration form
showCollectorRegisterBtn.addEventListener('click', () => {
    collectorLoginContainer.style.display = 'none';
    collectorRegisterContainer.style.display = 'block';
    resetCollectorRegistrationForm();
});

// Back to collector login form
backToCollectorLoginBtn.addEventListener('click', () => {
    collectorRegisterContainer.style.display = 'none';
    collectorLoginContainer.style.display = 'block';
});

// Password toggle functionality
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const targetId = toggle.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);
        const icon = toggle.querySelector('i');
        
        if (targetInput.type === 'password') {
            targetInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            targetInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Customer Send OTP
sendCustomerOtpBtn.addEventListener('click', () => {
    const username = document.getElementById('customerRegUsername').value;
    const mobile = document.getElementById('customerRegMobile').value;
    
    if (username && mobile && mobile.length === 10) {
        // Simulate sending OTP
        showToast('OTP sent to your mobile number', 'success');
        
        // Move to step 2
        document.getElementById('customerRegisterStep1').classList.remove('active');
        document.getElementById('customerRegisterStep2').classList.add('active');
        document.getElementById('customerStep1').classList.add('completed');
        document.getElementById('customerStep2').classList.add('active');
        
        // Focus first OTP input
        document.getElementById('customerOtp1').focus();
    } else {
        showToast('Please enter valid username and mobile number', 'error');
    }
});

// Customer OTP input handling
customerOtpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < customerOtpInputs.length - 1) {
            customerOtpInputs[index + 1].focus();
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            customerOtpInputs[index - 1].focus();
        }
    });
});

// Customer Verify OTP
verifyCustomerOtpBtn.addEventListener('click', () => {
    const otp = Array.from(customerOtpInputs).map(input => input.value).join('');
    
    if (otp.length === 6) {
        // Simulate OTP verification
        showToast('OTP verified successfully', 'success');
        
        // Move to step 3
        document.getElementById('customerRegisterStep2').classList.remove('active');
        document.getElementById('customerRegisterStep3').classList.add('active');
        document.getElementById('customerStep2').classList.add('completed');
        document.getElementById('customerStep3').classList.add('active');
    } else {
        showToast('Please enter valid OTP', 'error');
    }
});

// Customer Resend OTP
resendCustomerOtpBtn.addEventListener('click', () => {
    showToast('OTP resent to your mobile number', 'success');
    // Clear OTP inputs
    customerOtpInputs.forEach(input => input.value = '');
    document.getElementById('customerOtp1').focus();
});

// Customer Password strength validation
customerRegPassword.addEventListener('input', () => {
    const password = customerRegPassword.value;
    let strength = 0;
    
    // Check each criteria
    Object.keys(customerPasswordCriteria).forEach(key => {
        if (customerPasswordCriteria[key].regex.test(password)) {
            customerPasswordCriteria[key].element.classList.add('valid');
            customerPasswordCriteria[key].element.classList.remove('invalid');
            customerPasswordCriteria[key].element.querySelector('i').className = 'fas fa-check-circle';
            strength++;
        } else {
            customerPasswordCriteria[key].element.classList.remove('valid');
            customerPasswordCriteria[key].element.classList.add('invalid');
            customerPasswordCriteria[key].element.querySelector('i').className = 'fas fa-times-circle';
        }
    });
    
    // Update strength meter
    const strengthPercentage = (strength / 5) * 100;
    customerPasswordStrengthMeter.style.width = `${strengthPercentage}%`;
    
    // Set color based on strength
    if (strength < 2) {
        customerPasswordStrengthMeter.style.backgroundColor = '#e74c3c'; // Weak
    } else if (strength < 4) {
        customerPasswordStrengthMeter.style.backgroundColor = '#f1c40f'; // Medium
    } else {
        customerPasswordStrengthMeter.style.backgroundColor = '#27ae60'; // Strong
    }
});

// Customer Confirm password validation
customerRegConfirmPassword.addEventListener('input', () => {
    if (customerRegPassword.value !== customerRegConfirmPassword.value) {
        customerRegConfirmPassword.setCustomValidity('Passwords do not match');
    } else {
        customerRegConfirmPassword.setCustomValidity('');
    }
});

// Customer Registration form submission
customerRegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = customerRegPassword.value;
    const confirmPassword = customerRegConfirmPassword.value;
    
    // Check if password meets all criteria
    let isValid = true;
    Object.keys(customerPasswordCriteria).forEach(key => {
        if (!customerPasswordCriteria[key].regex.test(password)) {
            isValid = false;
        }
    });
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (!isValid) {
        showToast('Password does not meet all requirements', 'error');
        return;
    }
    
    // Simulate successful registration
    showToast('Registration successful! Please login with your credentials', 'success');
    
    // Reset form and show login
    setTimeout(() => {
        customerRegisterContainer.style.display = 'none';
        customerLoginContainer.style.display = 'block';
        resetCustomerRegistrationForm();
    }, 2000);
});

// Reset customer registration form
function resetCustomerRegistrationForm() {
    customerRegisterForm.reset();
    document.querySelectorAll('#customerRegisterContainer .register-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelectorAll('#customerRegisterContainer .step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    document.getElementById('customerRegisterStep1').classList.add('active');
    document.getElementById('customerStep1').classList.add('active');
    
    // Reset password validation
    Object.keys(customerPasswordCriteria).forEach(key => {
        customerPasswordCriteria[key].element.classList.remove('valid');
        customerPasswordCriteria[key].element.classList.add('invalid');
        customerPasswordCriteria[key].element.querySelector('i').className = 'fas fa-times-circle';
    });
    customerPasswordStrengthMeter.style.width = '0%';
}

// Collector Send OTP
sendCollectorOtpBtn.addEventListener('click', () => {
    const username = document.getElementById('collectorRegUsername').value;
    const mobile = document.getElementById('collectorRegMobile').value;
    
    if (username && mobile && mobile.length === 10) {
        // Simulate sending OTP
        showToast('OTP sent to your mobile number', 'success');
        
        // Move to step 2
        document.getElementById('collectorRegisterStep1').classList.remove('active');
        document.getElementById('collectorRegisterStep2').classList.add('active');
        document.getElementById('collectorStep1').classList.add('completed');
        document.getElementById('collectorStep2').classList.add('active');
        
        // Focus first OTP input
        document.getElementById('collectorOtp1').focus();
    } else {
        showToast('Please enter valid username and mobile number', 'error');
    }
});

// Collector OTP input handling
collectorOtpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < collectorOtpInputs.length - 1) {
            collectorOtpInputs[index + 1].focus();
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            collectorOtpInputs[index - 1].focus();
        }
    });
});

// Collector Verify OTP
verifyCollectorOtpBtn.addEventListener('click', () => {
    const otp = Array.from(collectorOtpInputs).map(input => input.value).join('');
    
    if (otp.length === 6) {
        // Simulate OTP verification
        showToast('OTP verified successfully', 'success');
        
        // Move to step 3
        document.getElementById('collectorRegisterStep2').classList.remove('active');
        document.getElementById('collectorRegisterStep3').classList.add('active');
        document.getElementById('collectorStep2').classList.add('completed');
        document.getElementById('collectorStep3').classList.add('active');
    } else {
        showToast('Please enter valid OTP', 'error');
    }
});

// Collector Resend OTP
resendCollectorOtpBtn.addEventListener('click', () => {
    showToast('OTP resent to your mobile number', 'success');
    // Clear OTP inputs
    collectorOtpInputs.forEach(input => input.value = '');
    document.getElementById('collectorOtp1').focus();
});

// Collector Password strength validation
collectorRegPassword.addEventListener('input', () => {
    const password = collectorRegPassword.value;
    let strength = 0;
    
    // Check each criteria
    Object.keys(collectorPasswordCriteria).forEach(key => {
        if (collectorPasswordCriteria[key].regex.test(password)) {
            collectorPasswordCriteria[key].element.classList.add('valid');
            collectorPasswordCriteria[key].element.classList.remove('invalid');
            collectorPasswordCriteria[key].element.querySelector('i').className = 'fas fa-check-circle';
            strength++;
        } else {
            collectorPasswordCriteria[key].element.classList.remove('valid');
            collectorPasswordCriteria[key].element.classList.add('invalid');
            collectorPasswordCriteria[key].element.querySelector('i').className = 'fas fa-times-circle';
        }
    });
    
    // Update strength meter
    const strengthPercentage = (strength / 5) * 100;
    collectorPasswordStrengthMeter.style.width = `${strengthPercentage}%`;
    
    // Set color based on strength
    if (strength < 2) {
        collectorPasswordStrengthMeter.style.backgroundColor = '#e74c3c'; // Weak
    } else if (strength < 4) {
        collectorPasswordStrengthMeter.style.backgroundColor = '#f1c40f'; // Medium
    } else {
        collectorPasswordStrengthMeter.style.backgroundColor = '#27ae60'; // Strong
    }
});

// Collector Confirm password validation
collectorRegConfirmPassword.addEventListener('input', () => {
    if (collectorRegPassword.value !== collectorRegConfirmPassword.value) {
        collectorRegConfirmPassword.setCustomValidity('Passwords do not match');
    } else {
        collectorRegConfirmPassword.setCustomValidity('');
    }
});

// Collector Registration form submission
collectorRegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = collectorRegPassword.value;
    const confirmPassword = collectorRegConfirmPassword.value;
    
    // Check if password meets all criteria
    let isValid = true;
    Object.keys(collectorPasswordCriteria).forEach(key => {
        if (!collectorPasswordCriteria[key].regex.test(password)) {
            isValid = false;
        }
    });
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (!isValid) {
        showToast('Password does not meet all requirements', 'error');
        return;
    }
    
    // Simulate successful registration
    showToast('Registration successful! Please login with your credentials', 'success');
    
    // Reset form and show login
    setTimeout(() => {
        collectorRegisterContainer.style.display = 'none';
        collectorLoginContainer.style.display = 'block';
        resetCollectorRegistrationForm();
    }, 2000);
});

// Reset collector registration form
function resetCollectorRegistrationForm() {
    collectorRegisterForm.reset();
    document.querySelectorAll('#collectorRegisterContainer .register-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelectorAll('#collectorRegisterContainer .step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    document.getElementById('collectorRegisterStep1').classList.add('active');
    document.getElementById('collectorStep1').classList.add('active');
    
    // Reset password validation
    Object.keys(collectorPasswordCriteria).forEach(key => {
        collectorPasswordCriteria[key].element.classList.remove('valid');
        collectorPasswordCriteria[key].element.classList.add('invalid');
        collectorPasswordCriteria[key].element.querySelector('i').className = 'fas fa-times-circle';
    });
    collectorPasswordStrengthMeter.style.width = '0%';
}

// Customer Login functionality
customerLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('customerEmail').value;
    const password = document.getElementById('customerPassword').value;
    
    if (email && password) {
        // Simulate login success
        window.location.href = 'customer_dashboard.html';
    }
});

// Collector Login functionality
collectorLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('collectorEmail').value;
    const password = document.getElementById('collectorPassword').value;
    
    if (email && password) {
        // Simulate login success
        window.location.href = 'collector_dashboard.html';
    }
});
// Toast notification function
function showToast(message, type = 'success') {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="toast-icon fas fa-check-circle"></i>
            <span class="toast-message"></span>
        `;
        document.body.appendChild(toast);
    }
    
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    if (type === 'success') {
        toastIcon.className = 'toast-icon fas fa-check-circle';
    } else if (type === 'error') {
        toastIcon.className = 'toast-icon fas fa-exclamation-circle';
        toastIcon.style.color = '#e74c3c';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}