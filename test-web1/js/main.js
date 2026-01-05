/**
 * Main JavaScript for Startup CEO Profile Page
 * Handles interactivity, animations, and scroll effects
 */

// =============================================
// 1. Navbar Scroll Effect
// =============================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.add('border-b');
        navbar.classList.remove('border-b-transparent');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.remove('border-b');
        navbar.classList.add('border-b-transparent');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    }
});

// =============================================
// 2. Mobile Menu Toggle
// =============================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.animation = 'slideDown 0.3s ease-out forwards';
    } else {
        mobileMenu.classList.add('hidden');
    }
});

// Close menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuOpen = false;
    });
});

// =============================================
// 3. Smooth Scroll Navigation
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// 4. Intersection Observer for Scroll Animations
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';

            // Optional: unobserve after animation
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// =============================================
// 5. Email Copy to Clipboard
// =============================================

const emailCard = document.querySelector('a[href^="mailto:"]');
if (emailCard) {
    emailCard.addEventListener('click', function(e) {
        const email = 'junho.kim@techvision.com';

        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Show toast notification
            showToast('이메일이 클립보드에 복사되었습니다!');
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
        });
    });
}

// =============================================
// 6. Toast Notification
// =============================================

function showToast(message, duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed bottom-4 left-4 right-4 sm:right-auto bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
    toast.style.animation = 'slideIn 0.3s ease-out forwards';

    document.body.appendChild(toast);

    // Remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// =============================================
// 7. Add Slide In/Out Animations
// =============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// =============================================
// 8. Active Navigation Link Highlighting
// =============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-startup-purple');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('text-startup-purple');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// =============================================
// 9. Lazy Load External Links
// =============================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('mouseenter', function() {
        // Preload the link
        const preload = document.createElement('link');
        preload.rel = 'prefetch';
        preload.href = this.href;
        document.head.appendChild(preload);
    });
});

// =============================================
// 10. Parallax Effect on Hero Section
// =============================================

const heroSection = document.getElementById('about');
if (heroSection) {
    const backgroundBlobs = heroSection.querySelectorAll('.float-blob');

    window.addEventListener('scroll', () => {
        const scrollProgress = window.scrollY / window.innerHeight;

        if (scrollProgress < 1) {
            backgroundBlobs.forEach((blob, index) => {
                const speed = 0.5 - (index * 0.1);
                blob.style.transform = `translateY(${scrollProgress * 100 * speed}px)`;
            });
        }
    });
}

// =============================================
// 11. Keyboard Navigation Support
// =============================================

document.addEventListener('keydown', (e) => {
    // Skip to main content (Shift + Space)
    if (e.shiftKey && e.code === 'Space') {
        e.preventDefault();
        document.querySelector('main').focus();
    }

    // Close mobile menu (Escape)
    if (e.key === 'Escape' && menuOpen) {
        menuOpen = false;
        mobileMenu.classList.add('hidden');
    }
});

// =============================================
// 12. Performance Optimization
// =============================================

// Debounce scroll events
function debounce(func, wait) {
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

const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 100);

// Replace direct scroll listener with debounced version for better performance
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedScroll);

// =============================================
// 13. Image Loading Optimization
// =============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =============================================
// 14. Handle Page Visibility
// =============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - stop animations if needed
        document.querySelectorAll('.float-blob').forEach(blob => {
            blob.style.animationPlayState = 'paused';
        });
    } else {
        // Page is visible - resume animations
        document.querySelectorAll('.float-blob').forEach(blob => {
            blob.style.animationPlayState = 'running';
        });
    }
});

// =============================================
// 15. Initialize on Page Load
// =============================================

window.addEventListener('load', () => {
    // Trigger animations for already visible elements
    const elements = document.querySelectorAll('.fade-in-up');

    elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            // Element is visible on load
            el.style.opacity = '1';
            el.style.animation = `fadeInUp 0.8s ease-out forwards`;
            el.style.animationDelay = `${index * 0.1}s`;
        }
    });

    // Optimize images
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
});

// =============================================
// 16. Service Worker Registration (Optional)
// =============================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker for offline support
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('sw.js');
    // });
}

// =============================================
// 17. Error Handling
// =============================================

window.addEventListener('error', (e) => {
    console.error('에러 발생:', e.message);
    // Optionally send error to analytics
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('처리되지 않은 Promise 거부:', e.reason);
    // Optionally send error to analytics
});

// =============================================
// 18. Utility Functions
// =============================================

/**
 * Utility function to animate numbers
 */
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom > 0 &&
        rect.right > 0
    );
}

/**
 * Utility function for smooth scroll to element
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// =============================================
// 19. Analytics Tracking (Optional)
// =============================================

// Track page views
window.addEventListener('load', () => {
    // Uncomment to track page views
    // trackPageView(window.location.pathname);
});

// Track external link clicks
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        // Uncomment to track external link clicks
        // trackEvent('external_link_click', { url: this.href });
    });
});

// =============================================
// 20. Console Welcome Message
// =============================================

console.log(
    '%cWelcome to TechVision Labs! 🚀',
    'color: #667eea; font-size: 16px; font-weight: bold;'
);
console.log(
    '%c기술과 디자인으로 더 나은 세상을 만들어갑니다.',
    'color: #f093fb; font-size: 14px;'
);

// =============================================
// End of JavaScript
// =============================================
