document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    if(hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // Scroll Effect for Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(31, 28, 16, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            header.style.backgroundColor = 'rgba(31, 28, 16, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Simple FAQ Accordion (if present)
    const acc = document.querySelectorAll(".accordion");
    acc.forEach(el => {
        el.addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    });
});
