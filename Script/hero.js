                    // start bigger slide
        const slides = document.querySelectorAll('.gallery-cell');
        const dots   = document.querySelectorAll('.dotgo');
        const counter = document.getElementById('slideCounter');
        const indexNum = document.getElementById('slideIndexNum');
        const indexTotal = document.getElementById('slideIndexTotal');
        const bar     = document.getElementById('progressBar');
        const playBtn = document.getElementById('playPauseBtn');
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');

        const TOTAL = slides.length;    // 5
        const DELAY = 5500;             // ms between slides
        let current = 0;
        let playing = false;
        let timer   = null;
        let barAnim = null;

        function pad(n) { return n < 10 ? '0' + n : '' + n; }

        function goTo(idx) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('activeo');

            current = (idx + TOTAL) % TOTAL;

            slides[current].classList.add('active');
            dots[current].classList.add('activeo');

            counter.textContent = (current + 1) + ' / ' + TOTAL;
            indexNum.textContent = pad(current + 1);
            indexTotal.textContent = '/ ' + pad(TOTAL);

            if (playing) resetBar();
        }

        function resetBar() {
            bar.classList.remove('animating');
            bar.style.width = '0%';
            void bar.offsetWidth; // reflow
            bar.style.transitionDuration = DELAY + 'ms';
            bar.classList.add('animating');
            bar.style.width = '100%';
        }

        function startAuto() {
            playing = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = '';
            resetBar();
            timer = setInterval(() => goTo(current + 1), DELAY);
        }

        function stopAuto() {
            playing = false;
            playIcon.style.display = '';
            pauseIcon.style.display = 'none';
            bar.classList.remove('animating');
            bar.style.width = '0%';
            clearInterval(timer);
        }

        document.getElementById('prevBtn').addEventListener('click', () => {
            stopAuto();
            goTo(current - 1);
        });
        document.getElementById('nextBtn').addEventListener('click', () => {
            stopAuto();
            goTo(current + 1);
        });
        playBtn.addEventListener('click', () => playing ? stopAuto() : startAuto());

        dots.forEach(d => {
            d.addEventListener('click', () => {
            stopAuto();
            goTo(parseInt(d.dataset.index));
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); }
            if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); }
            if (e.key === ' ')          { playing ? stopAuto() : startAuto(); e.preventDefault(); }
        });

        // Init display
        indexTotal.textContent = '/ ' + pad(TOTAL);
        indexNum.textContent   = pad(1);
        counter.textContent    = '1 / ' + TOTAL;
        
        // Auto-slide by default
        startAuto();
            // end bigger slide

