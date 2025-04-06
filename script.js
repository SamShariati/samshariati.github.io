// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Removed createPixels function call since we're removing that feature
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add active class to nav items on scroll
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Add animation to project cards
    animateProjectCards();
    
    // Initialize project popup functionality
    initializeProjectPopups();
});

// Function to create random pixel elements in the background
// Function is kept but not called anymore
function createPixels() {
    const pixelBg = document.querySelector('.pixel-bg');
    if (!pixelBg) return; // Safety check
    
    const colors = ['#ff3366', '#39c5ff', '#39ff9c', '#ffff39', '#9c39ff'];
    
    // Create 25 random pixels (reduced from 50)
    for (let i = 0; i < 25; i++) {
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
    const projectCards = document.querySelectorAll('.project-card, .big-project-card');
    
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

// Project popup functionality
function initializeProjectPopups() {
    console.log("Initializing project popups");
    
    // Get all required elements
    const bigProjectCards = document.querySelectorAll('.big-project-card');
    const smallProjectCards = document.querySelectorAll('.project-card');
    const popupOverlay = document.getElementById('project-popup-overlay');
    const popup = document.querySelector('.project-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.querySelector('.popup-content');
    const closeBtn = document.querySelector('.close-popup');
    
    // For debugging
    console.log("Big project cards:", bigProjectCards.length);
    console.log("Small project cards:", smallProjectCards.length);
    
    // Add click event to big project cards
    bigProjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            console.log("Big project clicked:", projectId);
            openProjectPopup(projectId);
        });
        
        // Make the View Details button work too
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click from firing
                const projectId = card.getAttribute('data-project');
                console.log("Big project view details clicked:", projectId);
                openProjectPopup(projectId);
            });
        }
    });
    
    // Add click event to small project cards
    smallProjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            console.log("Small project clicked:", projectId);
            openProjectPopup(projectId);
        });
        
        // Make the View Details button work too
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click from firing
                const projectId = card.getAttribute('data-project');
                console.log("Small project view details clicked:", projectId);
                openProjectPopup(projectId);
            });
        }
    });
    
    // Close popup when clicking the close button
    closeBtn.addEventListener('click', closePopup);
    
    // Close popup when clicking outside the popup content
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Close popup when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
    
    // Function to open project popup
    function openProjectPopup(projectId) {
        // Get the right template
        const template = document.getElementById(`${projectId}-template`);
        if (!template) {
            console.error("Template not found for:", projectId);
            return;
        }
        
        console.log("Opening popup for:", projectId);
        
        // Clone the template content
        const content = template.content.cloneNode(true);
        
        // Clear previous content and add the new content
        popupContent.innerHTML = '';
        popupContent.appendChild(content);
        
        // Set the title
        const projectTitle = document.querySelector(`[data-project="${projectId}"] h3`).textContent;
        popupTitle.textContent = projectTitle;
        
        // Add tab functionality
        setupTabs();
        
        // Show the popup
        popupOverlay.classList.add('active');
        
        // Prevent scrolling on the body while popup is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close the popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        
        // Re-enable scrolling
        document.body.style.overflow = '';
    }
    
    // Function to handle tab switching
    function setupTabs() {
        const tabButtons = popupContent.querySelectorAll('.tab-btn');
        const tabContents = popupContent.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the tab to activate
                const tabType = this.getAttribute('data-tab');
                
                // Find the correct tab content to show
                // First, determine which project type we're dealing with
                const projectId = popupTitle.textContent;
                let tabIdToActivate;
                
                // For debugging
                console.log("Tab clicked:", tabType, "for project:", projectId);
                
                // Handle different tab IDs based on project type
                if (projectId.includes('Chained')) {
                    tabIdToActivate = tabType + '2';
                } else if (projectId === "Champion's Dispute") {
                    tabIdToActivate = tabType;
                } else {
                    // This is for smaller projects
                    // Find which small project number we're dealing with
                    const smallProjectNum = popupContent.querySelector('.popup-section')
                        .innerHTML.includes('small-project1') ? '1' : 
                        popupContent.querySelector('.popup-section')
                        .innerHTML.includes('small-project2') ? '2' : 
                        popupContent.querySelector('.popup-section')
                        .innerHTML.includes('small-project3') ? '3' : '4';
                    
                    tabIdToActivate = tabType + '-small' + smallProjectNum;
                }
                
                console.log("Activating tab:", tabIdToActivate);
                
                // Set active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Set active tab content
                tabContents.forEach(content => content.classList.remove('active'));
                
                const targetTabContent = popupContent.querySelector(`#${tabIdToActivate}`);
                if (targetTabContent) {
                    targetTabContent.classList.add('active');
                } else {
                    console.error("Tab content not found:", tabIdToActivate);
                }
            });
        });
    }
}