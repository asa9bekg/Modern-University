// Course data
const coursesData = [
    {
        id: 1,
        title: "Web Development Bootcamp",
        category: "technology",
        description: "Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive bootcamp.",
        duration: "12 weeks",
        level: "Beginner",
        price: "$999"
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        category: "science",
        description: "Learn Python, data analysis, machine learning, and data visualization techniques.",
        duration: "10 weeks",
        level: "Intermediate",
        price: "$1,199"
    },
    {
        id: 3,
        title: "UX/UI Design Masterclass",
        category: "design",
        description: "Create stunning user interfaces and experiences with Figma and design principles.",
        duration: "8 weeks",
        level: "Beginner",
        price: "$899"
    },
    {
        id: 4,
        title: "Business Administration",
        category: "business",
        description: "Essential business concepts, management, and strategy for future leaders.",
        duration: "14 weeks",
        level: "Intermediate",
        price: "$1,299"
    },
    {
        id: 5,
        title: "Cloud Computing Essentials",
        category: "technology",
        description: "Master AWS, Azure, and Google Cloud platforms for modern infrastructure.",
        duration: "10 weeks",
        level: "Intermediate",
        price: "$1,399"
    },
    {
        id: 6,
        title: "Digital Marketing Pro",
        category: "business",
        description: "SEO, social media, content marketing, and analytics for digital success.",
        duration: "6 weeks",
        level: "Beginner",
        price: "$699"
    }
];

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Render courses if on courses page
    if (document.getElementById('coursesGrid')) {
        renderCourses(coursesData);
        setupCourseFilters();
    }

    // Setup registration form if on registration page
    if (document.getElementById('registrationForm')) {
        setupRegistrationForm();
    }
});

// Render courses to the grid
function renderCourses(courses) {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = '';

    if (courses.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No courses found.</p>';
        return;
    }

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-header">
                <span class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
                <h3>${course.title}</h3>
            </div>
            <div class="course-body">
                <p>${course.description}</p>
                <div class="course-details">
                    <span>⏱️ ${course.duration}</span>
                    <span>📊 ${course.level}</span>
                    <span>💰 ${course.price}</span>
                </div>
                <a href="registration.html" class="btn btn-primary">Enroll Now</a>
            </div>
        `;
        grid.appendChild(courseCard);
    });
}

// Setup course filters
function setupCourseFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filtered = coursesData.filter(course => {
            const matchesSearch = 
                course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || course.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderCourses(filtered);
    }

    searchInput.addEventListener('input', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);
}

// Setup registration form
function setupRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (validateForm()) {
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Optional: Reset form after delay
            setTimeout(() => {
                form.reset();
                clearAllErrors();
            }, 2000);
        }
    });
}

// Validate registration form
function validateForm() {
    clearAllErrors();
    let isValid = true;

    // First Name
    const firstName = document.getElementById('firstName');
    if (firstName.value.trim() === '') {
        showError('firstName', 'First name is required');
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    }

    // Last Name
    const lastName = document.getElementById('lastName');
    if (lastName.value.trim() === '') {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    }

    // Email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone
    const phone = document.getElementById('phone');
    const phonePattern = /^[0-9\-\+\(\)\s]*$/;
    if (phone.value.trim() === '') {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (phone.value.trim().length < 10) {
        showError('phone', 'Phone number must be at least 10 characters');
        isValid = false;
    }

    // Date of Birth
    const dob = document.getElementById('dob');
    if (dob.value === '') {
        showError('dob', 'Date of birth is required');
        isValid = false;
    }

    // Gender
    const gender = document.getElementById('gender');
    if (gender.value === '') {
        showError('gender', 'Gender is required');
        isValid = false;
    }

    // Course
    const course = document.getElementById('course');
    if (course.value === '') {
        showError('course', 'Please select a course');
        isValid = false;
    }

    // Address
    const address = document.getElementById('address');
    if (address.value.trim() === '') {
        showError('address', 'Address is required');
        isValid = false;
    }

    // City
    const city = document.getElementById('city');
    if (city.value.trim() === '') {
        showError('city', 'City is required');
        isValid = false;
    }

    // Country
    const country = document.getElementById('country');
    if (country.value.trim() === '') {
        showError('country', 'Country is required');
        isValid = false;
    }

    // Password
    const password = document.getElementById('password');
    if (password.value === '') {
        showError('password', 'Password is required');
        isValid = false;
    } else if (password.value.length < 8) {
        showError('password', 'Password must be at least 8 characters');
        isValid = false;
    }

    // Confirm Password
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword.value === '') {
        showError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }

    // Terms
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showError('terms', 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

// Show error message
function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);

    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.classList.add('error');
    }
}

// Clear all errors
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('input.error, textarea.error, select.error');

    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });

    inputElements.forEach(el => {
        el.classList.remove('error');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});