
        /*=================== ── SCROLL TO TOP=============================== ── */
        scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        /* ── DESKTOP DROPDOWN: close when clicking outside ── */
        document.addEventListener('click', e => {
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            }
        });