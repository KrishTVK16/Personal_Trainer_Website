/**
 * Backup Page JavaScript - Enhanced Mobile Navigation & Responsive Features
 * Refactored to be dynamic and generic for global use
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Enhanced Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn?.querySelector('i');

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        updateIcon(theme);
    }

    function updateIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    // Check Local Storage or System Preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Event Listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // --- Enhanced Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            backToTopBtn?.classList.add('d-block');
            backToTopBtn?.classList.remove('d-none');
        } else {
            backToTopBtn?.classList.add('d-none');
            backToTopBtn?.classList.remove('d-block');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Dynamic Mobile Navigation - Popup Style ---
    const navbarToggler = document.querySelector('.navbar-toggler');
    let mobileMenuPopup = null;

    // Prevent Bootstrap Offcanvas from triggering
    if (navbarToggler) {
        navbarToggler.removeAttribute('data-bs-toggle');
        navbarToggler.removeAttribute('data-bs-target');
        // Clone the button to remove any existing event listeners attached by Bootstrap
        const newToggler = navbarToggler.cloneNode(true);
        navbarToggler.parentNode.replaceChild(newToggler, navbarToggler);
        
        newToggler.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });
    }

    function createMobileMenu() {
        const popup = document.createElement('div');
        popup.className = 'mobile-menu-popup';
        
        // 1. Harvest Links dynamically
        // Try to find the main desktop menu
        const desktopMenu = document.querySelector('.desktop-menu') || document.querySelector('.navbar-nav');
        let linksHTML = '';
        
        if (desktopMenu) {
            // Clone the links, stripping specific classes if needed, or just extracting href/text
            const items = desktopMenu.querySelectorAll('li a');
            items.forEach(item => {
                const href = item.getAttribute('href');
                const text = item.textContent;
                const isActive = item.classList.contains('active') ? 'active' : '';
                linksHTML += `<li><a href="${href}" class="${isActive}">${text}</a></li>`;
            });
        }

        // 2. Harvest Auth Buttons dynamically
        const authContainer = document.querySelector('.d-lg-flex.gap-2') || document.querySelector('.auth-buttons-source');
        let authHTML = '';
        if (authContainer) {
            // Clone buttons but ensure they stack vertically (add w-100 etc via CSS or class injection)
            const buttons = authContainer.cloneNode(true);
            // Remove d-none classes if present on the container
            buttons.classList.remove('d-none', 'd-lg-flex');
            buttons.classList.add('mobile-auth-buttons');
            authHTML = buttons.outerHTML;
        }

        popup.innerHTML = `
            <button class="close-btn">&times;</button>
            <ul class="nav-links">
                ${linksHTML}
            </ul>
            <div class="auth-buttons-container">
                ${authHTML}
            </div>
        `;
        document.body.appendChild(popup);
        
        // Setup close functionality
        const closeBtn = popup.querySelector('.close-btn');
        const navLinks = popup.querySelectorAll('.nav-links a');
        
        closeBtn.addEventListener('click', closeMobileMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Allow navigation to happen
                setTimeout(closeMobileMenu, 100);
            });
        });
        
        // Close when clicking outside content
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closeMobileMenu();
            }
        });
        
        return popup;
    }
    
    function openMobileMenu() {
        if (!mobileMenuPopup) {
            mobileMenuPopup = createMobileMenu();
        }
        
        // Refresh active state based on current URL
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        const links = mobileMenuPopup.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        mobileMenuPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
    }
    
    function closeMobileMenu() {
        if (mobileMenuPopup) {
            mobileMenuPopup.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scroll
        }
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuPopup?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // --- Responsive Hero Section Height ---
    function adjustHeroHeight() {
        const heroSection = document.querySelector('.hero-section');
        const navbar = document.querySelector('.navbar');
        
        if (heroSection && navbar) {
            const navbarHeight = navbar.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Adjust hero section height based on viewport
            if (window.innerWidth <= 576) {
                heroSection.style.minHeight = `${viewportHeight}px`;
                heroSection.style.marginTop = `-${navbarHeight}px`;
            } else {
                heroSection.style.minHeight = '100vh';
                heroSection.style.marginTop = `-${navbarHeight}px`;
            }
        }
    }

    // Initial adjustment
    adjustHeroHeight();

    // Adjust on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustHeroHeight, 250);
    });

    // --- Active Navigation Link Highlighting for Desktop ---
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Update desktop menu
        const desktopLinks = document.querySelectorAll('.desktop-menu .nav-link');
        desktopLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavLink();

    // --- Console Debug Information ---
    console.log('Backup Page JavaScript Loaded Successfully');
    console.log('Dynamic Mobile Navigation Active');
});
