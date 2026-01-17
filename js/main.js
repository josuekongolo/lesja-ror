/**
 * Lesja Rør AS - Main JavaScript
 * Professional VVS Website
 */

(function() {
    'use strict';

    // =========================================
    // DOM Ready
    // =========================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initSmoothScroll();
        initContactForm();
        initActiveNavLink();
        initScrollHeader();
    });

    // =========================================
    // Mobile Navigation Toggle
    // =========================================
    function initMobileNav() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Toggle aria-expanded for accessibility
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    // =========================================
    // Smooth Scroll for Anchor Links
    // =========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or empty
                if (href === '#' || href === '') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without triggering scroll
                    history.pushState(null, null, href);
                }
            });
        });
    }

    // =========================================
    // Contact Form Handler
    // =========================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const spinner = submitBtn ? submitBtn.querySelector('.spinner') : null;
        const successMessage = document.getElementById('form-success');
        const errorMessage = document.getElementById('form-error');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Hide any previous messages
            if (successMessage) successMessage.classList.remove('show');
            if (errorMessage) errorMessage.classList.remove('show');

            // Show loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            if (btnText) btnText.textContent = 'Sender...';
            if (spinner) spinner.classList.remove('hidden');

            // Collect form data
            const formData = {
                name: form.querySelector('#name').value.trim(),
                email: form.querySelector('#email').value.trim(),
                phone: form.querySelector('#phone').value.trim(),
                address: form.querySelector('#address').value.trim(),
                projectType: form.querySelector('#project-type').value,
                description: form.querySelector('#description').value.trim(),
                wantSiteVisit: form.querySelector('#site-visit').checked,
                isUrgent: form.querySelector('#urgent').checked,
                timestamp: new Date().toISOString()
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.projectType || !formData.description) {
                showError();
                return;
            }

            try {
                // Simulate form submission (replace with actual API call)
                // In production, this would send to Resend API or similar
                await simulateFormSubmission(formData);

                // Show success message
                showSuccess();

                // Reset form
                form.reset();

            } catch (error) {
                console.error('Form submission error:', error);
                showError();
            }
        });

        function showSuccess() {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
            if (btnText) btnText.textContent = 'Send Henvendelse';
            if (spinner) spinner.classList.add('hidden');
            if (successMessage) {
                successMessage.classList.add('show');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        function showError() {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
            if (btnText) btnText.textContent = 'Send Henvendelse';
            if (spinner) spinner.classList.add('hidden');
            if (errorMessage) {
                errorMessage.classList.add('show');
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Simulate form submission (replace with actual API integration)
        function simulateFormSubmission(data) {
            return new Promise((resolve, reject) => {
                // Simulate network delay
                setTimeout(() => {
                    // Log the form data (for demo purposes)
                    console.log('Form data submitted:', data);

                    // In production, this would be an actual API call:
                    // Example using fetch:
                    /*
                    fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => {
                        if (response.ok) {
                            resolve(response.json());
                        } else {
                            reject(new Error('Form submission failed'));
                        }
                    })
                    .catch(reject);
                    */

                    // For demo, always succeed
                    resolve({ success: true });
                }, 1500);
            });
        }
    }

    // =========================================
    // Active Navigation Link
    // =========================================
    function initActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');

            // Check if the href matches current path
            if (currentPath.endsWith(href) ||
                (currentPath === '/' && href === 'index.html') ||
                (currentPath.endsWith('/') && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // =========================================
    // Scroll Header Effect
    // =========================================
    function initScrollHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add/remove shadow based on scroll position
            if (currentScroll > 10) {
                header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // =========================================
    // Utility Functions
    // =========================================

    // Debounce function
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

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // =========================================
    // Accessibility Helpers
    // =========================================

    // Trap focus within modal/menu for accessibility
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // =========================================
    // Lazy Loading for Images (Native fallback)
    // =========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src || image.src;
                        imageObserver.unobserve(image);
                    }
                });
            });

            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        }
    }

})();
