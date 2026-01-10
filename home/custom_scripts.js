
// Multi-Select Button Logic
document.addEventListener('DOMContentLoaded', () => {
    // Select all selection grids
    const selectionGrids = document.querySelectorAll('.selection-grid');

    selectionGrids.forEach(grid => {
        const targetInputId = grid.getAttribute('data-target');
        const hiddenInput = document.getElementById(targetInputId);

        if (!hiddenInput) return;

        const buttons = grid.querySelectorAll('.select-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active class
                btn.classList.toggle('active');

                // Collect selected values
                const selectedValues = Array.from(buttons)
                    .filter(b => b.classList.contains('active'))
                    .map(b => b.getAttribute('data-value'));

                // Update hidden input
                hiddenInput.value = selectedValues.join(', ');

                console.log(`Updated ${targetInputId}:`, hiddenInput.value); // Debug
            });
        });
    });

    // EmailJS Initialization
    emailjs.init("YOBhFm4VvFWDF0o2P");

    const contactForm = document.querySelector('.contact-form-side form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            // Validate Multi-Selects
            const country = document.getElementById('country').value;
            const category = document.getElementById('category').value;

            if (!country || !category) {
                alert("Please select at least one Country and Product Category.");
                return;
            }

            // Loading State
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                country: country,
                category: category,
                message: document.getElementById('message').value,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) // e.g. 10 January 2026
            };

            // 1. Send Admin Email
            emailjs.send('service_ihlwhum', 'template_nhfefsb', templateParams)
                .then(() => {
                    console.log("Admin email sent.");

                    // 2. Send User Confirmation Email
                    // Note: Ensure the second template uses {{email}} as the To address
                    return emailjs.send('service_ihlwhum', 'template_fzcwz18', templateParams);
                })
                .then(() => {
                    console.log("User confirmation email sent.");

                    // Success State (After both succeed)
                    btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                    btn.style.backgroundColor = '#28a745';
                    btn.style.borderColor = '#28a745';
                    btn.style.color = '#fff';
                    btn.style.opacity = '1';

                    // Reset form and buttons
                    contactForm.reset();
                    document.querySelectorAll('.select-btn').forEach(b => b.classList.remove('active'));
                    document.getElementById('country').value = "";
                    document.getElementById('category').value = "";

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 4000);
                })
                .catch((error) => {
                    // Error State
                    console.error('FAILED...', error);
                    btn.innerHTML = 'Failed to Send <i class="fas fa-exclamation-circle"></i>';
                    btn.style.backgroundColor = '#dc3545';
                    btn.style.borderColor = '#dc3545';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                        btn.disabled = false;
                    }, 3000);

                    // Show detailed error for debugging
                    alert("EmailJS Error: " + JSON.stringify(error));
                });
        });
    }
});

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter-text');
const typeWriterCursor = document.querySelector('.typewriter-cursor');

if (typewriterText) {
    const words = ["Trade", "Business", "Journey", "Export"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster resizing
        } else {
            typewriterText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // Normal typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing word
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start
    setTimeout(type, 1000);
}
