// DOM Elements
const userTypeItems = document.querySelectorAll('.user-type-item');
const loginForms = document.querySelectorAll('.login-form');
const passwordToggles = document.querySelectorAll('.toggle-password');
const formHeader = document.querySelector('.form-header');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const typeInfo = document.querySelector('.type-info');
const mobileLoginButton = document.querySelector('.mobile-login-button');
const rightPanel = document.querySelector('.right-panel');

// State
let currentIndex = 1; // Start with middle item (index 1)
const totalItems = userTypeItems.length;
const order = [1, 2, 0]; // Initial order: student, faculty, alumni

// Content for each user type
const userTypeContent = {
    alumni: {
        title: 'Welcome Back, Alumni!',
        subtitle: 'Reconnect and network with fellow alumni',
        info: {
            title: 'Alumni',
            description: 'Post - Mentor - Connect - Updates'
        }
    },
    student: {
        title: 'Welcome, Students!',
        subtitle: 'Join the community and share your experiences',
        info: {
            title: 'Student',
            description: 'Explore - Network - Share - Engage'
        }
    },
    faculty: {
        title: 'Welcome, Faculty!',
        subtitle: 'Engage with students and share your insights',
        info: {
            title: 'Faculty',
            description: 'Moderate - Mentor - Collaborate - Contribute'
        }
    }
};

// Functions
function updateCarousel() {
    // Update the visual order of items
    userTypeItems.forEach((item, index) => {
        item.classList.remove('active');
        item.style.order = order[index];
    });

    // Always activate the middle item (order 1)
    const activeItem = Array.from(userTypeItems).find(item => item.style.order === '1');
    if (activeItem) {
        activeItem.classList.add('active');
        updateUI(activeItem.dataset.type);
    }
}

function updateUI(selectedType) {
    // Update form header
    const content = userTypeContent[selectedType];
    formHeader.querySelector('h2').textContent = content.title;
    formHeader.querySelector('p').textContent = content.subtitle;

    // Update type info
    typeInfo.querySelector('h3').textContent = content.info.title;
    typeInfo.querySelector('p').textContent = content.info.description;
    typeInfo.classList.add('active');

    // Update login forms with fade effect
    loginForms.forEach(form => {
        if (form.id === `${selectedType}Form`) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });

    // Update the selected profession text for mobile button
    document.querySelector('.selected-profession').textContent = content.info.title;
}

function rotateArray(arr, direction) {
    if (direction === 'next') {
        const last = arr.pop();
        arr.unshift(last);
    } else {
        const first = arr.shift();
        arr.push(first);
    }
    return arr;
}

function moveCarousel(direction) {
    // Rotate the order array
    rotateArray(order, direction);
    updateCarousel();
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Event Listeners
prevButton.addEventListener('click', () => moveCarousel('prev'));
nextButton.addEventListener('click', () => moveCarousel('next'));

// Remove click listeners from items since they can't be directly selected
userTypeItems.forEach(item => {
    item.style.cursor = 'default';
});

// Password visibility toggle
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const passwordInput = e.target.previousElementSibling;
        const type = passwordInput.getAttribute('type');
        passwordInput.setAttribute(
            'type',
            type === 'password' ? 'text' : 'password'
        );
        toggle.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
});

// Form submissions
loginForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm(form)) {
            alert('Please fill in all required fields');
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to your backend
        console.log(`Logging in as ${form.id.replace('Form', '')}:`, data);

        // Show success message (you can customize this)
        alert(`Login attempt successful!`);
    });
});

// Input focus effects
document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Add a new event listener for the mobile login button
mobileLoginButton.addEventListener('click', () => {
    // Toggle the visibility of the right panel
    rightPanel.style.display = rightPanel.style.display === 'none' ? 'block' : 'none';

    // Hide the left panel when the form is shown
    if (rightPanel.style.display === 'block') {
        document.querySelector('.left-panel').style.display = 'none';
    } else {
        document.querySelector('.left-panel').style.display = 'block';
    }
});

// Add a new event listener for the switch profession button
const switchProfessionButton = document.querySelector('.switch-profession-button');

switchProfessionButton.addEventListener('click', () => {
    // Show the left panel and hide the right panel
    document.querySelector('.left-panel').style.display = 'block';
    rightPanel.style.display = 'none';
});

// Variables for swipe detection
let startX = 0;
let endX = 0;

// Add touch event listeners for swipe functionality
const userTypeList = document.querySelector('.user-type-list');

userTypeList.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

userTypeList.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

userTypeList.addEventListener('touchend', () => {
    if (startX > endX + 50) {
        // Swipe left
        moveCarousel('next');
    } else if (startX < endX - 50) {
        // Swipe right
        moveCarousel('prev');
    }
});

// Initialize carousel
updateCarousel();


