// DOM Elements
const customerDashboard = document.getElementById('customerDashboard');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const navItems = document.querySelectorAll('.nav-item');
const dashboardSections = document.querySelectorAll('.dashboard-section');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const statValues = document.querySelectorAll('.stat-value');
const userName = document.getElementById('userName');
const userTypeBadge = document.getElementById('userTypeBadge');
const profileUserName = document.getElementById('profileUserName');
const profileUserEmail = document.getElementById('profileUserEmail');
const profileUserPhone = document.getElementById('profileUserPhone');

// Waste Calculator Elements
const wasteTypesGrid = document.getElementById('wasteTypesGrid');
const subtotalValue = document.getElementById('subtotalValue');
const pickupFee = document.getElementById('pickupFee');
const totalValue = document.getElementById('totalValue');
const pickupRequirement = document.getElementById('pickupRequirement');
const schedulePickupBtn = document.getElementById('schedulePickupBtn');

// Address Elements
const editAddressBtn = document.getElementById('editAddressBtn');
const saveAddressBtn = document.getElementById('saveAddressBtn');
const cancelAddressBtn = document.getElementById('cancelAddressBtn');
const addressDisplay = document.getElementById('addressDisplay');
const addressInput = document.getElementById('addressInput');
const addressFieldValue = document.getElementById('addressFieldValue');

// Settings Elements
const customerSettingsForm = document.getElementById('customerSettingsForm');
const customerCancelSettingsBtn = document.getElementById('customerCancelSettingsBtn');
const customerEmailNotifications = document.getElementById('customerEmailNotifications');
const customerSmsNotifications = document.getElementById('customerSmsNotifications');

// Waste types data with realistic Indian market values
const wasteTypes = [
    { id: 'newspaper', name: 'Newspaper', icon: 'fa-newspaper', value: 12, unit: 'kg' },
    { id: 'plastic-bottles', name: 'Plastic Bottles', icon: 'fa-wine-bottle', value: 25, unit: 'kg' },
    { id: 'cardboard', name: 'Cardboard', icon: 'fa-box', value: 10, unit: 'kg' },
    { id: 'glass-bottles', name: 'Glass Bottles', icon: 'fa-wine-glass', value: 8, unit: 'kg' },
    { id: 'aluminum-cans', name: 'Aluminum Cans', icon: 'fa-beer', value: 65, unit: 'kg' },
    { id: 'electronic', name: 'Electronic Waste', icon: 'fa-laptop', value: 120, unit: 'kg' },
    { id: 'batteries', name: 'Batteries', icon: 'fa-battery-full', value: 85, unit: 'kg' },
    { id: 'textiles', name: 'Textiles', icon: 'fa-tshirt', value: 15, unit: 'kg' }
];

// Minimum pickup amount
const minimumPickupAmount = 120;
const pickupFeeAmount = 30;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Set user information (in a real app, this would come from session/cookie)
    userName.textContent = 'Customer User';
    userTypeBadge.textContent = 'Customer';
    profileUserName.textContent = 'Customer User';
    profileUserEmail.textContent = 'customer@example.com';
    profileUserPhone.textContent = '+91 (555) 123-4567';
    
    // Initialize waste calculator
    initializeWasteCalculator();
    
    // Animate counters
    animateCounters();
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }
});

// Navigation functionality
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show corresponding section
        const sectionId = item.getAttribute('data-section');
        dashboardSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Initialize waste calculator when navigating to it
        if (sectionId === 'calculator') {
            initializeWasteCalculator();
        }
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('mobile-open');
        }
    });
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        showToast('Dark mode enabled', 'success');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        showToast('Light mode enabled', 'success');
    }
});

// Initialize waste calculator
function initializeWasteCalculator() {
    wasteTypesGrid.innerHTML = '';
    
    wasteTypes.forEach(waste => {
        const wasteCard = document.createElement('div');
        wasteCard.className = 'waste-type-card';
        wasteCard.dataset.wasteId = waste.id;
        wasteCard.dataset.value = waste.value;
        
        wasteCard.innerHTML = `
            <div class="waste-type-icon">
                <i class="fas ${waste.icon}"></i>
            </div>
            <div class="waste-type-name">${waste.name}</div>
            <div class="waste-type-value">₹${waste.value.toFixed(2)} per ${waste.unit}</div>
            <div class="waste-quantity-container">
                <input type="number" class="waste-quantity-input" min="0" step="0.1" value="0" data-waste-id="${waste.id}">
                <span class="waste-quantity-unit">${waste.unit}</span>
            </div>
        `;
        
        wasteCard.addEventListener('click', function(e) {
            if (!e.target.classList.contains('waste-quantity-input')) {
                this.classList.toggle('selected');
                const input = this.querySelector('.waste-quantity-input');
                if (this.classList.contains('selected') && input.value === '0') {
                    input.value = '1';
                } else if (!this.classList.contains('selected')) {
                    input.value = '0';
                }
                updateWasteCalculator();
            }
        });
        
        const quantityInput = wasteCard.querySelector('.waste-quantity-input');
        quantityInput.addEventListener('input', function() {
            if (this.value > 0) {
                wasteCard.classList.add('selected');
            } else {
                wasteCard.classList.remove('selected');
            }
            updateWasteCalculator();
        });
        
        wasteTypesGrid.appendChild(wasteCard);
    });
    
    updateWasteCalculator();
}

