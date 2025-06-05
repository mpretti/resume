// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items, skill categories, and achievement cards
    document.querySelectorAll('.timeline-item, .skill-category, .achievement-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add stagger effect to timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to skill items
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });

    // Typing effect for hero title
    const heroName = document.querySelector('.hero-title .name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroName.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (target === 25 ? '+' : target === 17 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (target === 25 ? '+' : target === 17 ? '+' : '');
            }
        }, 16);
    }

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    stat.textContent = '0';
                    setTimeout(() => animateCounter(stat, number), 500);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effects to company logos
    document.querySelectorAll('.company-logo').forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add click effect to skill items
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add floating animation to tech orbit items
    document.querySelectorAll('.tech-item').forEach((item, index) => {
        item.style.animationDelay = `${index}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });

    // Add progress bar animation for page loading
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add click tracking for analytics (placeholder)
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', function() {
            const elementText = this.textContent.trim();
            const elementType = this.tagName.toLowerCase();
            console.log(`Clicked ${elementType}: ${elementText}`);
            // Here you could send analytics data to your preferred service
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy({ top: 100, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy({ top: -100, behavior: 'smooth' });
        }
    });

    // Add easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            
            // Add rainbow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            konamiCode = [];
        }
    });

    // Add performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Hide loading indicator if present
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });

    // Add print functionality
    function addPrintStyles() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '<i class="fas fa-print"></i> Print Resume';
        printButton.className = 'btn-secondary';
        printButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1000;
            border-radius: 50px;
            padding: 1rem;
            box-shadow: var(--shadow-lg);
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }

    // Add print button on larger screens only (to avoid crowding mobile)
    if (window.innerWidth > 768) {
        addPrintStyles();
    }

    // Theme toggle functionality with localStorage persistence
    function initThemeToggle() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-theme');
        }

        // Find existing theme toggle button in header
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            // Set initial icon based on current theme
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            themeToggle.addEventListener('click', function() {
                const isDarkMode = document.body.classList.toggle('dark-theme');
                const icon = this.querySelector('i');
                
                // Update icon
                icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
                
                // Save preference to localStorage
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                
                // Update aria-label for accessibility
                this.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
            });
        }
    }

    // Initialize theme toggle on all devices
    initThemeToggle();
    
    // Initialize animated avatar
    initializeAnimatedAvatar();
    
    // Initialize mode toggle on all devices
    initializeModeToggle();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
            
            // Update toggle button icon if it exists
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                const isDark = document.body.classList.contains('dark-theme');
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    });
});

// Animated Avatar Functionality
function initializeAnimatedAvatar() {
    const animatedAvatar = document.querySelector('.animated-avatar');
    
    let isShowingReal = false;
    let animationInterval;
    
    // Auto-flip animation every 4 seconds
    function startAutoFlip() {
        animationInterval = setInterval(() => {
            flipAvatar();
        }, 4000);
    }
    
    function flipAvatar() {
        animatedAvatar.classList.add('flipping');
        
        setTimeout(() => {
            isShowingReal = !isShowingReal;
            animatedAvatar.classList.toggle('show-real', isShowingReal);
            animatedAvatar.classList.remove('flipping');
        }, 400);
    }
    
    // Click to manually flip
    animatedAvatar.addEventListener('click', () => {
        clearInterval(animationInterval);
        flipAvatar();
        // Restart auto-flip after manual interaction
        setTimeout(startAutoFlip, 5000);
    });
    
    // Start the auto-flip animation
    startAutoFlip();
    
    // Load and avatarize your profile image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
        const realCanvas = document.getElementById('realImageCanvas');
        const realCtx = realCanvas.getContext('2d');
        const size = 120;
        
        realCtx.clearRect(0, 0, size, size);
        realCtx.save();
        
        // Create circular clipping path
        realCtx.beginPath();
        realCtx.arc(size/2, size/2, size/2 - 4, 0, 2 * Math.PI);
        realCtx.clip();
        
        // Calculate aspect ratio and positioning for proper cropping without distortion
        const imgAspect = img.width / img.height;
        let sourceX = 0, sourceY = 0, sourceWidth = img.width, sourceHeight = img.height;
        
        if (imgAspect > 1) {
            // Image is wider than tall - crop sides, keep full height
            sourceWidth = img.height; // Make it square by using height as width
            sourceX = (img.width - sourceWidth) / 2; // Center the crop horizontally
        } else {
            // Image is taller than wide - crop top/bottom, keep full width  
            sourceHeight = img.width; // Make it square by using width as height
            sourceY = (img.height - sourceHeight) / 2; // Center the crop vertically
        }
        
        // Draw the properly cropped square portion of the image
        realCtx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, size, size);
        realCtx.restore();
        
        // Add subtle border and shadow effect
        realCtx.save();
        realCtx.beginPath();
        realCtx.arc(size/2, size/2, size/2 - 2, 0, 2 * Math.PI);
        realCtx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
        realCtx.lineWidth = 3;
        realCtx.stroke();
        
        // Add inner highlight
        realCtx.beginPath();
        realCtx.arc(size/2, size/2, size/2 - 5, 0, 2 * Math.PI);
        realCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        realCtx.lineWidth = 1;
        realCtx.stroke();
        realCtx.restore();
    };
    
    // Use your actual profile picture
    img.src = 'mike-pretti-profile.jpg';
}

// Fun/Professional Mode Toggle
function initializeModeToggle() {
    let isFunMode = true; // Default to fun mode
    
    // Find existing mode toggle button in header
    const modeToggle = document.querySelector('.mode-toggle');
    if (modeToggle) {
        // Set initial icon and state
        modeToggle.innerHTML = '<i class="fas fa-briefcase"></i>';
        
        modeToggle.addEventListener('click', function() {
            isFunMode = !isFunMode;
            const icon = this.querySelector('i');
            
            if (isFunMode) {
                // Switch to fun mode
                document.body.classList.remove('professional-mode');
                icon.className = 'fas fa-briefcase';
                this.title = 'Switch to professional format';
            } else {
                // Switch to professional mode
                document.body.classList.add('professional-mode');
                icon.className = 'fas fa-palette';
                this.title = 'Switch to fun format';
            }
        });
    }
}

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
} 