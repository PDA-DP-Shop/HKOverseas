// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;

        // Outline follows with lag
        cursorOutline.animate({
            transform: `translate(${posX}px, ${posY}px) translate(-50%, -50%)`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor Color Change Logic
    const darkSections = document.querySelectorAll('.cta-inner'); // Add other dark selectors here if needed

    darkSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-white');
            cursorOutline.classList.add('cursor-white');
        });

        section.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-white');
            cursorOutline.classList.remove('cursor-white');
        });
    });
}

// Scroll Triggers
// Generic Image Reveal
gsap.utils.toArray('.reveal-image').forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });
});

// Generic Text Reveals
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Stagger Animations for various grids
const staggerGroups = [
    { container: '.grid-3', item: '.service-card' },
    { container: '.values-grid', item: '.value-item' },
    { container: '.export-services-grid', item: '.export-service-card' },
    { container: '.reach-grid-modern', item: '.reach-card' },
    { container: '.product-grid', item: '.product-card' }
];

staggerGroups.forEach(group => {
    const containers = document.querySelectorAll(group.container);
    containers.forEach(container => {
        const items = container.querySelectorAll(group.item);
        if (items.length > 0) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: container,
                    start: 'top 75%',
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });
});

// Stats Counter
const stats = document.querySelectorAll('.counter');
stats.forEach(counter => {
    const target = +counter.getAttribute('data-target');

    ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        }
    });
});

// Parallax Effect for Hero Image
gsap.to('.parallax-img', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100
});

// Navbar Scroll Logic (Hide/Show)
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add 'scrolled' class for background style
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/Show Logic
    // If scrolling DOWN and past threshold -> Hide
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('navbar-hidden');
    }
    // If scrolling UP -> Show
    else {
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle logic
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('active');

        // Optional: Body scroll lock
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Product Filtering Logic
const filterBtns = document.querySelectorAll('.cat-btn');
const productItems = document.querySelectorAll('.product-item-wrapper');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    // Add animation here if desired using GSAP
                    gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
                } else {
                    item.classList.add('hide');
                }
            });

            // Re-trigger scrolllayout refresh if needed
            ScrollTrigger.refresh();
        });
    });
}


