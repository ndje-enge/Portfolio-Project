// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ===== ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .project-card, .skill-category');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== SKILLS PROGRESS BARS =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// ===== PROJECT FILTERING =====
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
            project.classList.add('fade-in-up');
        } else {
            project.style.display = 'none';
        }
    });
}

// ===== CONTACT FORM HANDLING =====
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simple form validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message envoyé avec succès !', 'success');
    form.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
});

// ===== LAZY LOADING FOR IMAGES =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PARALLAX EFFECT =====
function parallaxScroll() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    parallaxScroll();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    lazyLoadImages();
    
    // Add smooth reveal animation to hero elements
    const heroElements = document.querySelectorAll('.hero > *');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize tooltips if any
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            showTooltip(this);
        });
        tooltip.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
});

// ===== TOOLTIP FUNCTIONALITY =====
function showTooltip(element) {
    const tooltipText = element.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 300);
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const sections = ['#home', '#about', '#projects', '#skills', '#contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (e.key === 'ArrowUp') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        } else {
            nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        }
        
        const targetSection = document.querySelector(sections[nextIndex]);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '#home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = '#' + section.id;
        }
    });
    
    return currentSection;
}