// Update waste calculator calculations
function updateWasteCalculator() {
    let subtotal = 0;
    
    wasteTypes.forEach(waste => {
        const input = document.querySelector(`input[data-waste-id="${waste.id}"]`);
        const quantity = parseFloat(input.value) || 0;
        subtotal += quantity * waste.value;
    });
    
    // Apply pickup fee logic
    let effectivePickupFee = pickupFeeAmount;
    if (subtotal >= minimumPickupAmount) {
        effectivePickupFee = 0;
    }
    
    const total = Math.max(0, subtotal - effectivePickupFee);
    
    subtotalValue.textContent = `₹${subtotal.toFixed(2)}`;
    pickupFee.textContent = `₹${effectivePickupFee.toFixed(2)}${effectivePickupFee === 0 ? ' (Waived)' : ''}`;
    totalValue.textContent = `₹${total.toFixed(2)}`;
    
    // Update pickup requirement
    if (subtotal >= minimumPickupAmount) {
        pickupRequirement.className = 'pickup-requirement met';
        pickupRequirement.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Minimum pickup amount met: ₹${minimumPickupAmount.toFixed(2)} (Current: ₹${subtotal.toFixed(2)})
        `;
        schedulePickupBtn.disabled = false;
    } else {
        pickupRequirement.className = 'pickup-requirement not-met';
        pickupRequirement.innerHTML = `
            <i class="fas fa-info-circle" style="margin-right: 0.5rem;"></i>
            Minimum pickup amount: ₹${minimumPickupAmount.toFixed(2)} (Current: ₹${subtotal.toFixed(2)})
        `;
        schedulePickupBtn.disabled = true;
    }
}

// Schedule pickup button
schedulePickupBtn.addEventListener('click', function() {
    if (!this.disabled) {
        showToast('Pickup scheduled successfully!', 'success');
        
        // Reset calculator after successful scheduling
        setTimeout(() => {
            initializeWasteCalculator();
        }, 2000);
    }
});

// Address editing functionality
editAddressBtn.addEventListener('click', function() {
    addressDisplay.classList.add('hidden');
    addressInput.classList.add('active');
    editAddressBtn.style.display = 'none';
    saveAddressBtn.style.display = 'inline-block';
    cancelAddressBtn.style.display = 'inline-block';
});

saveAddressBtn.addEventListener('click', function() {
    const newAddress = addressFieldValue.value;
    addressDisplay.textContent = newAddress;
    addressDisplay.classList.remove('hidden');
    addressInput.classList.remove('active');
    editAddressBtn.style.display = 'inline-block';
    saveAddressBtn.style.display = 'none';
    cancelAddressBtn.style.display = 'none';
    showToast('Address updated successfully!', 'success');
});

cancelAddressBtn.addEventListener('click', function() {
    addressDisplay.classList.remove('hidden');
    addressInput.classList.remove('active');
    editAddressBtn.style.display = 'inline-block';
    saveAddressBtn.style.display = 'none';
    cancelAddressBtn.style.display = 'none';
    // Reset to original value
    addressFieldValue.value = addressDisplay.textContent;
});

// Customer Settings functionality
customerSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('customerSettingsEmail').value;
    const currentPassword = document.getElementById('customerSettingsCurrentPassword').value;
    const newPassword = document.getElementById('customerSettingsNewPassword').value;
    const confirmPassword = document.getElementById('customerSettingsConfirmPassword').value;
    
    if (!currentPassword) {
        showToast('Please enter your current password', 'error');
        return;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }
    
    // Simulate API call to update settings
    showToast('Settings updated successfully!', 'success');
    
    // Update email in profile if changed
    if (email !== profileUserEmail.textContent) {
        profileUserEmail.textContent = email;
    }
    
    // Reset form
    customerSettingsForm.reset();
    document.getElementById('customerSettingsEmail').value = profileUserEmail.textContent;
});

customerCancelSettingsBtn.addEventListener('click', () => {
    // Reset form
    customerSettingsForm.reset();
    document.getElementById('customerSettingsEmail').value = profileUserEmail.textContent;
});

// Notification toggle functionality
customerEmailNotifications.addEventListener('change', function() {
    showToast(`Email notifications ${this.checked ? 'enabled' : 'disabled'}`, 'success');
});

customerSmsNotifications.addEventListener('change', function() {
    showToast(`SMS notifications ${this.checked ? 'enabled' : 'disabled'}`, 'success');
});

// Animate counters
function animateCounters() {
    statValues.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 50;
        
        const updateCounter = () => {
            const current = +counter.innerText;
            
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Toast notification function
function showToast(message, type = 'success') {
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