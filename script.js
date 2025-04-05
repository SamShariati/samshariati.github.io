// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Add animated pixels to the background
    createPixels();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add active class to nav items on scroll
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Add animation to project cards
    animateProjectCards();
});

// Function to create random pixel elements in the background
function createPixels() {
    const pixelBg = document.querySelector('.pixel-bg');
    const colors = ['#ff3366', '#39c5ff', '#39ff9c', '#ffff39', '#9c39ff'];
    
    // Create 50 random pixels
    for (let i = 0; i < 50; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        
        // Set random position
        const size = Math.random() * 8 + 2; // Size between 2px and 10px
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        pixel.style.position = 'absolute';
        pixel.style.top = `${Math.random() * 100}%`;
        pixel.style.left = `${Math.random() * 100}%`;
        
        // Set random color from our palette
        pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Set random animation delay
        pixel.style.animation = `pixelFloat ${Math.random() * 10 + 5}s infinite`;
        pixel.style.animationDelay = `${Math.random() * 5}s`;
        
        // Append to background
        pixelBg.appendChild(pixel);
    }
}

// Function to set up smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to highlight navigation items based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let scrollPosition = window.scrollY + 100; // Add offset for header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Function to animate project cards on scroll
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        // Set initial state (hidden)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Observe the card
        observer.observe(card);
    });
    
    // Create the CSS class that will be applied
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Add some interactivity to skill items
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 10px rgba(57, 197, 255, 0.7)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Optional: Add typing animation to hero title
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    
    // Clear the title
    heroTitle.textContent = '';
    
    // Add typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            
            // Add blinking cursor after typing is complete
            const cursor = document.createElement('span');
            cursor.classList.add('cursor');
            cursor.textContent = '|';
            heroTitle.appendChild(cursor);
            
            // Blink the cursor
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }, 100);