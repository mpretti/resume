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

    // Add print button on larger screens
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

        // Create theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.title = 'Toggle dark/light mode';
        
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
        
        document.body.appendChild(themeToggle);
    }

    // Add theme toggle on larger screens
    if (window.innerWidth > 768) {
        initThemeToggle();
    }
    
    // Initialize animated avatar
    initializeAnimatedAvatar();
    
    // Initialize mode toggle
    if (window.innerWidth > 768) {
        initializeModeToggle();
    }

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
    const canvas = document.getElementById('realImageCanvas');
    const ctx = canvas.getContext('2d');
    const animatedAvatar = document.querySelector('.animated-avatar');
    
    // Create a more detailed avatar using canvas
    function drawAvatar() {
        const size = 120;
        ctx.clearRect(0, 0, size, size);
        
        // Background circle
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#2563eb');
        gradient.addColorStop(1, '#1e40af');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Face
        ctx.fillStyle = '#f4d1ae';
        ctx.beginPath();
        ctx.arc(size/2, size/2 - 5, 35, 0, 2 * Math.PI);
        ctx.fill();
        
        // Hair
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.arc(size/2, size/2 - 20, 30, Math.PI, 2 * Math.PI);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(size/2 - 10, size/2 - 10, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(size/2 + 10, size/2 - 10, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Smile
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(size/2, size/2 - 5, 15, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        
        // Body/Shirt
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(size/2 - 25, size/2 + 25, 50, 35);
        
        // Tie
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(size/2 - 5, size/2 + 25, 10, 25);
    }
    
    // Draw the avatar initially
    drawAvatar();
    
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
    
    // Load real LinkedIn image into canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
        const realCanvas = document.getElementById('realImageCanvas');
        const realCtx = realCanvas.getContext('2d');
        realCtx.clearRect(0, 0, 120, 120);
        realCtx.save();
        realCtx.beginPath();
        realCtx.arc(60, 60, 60, 0, 2 * Math.PI);
        realCtx.clip();
        realCtx.drawImage(img, 0, 0, 120, 120);
        realCtx.restore();
    };
    
    // Use a placeholder for now - you can replace this with your actual LinkedIn image URL
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiMyNTYzZWIiLz4KPGNpcmNsZSBjeD0iNjAiIGN5PSI0NSIgcj0iMjAiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMCA5NUMyMCA4MCA0MCA2NSA2MCA2NVM5MCA4MCA5MCA5NSIgZmlsbD0id2hpdGUiLz4KPHRleHQgeD0iNjAiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TVA8L3RleHQ+Cjwvc3ZnPgo=';
}

// Fun/Professional Mode Toggle
function initializeModeToggle() {
    let isFunMode = true; // Default to fun mode
    
    // Create mode toggle button
    const modeToggle = document.createElement('button');
    modeToggle.className = 'mode-toggle';
    modeToggle.setAttribute('aria-label', 'Toggle fun/professional mode');
    modeToggle.title = 'Switch between fun and professional resume formats';
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
    
    document.body.appendChild(modeToggle);
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