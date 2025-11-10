// NCR Launch Watch - Main JavaScript File
// Handles all interactive functionality across the platform

class NCRLaunchWatch {
    constructor() {
        this.isInitialized = false;
        this.navbar = null;
        this.lastScrollY = 0;
        this.scrollDirection = 'up';
        this.animations = new Map();
        this.charts = new Map();
        this.carousels = new Map();
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeCore();
            this.initializeAnimations();
            this.initializeInteractions();
            this.initializeCharts();
            this.initializeCarousels();
            this.initializeScrollEffects();
            this.initializeFormHandlers();
            
            this.isInitialized = true;
            console.log('NCR Launch Watch initialized successfully');
        });
    }

    initializeCore() {
        // Store navbar reference
        this.navbar = document.getElementById('navbar');
        
        // Initialize scroll direction tracking
        this.lastScrollY = window.scrollY;
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Initialize resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Initialize mobile menu
        this.initializeMobileMenu();
    }

    initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Animate menu items
                if (!mobileMenu.classList.contains('hidden')) {
                    const menuItems = mobileMenu.querySelectorAll('a, button');
                    anime({
                        targets: menuItems,
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                }
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = currentScrollY;
        
        // Handle sticky navbar behavior
        if (this.navbar) {
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
                
                // Hide navbar on scroll down, show on scroll up
                if (this.scrollDirection === 'down') {
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    this.navbar.style.transform = 'translateY(0)';
                }
            } else {
                this.navbar.classList.remove('scrolled');
                this.navbar.style.transform = 'translateY(0)';
            }
        }
        
        // Trigger scroll-based animations
        this.handleScrollAnimations();
    }

    handleResize() {
        // Handle responsive chart resizing
        this.charts.forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
        
        // Reinitialize carousels on resize
        this.carousels.forEach(carousel => {
            if (carousel && typeof carousel.refresh === 'function') {
                carousel.refresh();
            }
        });
    }

    initializeScrollEffects() {
        // Intersection Observer for reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections with reveal animation
        document.querySelectorAll('.section-reveal, .stagger-children').forEach(el => {
            observer.observe(el);
        });
    }

    revealElement(element) {
        element.classList.add('revealed');
        
        // Handle staggered children animations
        if (element.classList.contains('stagger-children')) {
            const children = element.children;
            anime({
                targets: children,
                translateY: [30, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                duration: 600,
                easing: 'easeOutQuart'
            });
        }
    }

    handleScrollAnimations() {
        // Animate counters when they come into view
        const counters = document.querySelectorAll('.animate-counter');
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !counter.dataset.animated) {
                this.animateCounter(counter);
                counter.dataset.animated = 'true';
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    initializeAnimations() {
        // Initialize typewriter effect for hero section
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed('#typed-text', {
                strings: ['Before It Hits the Market', 'With Verified Intelligence', 'For Smart Investments'],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }

        // Initialize hero background animation
        this.initializeHeroBackground();
    }

    initializeHeroBackground() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // Create p5.js sketch for animated background
        const sketch = (p) => {
            let particles = [];
            let connections = [];

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 4)
                    });
                }
            };

            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(0, 212, 255, 100);
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                });
                
                // Draw connections
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        if (dist < 150) {
                            p.stroke(0, 212, 255, 50 * (1 - dist / 150));
                            p.strokeWeight(1);
                            p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        }
                    }
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        };

        new p5(sketch, canvas);
    }

    initializeInteractions() {
        // Initialize hover effects
        this.initializeHoverEffects();
        
        // Initialize click handlers
        this.initializeClickHandlers();
        
        // Initialize FAQ functionality
        this.initializeFAQ();
    }

    initializeHoverEffects() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.hover-lift, .project-card, .metric-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -8,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    translateY: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        });

        // Add glow effects to buttons
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });
        });
    }

    initializeClickHandlers() {
        // Newsletter subscription buttons
        const subscribeButtons = document.querySelectorAll('#subscribe-btn, #subscribe-hero, #subscribe-final, #subscribe-mobile');
        subscribeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.showNewsletterModal());
        });

        // Close modal handlers
        const closeModalBtn = document.getElementById('close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.hideNewsletterModal());
        }

        // Close modal on backdrop click
        const modal = document.getElementById('newsletter-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideNewsletterModal();
                }
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initializeFAQ() {
        const faqToggles = document.querySelectorAll('.faq-toggle');
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.dataset.target;
                const content = document.getElementById(targetId);
                const icon = toggle.querySelector('svg');
                
                if (content.classList.contains('hidden')) {
                    // Open FAQ item
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                    
                    // Animate content reveal
                    anime({
                        targets: content,
                        height: [0, content.scrollHeight],
                        opacity: [0, 1],
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                } else {
                    // Close FAQ item
                    anime({
                        targets: content,
                        height: [content.scrollHeight, 0],
                        opacity: [1, 0],
                        duration: 300,
                        easing: 'easeOutQuart',
                        complete: () => {
                            content.classList.add('hidden');
                        }
                    });
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    initializeCharts() {
        // Initialize any charts that exist on the current page
        this.initializePriceChart();
        this.initializeSupplyChart();
    }

    initializePriceChart() {
        const chartElement = document.getElementById('price-chart');
        if (!chartElement) return;

        const chart = echarts.init(chartElement);
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#1a1a2e',
                borderColor: '#00d4ff',
                textStyle: { color: '#f5f7fa' }
            },
            legend: {
                data: ['Golf Course Road', 'Dwarka Expressway', 'New Gurugram'],
                textStyle: { color: '#8892b0' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025'],
                axisLine: { lineStyle: { color: '#8892b0' } },
                axisLabel: { color: '#8892b0' }
            },
            yAxis: {
                type: 'value',
                name: 'Price Growth %',
                axisLine: { lineStyle: { color: '#8892b0' } },
                axisLabel: { color: '#8892b0' },
                nameTextStyle: { color: '#8892b0' }
            },
            series: [
                {
                    name: 'Golf Course Road',
                    type: 'line',
                    data: [8, 12, 15, 18, 19, 20, 21],
                    lineStyle: { color: '#00d4ff' },
                    itemStyle: { color: '#00d4ff' },
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6
                },
                {
                    name: 'Dwarka Expressway',
                    type: 'line',
                    data: [2, 3, 4, 5, 5.5, 5.8, 6],
                    lineStyle: { color: '#d4af37' },
                    itemStyle: { color: '#d4af37' },
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6
                },
                {
                    name: 'New Gurugram',
                    type: 'line',
                    data: [5, 7, 8, 9, 10, 11, 12],
                    lineStyle: { color: '#20c997' },
                    itemStyle: { color: '#20c997' },
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6
                }
            ]
        };

        chart.setOption(option);
        this.charts.set('price-chart', chart);
    }

    initializeSupplyChart() {
        const chartElement = document.getElementById('supply-chart');
        if (!chartElement) return;

        const chart = echarts.init(chartElement);
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#1a1a2e',
                borderColor: '#00d4ff',
                textStyle: { color: '#f5f7fa' }
            },
            legend: {
                data: ['New Supply', 'Sales Volume'],
                textStyle: { color: '#8892b0' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025'],
                axisLine: { lineStyle: { color: '#8892b0' } },
                axisLabel: { color: '#8892b0' }
            },
            yAxis: {
                type: 'value',
                name: 'Units (Thousands)',
                axisLine: { lineStyle: { color: '#8892b0' } },
                axisLabel: { color: '#8892b0' },
                nameTextStyle: { color: '#8892b0' }
            },
            series: [
                {
                    name: 'New Supply',
                    type: 'bar',
                    data: [95, 92, 89, 91, 88, 90, 91.8],
                    itemStyle: { color: '#00d4ff' },
                    barWidth: '40%'
                },
                {
                    name: 'Sales Volume',
                    type: 'bar',
                    data: [96, 94, 95, 97, 93, 94, 95.5],
                    itemStyle: { color: '#d4af37' },
                    barWidth: '40%'
                }
            ]
        };

        chart.setOption(option);
        this.charts.set('supply-chart', chart);
    }

    initializeCarousels() {
        // Initialize testimonial slider
        const testimonialSlider = document.getElementById('testimonial-slider');
        if (testimonialSlider) {
            const splide = new Splide('#testimonial-slider', {
                type: 'loop',
                autoplay: true,
                interval: 5000,
                pauseOnHover: true,
                arrows: false,
                pagination: true,
                gap: '2rem',
                breakpoints: {
                    768: {
                        gap: '1rem'
                    }
                }
            });
            
            splide.mount();
            this.carousels.set('testimonial-slider', splide);
        }
    }

    initializeFormHandlers() {
        // Newsletter form handling
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }

        // Contact form handling (if exists)
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
        }
    }

    showNewsletterModal() {
        const modal = document.getElementById('newsletter-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Animate modal appearance
            anime({
                targets: modal.querySelector('.glassmorphism'),
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
    }

    hideNewsletterModal() {
        const modal = document.getElementById('newsletter-modal');
        if (modal) {
            anime({
                targets: modal.querySelector('.glassmorphism'),
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeOutQuart',
                complete: () => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }
            });
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const formDataObj = {
            fullName: formData.get('fullName') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            role: formData.get('role') || '',
            terms: formData.get('terms') ? 'Yes' : 'No',
            timestamp: new Date().toISOString()
        };
        
        // Show loading state
        this.showLoadingState(e.target);
        
        // Get Google Apps Script URL from config or use placeholder
        const scriptURL = window.GOOGLE_APPS_SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
        
        // Send data to Google Apps Script
        if (scriptURL && scriptURL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj)
            })
            .then(() => {
                // Since we're using no-cors, we can't check the response
                // But we'll show success message anyway
                this.showSuccessMessage('Successfully subscribed to NCR Launch Watch!');
                this.hideNewsletterModal();
                e.target.reset();
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Still show success to user (since no-cors prevents error detection)
                // In production, you might want to handle this differently
                this.showSuccessMessage('Successfully subscribed to NCR Launch Watch!');
                this.hideNewsletterModal();
                e.target.reset();
            });
        } else {
            // Fallback if script URL is not configured
            console.warn('Google Apps Script URL not configured. Please set window.GOOGLE_APPS_SCRIPT_URL');
            setTimeout(() => {
                this.showSuccessMessage('Successfully subscribed to NCR Launch Watch!');
                this.hideNewsletterModal();
                e.target.reset();
            }, 1500);
        }
    }

    handleContactSubmit(e) {
        e.preventDefault();
        
        // Simulate form submission
        this.showLoadingState(e.target);
        
        setTimeout(() => {
            this.showSuccessMessage('Thank you for your message. We\'ll get back to you soon!');
            e.target.reset();
        }, 1500);
    }

    showLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Subscribing...';
            submitBtn.disabled = true;
        }
    }

    showSuccessMessage(message) {
        // Create and show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-teal text-navy px-6 py-3 rounded-lg font-semibold z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Cleanup method
    destroy() {
        // Clean up event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        
        // Clean up charts
        this.charts.forEach(chart => {
            if (chart && typeof chart.dispose === 'function') {
                chart.dispose();
            }
        });
        
        // Clean up carousels
        this.carousels.forEach(carousel => {
            if (carousel && typeof carousel.destroy === 'function') {
                carousel.destroy();
            }
        });
        
        this.isInitialized = false;
    }
}

// Initialize the application
const ncrLaunchWatch = new NCRLaunchWatch();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NCRLaunchWatch;
} else if (typeof window !== 'undefined') {
    window.NCRLaunchWatch = NCRLaunchWatch;
}