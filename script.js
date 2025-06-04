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

    // Add theme toggle (bonus feature)
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            border: none;
            background: var(--primary-color);
            color: white;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            icon.className = document.body.classList.contains('dark-theme') 
                ? 'fas fa-sun' 
                : 'fas fa-moon';
        });
        
        document.body.appendChild(themeToggle);
    }

    // Add theme toggle on larger screens
    if (window.innerWidth > 768) {
        addThemeToggle();
    }
});

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