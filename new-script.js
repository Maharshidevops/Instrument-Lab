// Modern, Clean, and Efficient JavaScript for Laboratory Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Show/hide back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });
    }


    // Typed Text Animation in Hero Section
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const typedStrings = [
            'Advanced Analytical Instruments',
            'Cutting-Edge Research Facility',
            'GSFC University Laboratory'
        ];
        
        let currentStringIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deleteSpeed = 50;
        let pauseBetween = 2000;
        
        function type() {
            const currentString = typedStrings[currentStringIndex];
            
            if (isDeleting) {
                // Delete character
                typedTextElement.textContent = currentString.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = deleteSpeed;
            } else {
                // Type character
                typedTextElement.textContent = currentString.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            // Check if we've finished the current string
            if (!isDeleting && currentCharIndex === currentString.length) {
                // Pause at the end of the string
                typingSpeed = pauseBetween;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                // Move to the next string
                isDeleting = false;
                currentStringIndex = (currentStringIndex + 1) % typedStrings.length;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing effect after a delay
        setTimeout(type, 1000);
    }


    // Instrument Slider with Drag Functionality
    const slider = document.querySelector('.instrument-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll faster
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        }, { passive: true });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        }, { passive: false });
    }

    // Modal Functionality for Instrument Details
    const modal = document.getElementById('instrumentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when clicking on instrument details button
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const instrumentId = this.getAttribute('data-instrument');
            const detailsContent = document.getElementById(`${instrumentId}-details`);
            
            if (detailsContent) {
                modalTitle.textContent = this.closest('.instrument-card').querySelector('h3').textContent;
                modalBody.innerHTML = detailsContent.innerHTML;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = {};
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
