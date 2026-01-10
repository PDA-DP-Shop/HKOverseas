// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    const progressCircle = document.querySelector('.loader-progress');
    const percentText = document.querySelector('.loader-percent');

    // Remove scrolling during load
    document.body.style.overflow = 'hidden';

    // 1. Circle & Text Animation
    tl.to(progressCircle, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut"
    })
        .to(percentText, {
            innerText: 100,
            duration: 1.5,
            snap: { innerText: 1 },
            ease: "linear",
            onUpdate: function () {
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerText) + "%";
            }
        }, "<") // Start at same time as circle

        // 2. Preloader Exit
        .to('.loader-design', {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "back.in(1.7)"
        })
        .to('.preloader', {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => {
                document.body.style.overflow = ''; // Re-enable scroll
            }
        })

        // 3. Hero Entrance
        .from('.hero-bg', {
            scale: 1.2,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .from('.hero-title .word', {
            y: '110%',
            duration: 1,
            stagger: 0.05,
            ease: "power4.out"
        }, "-=1")
        .from('.fade-up', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.8");
});