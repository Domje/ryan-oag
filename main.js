/**
 * Operational Assurance Group - Main JavaScript
 * Pure Vanilla JavaScript - No frameworks
 */

// ===========================
// Navigation Scroll Effect
// ===========================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// Mobile Hamburger Menu
// ===========================
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navbarMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
  });

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.navbar-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
}

// ===========================
// Mobile Dropdown Toggle
// ===========================
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  }
});

// ===========================
// Video Background Overlay
// ===========================
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
  // Create overlay element if it doesn't exist
  const hero = document.querySelector('.hero');
  if (hero && !hero.querySelector('.hero-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    hero.insertBefore(overlay, hero.firstChild);
  }
}

// ===========================
// Scroll Animations (Intersection Observer)
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  animateElements.forEach(el => observer.observe(el));
});

// ===========================
// Smooth Scrolling for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===========================
// Form Validation (Contact Form)
// ===========================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e74c3c';
      } else {
        field.style.borderColor = '#F4F6F9';
      }
    });
    
    // Email validation
    const emailField = contactForm.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#e74c3c';
      }
    }
    
    if (!isValid) {
      e.preventDefault();
      alert('Please fill in all required fields correctly.');
    }
  });
}

// ===========================
// Current Year in Footer
// ===========================
const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
