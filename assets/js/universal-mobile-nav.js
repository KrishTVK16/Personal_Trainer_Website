/**
 * Universal Mobile Navigation JavaScript
 * Dynamically generates a popup mobile menu from existing desktop links.
 */

document.addEventListener('DOMContentLoaded', () => {

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
        // Strategy: Check multiple potential menu sources. Use the first one that yields links.
        const sources = [
            '#offcanvasNavbar .navbar-nav', // Mobile menu source (Bootstrap default)
            '.desktop-menu',                // Custom desktop menu class
            '.navbar-nav',                  // Generic Bootstrap nav
            'nav ul'                        // Fallback generic UL inside nav
        ];

        let linksHTML = '';
        let foundLinks = false;

        for (const selector of sources) {
            const sourceEl = document.querySelector(selector);
            if (sourceEl) {
                const items = sourceEl.querySelectorAll('a'); // Look for any anchors, not just li>a
                if (items.length > 0) {
                    // We found a valid source with links
                    items.forEach(item => {
                        const href = item.getAttribute('href');
                        let text = item.textContent || '';
                        text = text.trim();

                        // Filter out empty links or javascript:void calls if any
                        if (text && href && !href.startsWith('javascript:')) {
                            // Check if active
                            const isActive = item.classList.contains('active') ? 'active' : '';
                            linksHTML += `<li><a href="${href}" class="${isActive}">${text}</a></li>`;
                        }
                    });

                    if (linksHTML) {
                        foundLinks = true;
                        console.log(`Universal Mobile Nav: Harvested links from ${selector}`);
                        break; // Stop after finding the primary menu
                    }
                }
            }
        }

        if (!foundLinks) {
            console.error('Universal Mobile Nav: Failed to find any navigation links in standard locations.');
            // Fallback: Default hardcoded links if absolutely nothing is found (Safety net)
            linksHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="home-2.html">Programs</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="contact.html">Contact</a></li>
            `;
        }

        // 2. Harvest Auth Buttons dynamically
        const authContainer = document.querySelector('.d-lg-flex.gap-2') || document.querySelector('.auth-buttons-source');
        let authHTML = '';
        if (authContainer) {
            const buttons = authContainer.cloneNode(true);
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

    // --- Active Navigation Link Highlighting for Desktop (Optional, kept for consistency) ---
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

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

    console.log('Universal Mobile Navigation (Dynamic) Loaded');
});
