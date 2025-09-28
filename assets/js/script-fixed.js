// Fixed script with improved content visibility and animation handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const sections = document.querySelectorAll('section');
    const langSwitches = document.querySelectorAll('.language-switch a');
    const contactForm = document.getElementById('eventForm');
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Ensure content visibility by immediately adding these classes
    document.body.classList.add('loaded');
    
    // Apply visible class to all sections immediately to prevent disappearing
    sections.forEach(section => {
        section.classList.add('fade-in');
        section.classList.add('visible');
    });
    
    // Handle sticky navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 21, 32, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 21, 32, 0.95)';
            navbar.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            if (navToggle.classList.contains('active')) {
                navToggle.children[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                navToggle.children[1].style.opacity = '0';
                navToggle.children[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                navToggle.children[0].style.transform = 'rotate(0) translate(0)';
                navToggle.children[1].style.opacity = '1';
                navToggle.children[2].style.transform = 'rotate(0) translate(0)';
            }
        });
    }

    // Close mobile menu when clicking on a nav item
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.children[0].style.transform = 'rotate(0) translate(0)';
                navToggle.children[1].style.opacity = '1';
                navToggle.children[2].style.transform = 'rotate(0) translate(0)';
            }
        });
    });

    // Improved animation handling
    const ensureContentVisibility = () => {
        // Get all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            // Always ensure content is visible
            element.classList.add('visible');
        });
    };

    // Run this function on page load, after scroll, and after language change
    ensureContentVisibility();

    // Language switcher
    langSwitches.forEach(langSwitch => {
        langSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = langSwitch.getAttribute('data-lang');
            
            // Update active state
            langSwitches.forEach(item => item.classList.remove('active'));
            langSwitch.classList.add('active');
            
            // Update body class for language
            if (lang === 'en') {
                document.body.classList.add('en');
                console.log('Switched to English');
            } else {
                document.body.classList.remove('en');
                console.log('Switched to Bulgarian');
            }
            
            // Ensure content remains visible after language switch
            setTimeout(ensureContentVisibility, 100);
            
            // Store language preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });

    // Check for stored language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang === 'en') {
        document.body.classList.add('en');
        langSwitches.forEach(item => {
            if (item.getAttribute('data-lang') === 'en') {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                eventType: document.getElementById('eventType').value,
                message: document.getElementById('message').value
            };
            
            // Here you would normally send the form data to a server
            // For demonstration, we'll just show an alert
            console.log('Form submitted:', formData);
            
            // Show success message
            const lang = document.body.classList.contains('en') ? 'en' : 'bg';
            const successMsg = lang === 'en' 
                ? 'Thank you! Your request has been submitted. We will contact you shortly.'
                : 'Благодарим Ви! Заявката е изпратена. Ще се свържем с Вас скоро.';
            
            alert(successMsg);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Simple testimonials slider functionality
    let currentTestimonial = 0;

    // Function to show specific testimonial
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            } else {
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateX(50px)';
            }
        });
    }

    // Auto rotate testimonials every 5 seconds
    if (testimonials.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Run ensureContentVisibility on scroll as well
    window.addEventListener('scroll', () => {
        ensureContentVisibility();
    });
    
    console.log("All scripts initialized successfully");
});