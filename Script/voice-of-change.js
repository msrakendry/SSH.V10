/**
 * Sudan Sustainability Hub - Voices of Change Component Logic
 * Manages modal interactions, story transitions, and accessibility.
 */
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeBtn');
    const voiceSection = document.getElementById('voices-of-change');

    if (modal && closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Close on background click
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

    // Subtle fade-in observer for Voices of Change section
    if (voiceSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(voiceSection);
    }
});
