// Mobile Navigation Toggle and Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Hamburger menu toggle for mobile
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active menu item based on scroll position
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            if (section.offsetTop <= scrollPosition && 
                (section.offsetTop + section.offsetHeight) > scrollPosition) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + section.getAttribute('id')) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Day tabs functionality for Places We Visited section
    setupDayTabs();
    
    // Photo slider functionality
    setupPhotoSliders();

    // Google Maps functionality has been removed
    // Initialize other components
});

// Image Gallery Functionality
function setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // This would typically open a lightbox or modal with the full image
            // For now, we'll just log since we're using placeholders
            console.log('Gallery item clicked:', this);
        });
    });
}

// Animate elements when they come into view
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.company-card, .speaker-card, .reflection-card, .gallery-item, .organizer-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Setup day tabs functionality for Places We Visited section - removed since we no longer have day tabs
function setupDayTabs() {
    // Function kept for compatibility but no longer needed
    return;
}

// Setup photo sliders for place cards
function setupPhotoSliders() {
    const photoSliders = document.querySelectorAll('.photo-slider');
    
    if (!photoSliders.length) return;
    
    photoSliders.forEach(slider => {
        const photos = slider.querySelectorAll('.slider-photo');
        const dots = slider.querySelectorAll('.slider-dot');
        
        if (!photos.length || !dots.length) return;
        
        // Set up dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Hide all photos
                photos.forEach(photo => photo.classList.remove('active'));
                
                // Show selected photo
                if (photos[index]) {
                    photos[index].classList.add('active');
                }
                
                // Update dots
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
        
        // Auto-rotate photos every 5 seconds
        let currentIndex = 0;
        
        function rotatePhotos() {
            currentIndex = (currentIndex + 1) % photos.length;
            
            // Hide all photos
            photos.forEach(photo => photo.classList.remove('active'));
            
            // Show next photo
            photos[currentIndex].classList.add('active');
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }
        
        // Set interval for auto-rotation (only if there are multiple photos)
        if (photos.length > 1) {
            setInterval(rotatePhotos, 5000);
        }
    });
}

// Setup carousel for places visited
function setupPlacesCarousel() {
    console.log('Setting up places carousel');
    const carousels = document.querySelectorAll('.places-carousel');
    
    if (!carousels.length) {
        console.log('No carousels found');
        return;
    }
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const cards = Array.from(carousel.querySelectorAll('.place-card'));
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const indicators = carousel.querySelector('.carousel-indicators');
        
        console.log('Found carousel with', cards.length, 'cards');
        
        if (!container || !cards.length || !prevBtn || !nextBtn || !indicators) {
            console.log('Missing required carousel elements');
            return;
        }
        
        let currentIndex = 0;
        const totalCards = cards.length;
        
        // Clear existing indicators
        indicators.innerHTML = '';
        
        // Create indicator dots
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            indicators.appendChild(dot);
        }
        
        const indicatorDots = indicators.querySelectorAll('.indicator');
        
        // Set up the cards for a standard carousel style
        cards.forEach((card, index) => {
            // Set initial styles for all cards
            card.style.position = 'absolute';
            card.style.top = '0';
            card.style.left = '0';
            card.style.width = '100%';
            card.style.height = 'auto';
            card.style.transition = 'all 0.5s ease';
            card.style.display = 'block';
            
            // Set initial visibility and active state
            if (index === currentIndex) {
                card.style.opacity = '1';
                card.style.zIndex = '5';
                card.style.visibility = 'visible';
                card.classList.add('active');
            } else {
                card.style.opacity = '0';
                card.style.zIndex = '1';
                card.style.visibility = 'hidden';
                card.classList.remove('active');
            }
        });
        
        // Update carousel display with standard transition
        function updateCarousel() {
            // Update all cards visibility
            cards.forEach((card, index) => {
                // Set visibility and active state
                if (index === currentIndex) {
                    // Current card
                    card.style.opacity = '1';
                    card.style.zIndex = '5';
                    card.style.visibility = 'visible';
                    card.classList.add('active');
                } else {
                    // All other cards
                    card.style.opacity = '0';
                    card.style.zIndex = '1';
                    card.style.visibility = 'hidden';
                    card.classList.remove('active');
                }
            });
            
            // Update indicators
            indicatorDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            console.log('Updated carousel to show card', currentIndex);
        }
        
        // Previous button click handler
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });
        
        // Next button click handler
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        });
        
        // Indicator dots click handlers
        indicatorDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Initialize carousel
        updateCarousel();
        
        // Auto-rotate every 5 seconds
        const autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }, 5000);
        
        // Pause auto-rotation when interacting with carousel
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        // Add swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % totalCards;
                updateCarousel();
            } else if (touchEndX > touchStartX + 50) {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updateCarousel();
            }
        }
    });
}

// Setup carousel for companies
function setupCompaniesCarousel() {
    console.log('Setting up companies carousel');
    const carousel = document.querySelector('.companies-carousel');
    
    if (!carousel) {
        console.log('No companies carousel found');
        return;
    }
    
    const container = carousel.querySelector('.carousel-container');
    const cards = Array.from(carousel.querySelectorAll('.company-card'));
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const indicators = carousel.querySelector('.carousel-indicators');
    
    console.log('Found companies carousel with', cards.length, 'cards');
    
    if (!container || !cards.length || !prevBtn || !nextBtn || !indicators) {
        console.log('Missing required carousel elements');
        return;
    }
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Clear existing indicators
    indicators.innerHTML = '';
    
    // Create indicator dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        indicators.appendChild(dot);
    }
    
    // Set up the cards for a standard carousel style
    cards.forEach((card, index) => {
        card.style.position = 'absolute';
        card.style.left = '0';
        card.style.right = '0';
        card.style.opacity = index === 0 ? '1' : '0';
        card.style.zIndex = index === 0 ? '1' : '0';
        card.style.transition = 'opacity 0.5s ease';
    });
    
    // Update carousel display with standard transition
    function updateCarousel() {
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.opacity = '1';
                card.style.zIndex = '1';
            } else {
                card.style.opacity = '0';
                card.style.zIndex = '0';
            }
        });
        
        // Update indicators
        Array.from(indicators.children).forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        console.log('Updated companies carousel to show card', currentIndex);
    }
    
    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });
    
    // Next button click handler
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });
    
    // Indicator click handler
    indicators.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicator')) {
            currentIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        }
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Auto-rotate carousel every 5 seconds
    let autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }, 5000);
    
    // Pause auto-rotation when interacting with carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }, 5000);
    });
    
    // Touch event handling for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }
    }
}

// Call setup functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupGallery();
    setupScrollAnimations();
    setupDayTabs();
    setupPhotoSliders();
    setupPlacesCarousel();
    setupCompaniesCarousel();
    
    // Add animation classes to elements
    document.querySelectorAll('.company-card, .speaker-card, .reflection-card, .gallery-item, .organizer-card').forEach(element => {
        element.classList.add('fade-in');
    });
});

// Add CSS class for animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
