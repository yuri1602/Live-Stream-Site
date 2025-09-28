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
    
    // Добавяне на клас към тялото, за да активираме стиловете
    document.body.classList.add('loaded');
    
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

    // Scroll animations
    const fadeInElements = () => {
        // Get all fade-in elements after they're added to the DOM
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            } else {
                // Keep elements visible once they've been seen
                if (element.classList.contains('visible')) {
                    element.classList.add('visible');
                }
            }
        });
    };

    // Apply fade-in animation to all sections
    sections.forEach(section => {
        section.classList.add('fade-in');
        // Make sections initially visible to prevent disappearing
        section.classList.add('visible');
    });

    // Initialize animations on page load
    window.addEventListener('load', () => {
        fadeInElements();
    });

    // Trigger animations on scroll
    window.addEventListener('scroll', () => {
        fadeInElements();
    });

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
            setTimeout(fadeInElements, 100);
            
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
    
    // No need to add fade-in class to sections again, as it's done earlier
    // Just trigger initial animations to ensure everything is visible
    setTimeout(fadeInElements, 300);

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
    
    console.log("All scripts initialized successfully");
});