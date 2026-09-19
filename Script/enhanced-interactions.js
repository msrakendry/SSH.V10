/* ==========================================================================
   SUDAN SUSTAINABILITY HUB (SSH) — PREMIUM INTERACTIONS & INJECTION CORE
   High-performance micro-interactions, spring mechanics, particle canvases, and
   dynamic glassmorphic element injection.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject all dynamic premium components first
    injectDynamicComponents();

    // 2. Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        initializeCursorGlow();
        initializeMagnetEffects();
        initializeTiltEffects();
        initializeHeroParticles();
        initializeHeroParallax();
        initializeScrollStory();
    } else {
        // Fallback for reduced motion: instantly reveal scroll elements
        document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    }

    // 3. Initialize stats and accessibility regardless of motion preferences
    initializeStatsCounters();
    setupAccessibilityAids();
});

/* --------------------------------------------------------------------------
   0. Dynamic Design System Injection (Zero HTML Regression)
   -------------------------------------------------------------------------- */
// function injectDynamicComponents() {
//     // A. Inject Navigation Badges
//     const navLinks = document.querySelectorAll('nav a, .SET-drop-menu a, .header-nav a');
//     navLinks.forEach(link => {
//         const text = link.textContent.trim().toLowerCase();
//         let badgeText = '';
//         let badgeClass = '';

//         if (text === 'livelihood') {
//             badgeText = 'Live'; badgeClass = 'live';
//         } else if (text === 'wash' || text === 'water') {
//             badgeText = 'Popular'; badgeClass = 'popular';
//         } else if (text === 'education') {
//             badgeText = 'New'; badgeClass = 'new';
//         } else if (text === 'energy') {
//             badgeText = 'Updated'; badgeClass = 'updated';
//         } else if (text.includes('sme') || text.includes('women')) {
//             badgeText = 'Featured'; badgeClass = 'featured';
//         } else if (text.includes('empowerment')) {
//             badgeText = 'Beta'; badgeClass = 'beta';
//         } else if (text.includes('learn') || text.includes('solar')) {
//             badgeText = 'Live'; badgeClass = 'live';
//         }

//         if (badgeText) {
//             let badgeSpan = link.querySelector('.nav-badge');
//             if (!badgeSpan) {
//                 badgeSpan = document.createElement('span');
//                 badgeSpan.className = 'nav-badge';
//                 link.appendChild(badgeSpan);
//             }
//             badgeSpan.innerHTML = `<span class="smart-badge ${badgeClass}" style="margin-left: 6px; font-size: 0.6rem; padding: 2px 6px;">${badgeText}</span>`;
//         }
//     });

//     // B. Inject Smart Section Labels (mini tags above major h2/h3 headings)
//     const sections = [
//         { selector: '#pillars\\ displayJS', label: 'WHO WE ARE' },
//         { selector: '#water\\ displayJS', label: 'OUR PROGRAMS' },
//         { selector: '#livelihood\\ displayJS', label: 'YOUTH ACTION' },
//         { selector: '#energy\\ displayJS', label: 'SUSTAINABLE ENERGY' },
//         { selector: '#education\\ displayJS', label: 'FUTURE INITIATIVES' },
//         { selector: '.set-MAP', label: 'GLOBAL WORK' },
//         { selector: '#projects\\ displayJS', label: 'ACTIVE CAMPAIGNS' },
//         { selector: '#impact\\ displayJS', label: 'OUR IMPACT' },
//         { selector: '#store\\ displayJS', label: 'YOUTH ACTION' },
//         { selector: '.blog-section', label: 'RESEARCH & STORIES' },
//         { selector: '.partnersACT', label: 'TRUSTED ALLIANCES' }
//     ];

//     sections.forEach(sec => {
//         const el = document.querySelector(sec.selector);
//         if (el) {
//             el.classList.add('reveal-on-scroll', 'fade-up');
//             const title = el.querySelector('.section-title, h2, h3');
//             if (title) {
//                 const labelTag = document.createElement('span');
//                 labelTag.className = 'smart-section-label';
//                 labelTag.textContent = sec.label;
//                 title.parentNode.insertBefore(labelTag, title);
//             }
//         }
//     });

//     // C. Inject Interactive Statistics Section right after Pillars Grid
//     const pillarsSection = document.getElementById('pillars displayJS');
//     if (pillarsSection) {
//         const statsSection = document.createElement('section');
//         statsSection.className = 'section reveal-on-scroll fade-up';
//         statsSection.id = 'interactive-stats';
//         statsSection.style.padding = '70px 0';
//         statsSection.style.background = 'linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.45), transparent)';
        
//         statsSection.innerHTML = `
//             <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
//                 <div style="text-align: center; margin-bottom: 45px;">
//                     <span class="smart-section-label">OUR IMPACT</span>
//                     <h2 style="font-size: 2.6rem; font-weight: 800; color: #ffffff; margin-top: 10px; font-family: 'DM Sans', sans-serif;">Humanitarian Action in Numbers</h2>
//                 </div>
//                 <div class="stagger-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
//                     <div class="animated-stat-container">
//                         <div class="stat-number" data-target="25000">25,000+</div>
//                         <div class="stat-label">People Reached</div>
//                     </div>
//                     <div class="animated-stat-container">
//                         <div class="stat-number" data-target="8000">8,000+</div>
//                         <div class="stat-label">Refugees Supported</div>
//                     </div>
//                     <div class="animated-stat-container">
//                         <div class="stat-number" data-target="120">120+</div>
//                         <div class="stat-label">Projects Completed</div>
//                     </div>
//                     <div class="animated-stat-container">
//                         <div class="stat-number" data-target="50">50+</div>
//                         <div class="stat-label">Research Initiatives</div>
//                     </div>
//                     <div class="animated-stat-container">
//                         <div class="stat-number" data-target="7">7+</div>
//                         <div class="stat-label">Countries Active</div>
//                     </div>
//                 </div>
//             </div>
//         `;
        
//         const pillarsGrid = pillarsSection.querySelector('.pillars-grid') || pillarsSection.querySelector('.container');
//         if (pillarsGrid) {
//             pillarsGrid.parentNode.insertBefore(statsSection, pillarsGrid.nextSibling);
//         } else {
//             pillarsSection.appendChild(statsSection);
//         }
//     }

//     // D. Inject Hero Floating Badges, Floating Labels and Parallax layers
//     const hero = document.getElementById('home');
//     if (hero) {
//         // Overlay container for floaters
//         const floaterContainer = document.createElement('div');
//         floaterContainer.className = 'hero-floater-overlay';
//         floaterContainer.style.position = 'absolute';
//         floaterContainer.style.inset = '0';
//         floaterContainer.style.pointerEvents = 'none';
//         floaterContainer.style.zIndex = '3';
//         hero.appendChild(floaterContainer);

//         // Floating Badges Data
//         const badgesData = [
//             // { text: '70% Female-led', icon: '⭐', x: 12, y: 22, class: 'featured' },
//             // { text: 'Refugee-led Innovation', icon: '🌍', x: 74, y: 18, class: 'live' },
//             // { text: 'Water Access', icon: '💧', x: 80, y: 48, class: 'popular' },
//             // { text: 'Clean Energy', icon: '⚡', x: 15, y: 64, class: 'verified' },
//             // { text: 'Education', icon: '🎓', x: 72, y: 72, class: 'beta' },
//             // { text: 'Peacebuilding', icon: '🕊', x: 28, y: 82, class: 'updated' },
//             // { text: 'SSH Lab', icon: '🔬', x: 85, y: 32, class: 'new' }
//         ];

//         badgesData.forEach((b, idx) => {
//             const badge = document.createElement('div');
//             badge.className = `smart-badge ${b.class} float-element hero-float-badge`;
//             badge.style.position = 'absolute';
//             badge.style.left = `${b.x}%`;
//             badge.style.top = `${b.y}%`;
//             badge.style.animationDelay = `${idx * 0.7}s`;
//             badge.style.pointerEvents = 'auto';
//             badge.innerHTML = `<span>${b.icon}</span> <span style="margin-left: 4px;">${b.text}</span>`;
//             floaterContainer.appendChild(badge);
//         });

//         // Floating Geographic Labels
//         const labelsData = [
//             { text: 'Sudan', x: 18, y: 40, size: '1.2rem', delay: '0s' },
//             { text: 'Uganda', x: 82, y: 20, size: '1.1rem', delay: '1s' },
//             { text: 'Innovation', x: 68, y: 60, size: '1.3rem', delay: '2s' },
//             { text: 'Research', x: 25, y: 15, size: '1rem', delay: '3.5s' },
//             { text: 'Youth', x: 42, y: 88, size: '1.4rem', delay: '1.5s' },
//             { text: 'Peace', x: 88, y: 80, size: '1.2rem', delay: '2.5s' },
//             { text: 'Sustainability', x: 10, y: 76, size: '1.5rem', delay: '4s' }
//         ];

//         labelsData.forEach(l => {
//             const label = document.createElement('div');
//             label.className = 'float-element hero-float-label';
//             label.style.position = 'absolute';
//             label.style.left = `${l.x}%`;
//             label.style.top = `${l.y}%`;
//             label.style.fontSize = l.size;
//             label.style.fontWeight = '800';
//             label.style.color = 'rgba(255, 255, 255, 0.16)';
//             label.style.textTransform = 'uppercase';
//             label.style.letterSpacing = '0.12em';
//             label.style.animationDelay = l.delay;
//             label.style.userSelect = 'none';
//             label.textContent = l.text;
//             floaterContainer.appendChild(label);
//         });
//     }

//     // E. Inject Pillar badges dynamically
//     const pillarData = {
//         // water: { text: '+25K Reached', class: 'live' },
//         // livelihood: { text: '1200 Youth Trained', class: 'featured' },
//         // energy: { text: '15 Solar Projects', class: 'verified' },
//         // education: { text: '6000 Learners', class: 'beta' }
//     };
//     Object.keys(pillarData).forEach(key => {
//         const pillar = document.querySelector(`.pillar-card.${key}`);
//         if (pillar) {
//             const badge = document.createElement('div');
//             badge.className = `smart-badge ${pillarData[key].class}`;
//             badge.style.position = 'absolute';
//             badge.style.top = '15px';
//             badge.style.right = '15px';
//             badge.textContent = pillarData[key].text;
//             pillar.appendChild(badge);
//             pillar.style.position = 'relative';
//         }
//     });

//     // F. Inject SSH Lab and Peacebuilding specific badges on cards
//     // Blog cards injection
//     const blogs = document.querySelectorAll('.blog-card');
//     const blogBadges = ['Trending', 'Research', 'Featured', 'Latest'];
//     blogs.forEach((b, idx) => {
//         const bClass = idx % 2 === 0 ? 'new' : 'live';
//         const badge = document.createElement('div');
//         badge.className = `smart-badge ${bClass}`;
//         badge.style.position = 'absolute';
//         badge.style.top = '12px';
//         badge.style.left = '12px';
//         badge.textContent = blogBadges[idx % blogBadges.length];
//         b.appendChild(badge);
//         b.style.position = 'relative';
//     });

//     // Partners logos injection
//     const partners = document.querySelectorAll('.partner-logo');
//     const partnerBadges = ['Strategic', 'Global Partner', 'Trusted Partner'];
//     partners.forEach((p, idx) => {
//         const badge = document.createElement('div');
//         // badge.className = 'smart-badge verified';
//         // badge.style.position = 'absolute';
//         // badge.style.bottom = '-8px';
//         // badge.style.left = '50%';
//         // badge.style.transform = 'translateX(-50%) scale(0.8)';
//         // badge.style.fontSize = '0.55rem';
//         // badge.style.whiteSpace = 'nowrap';
//         // badge.textContent = partnerBadges[idx % partnerBadges.length];
//         // p.appendChild(badge);
//         // p.style.position = 'relative';
//     });

//     // Footer columns injection
//     const footerCards = document.querySelectorAll('#footer .cardF');
//     const footerBadges = ['Certified NGO', 'Youth Led', 'Women Led', 'Open Innovation'];
//     footerCards.forEach((fc, idx) => {
//         const badge = document.createElement('div');
//         badge.className = 'smart-badge beta';
//         badge.style.marginBottom = '12px';
//         badge.style.fontSize = '0.65rem';
//         badge.textContent = footerBadges[idx % footerBadges.length];
//         fc.insertBefore(badge, fc.firstChild);
//     });

//     // G. Inject Corner Achievement Ribbon
//     // if (hero) {
//     //     const ribbon = document.createElement('div');
//     //     ribbon.className = 'achievement-ribbon glass-ribbon';
//     //     ribbon.innerHTML = `
//     //         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
//     //         <span>🏆 Refugee Innovation Hub Active</span>
//     //     `;
//     //     hero.appendChild(ribbon);
//     // }
// }

/* --------------------------------------------------------------------------
   1. Dynamic Mouse Cursor Glow Tracking
   -------------------------------------------------------------------------- */
function initializeCursorGlow() {
    const glowContainer = document.createElement('div');
    glowContainer.className = 'cursor-glow-container';
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glowContainer.appendChild(glow);
    document.body.appendChild(glowContainer);

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const ease = 0.08;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function updateGlowPosition() {
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        document.documentElement.style.setProperty('--cursor-x', `${currentX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${currentY}px`);
        
        requestAnimationFrame(updateGlowPosition);
    }
    updateGlowPosition();

    const interactables = 'a, button, .work-point, .map-filter-btn, .pillar-card, .btn-enhanced, .btn-23';
    document.querySelectorAll(interactables).forEach(item => {
        item.addEventListener('mouseenter', () => {
            glow.style.width = '420px';
            glow.style.height = '420px';
        });
        item.addEventListener('mouseleave', () => {
            glow.style.width = '300px';
            glow.style.height = '300px';
        });
    });
}

/* --------------------------------------------------------------------------
   2. Spring-based Magnet Hover Pull
   -------------------------------------------------------------------------- */
function initializeMagnetEffects() {
    const magnetSelector = '.btn-enhanced, .btn-23, .smart-badge:not(.hero-float-badge), .map-filter-btn, .map-zoom-btn, .cta-button';
    const magnets = document.querySelectorAll(magnetSelector);

    // magnets.forEach(el => {
    //     el.addEventListener('mousemove', (e) => {
    //         const rect = el.getBoundingClientRect();
    //         const x = e.clientX - rect.left - (rect.width / 2);
    //         const y = e.clientY - rect.top - (rect.height / 2);
    //         const strength = el.classList.contains('btn-enhanced') ? 0.35 : 0.25;

    //         el.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;
    //         el.style.transition = 'transform 0.1s ease-out';
    //     });

    //     el.addEventListener('mouseleave', () => {
    //         el.style.transform = 'translate(0, 0) scale(1)';
    //         el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    //     });
    // });
}

/* --------------------------------------------------------------------------
   3. Mouse-Tracking 3D Card Perspective Tilt
   -------------------------------------------------------------------------- */
function initializeTiltEffects() {
    const cards = document.querySelectorAll('.pillar-card, .program-card, .blog-card, .campaign-card, .report-card, .product-card, .animated-stat-container');

    cards.forEach(card => {
        card.classList.add('card-3d');
        const parent = card.parentElement;
        if (parent && !parent.classList.contains('card-3d-wrapper')) {
            parent.classList.add('card-3d-wrapper');
        }

        // card.addEventListener('mousemove', (e) => {
        //     const rect = card.getBoundingClientRect();
        //     const xVal = (e.clientX - rect.left) / rect.width - 0.5;
        //     const yVal = (e.clientY - rect.top) / rect.height - 0.5;
        //     const maxTilt = 8;
        //     const tiltX = (yVal * maxTilt).toFixed(2);
        //     const tiltY = -(xVal * maxTilt).toFixed(2);

        //     card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        //     card.style.transition = 'transform 0.05s ease-out';
        // });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.transition = 'transform 0.5s ease-in-out';
        });
    });
}

/* --------------------------------------------------------------------------
   4. High-Performance Stats Counters Engine
   -------------------------------------------------------------------------- */
function initializeStatsCounters() {
    const statElements = document.querySelectorAll('.stat-number');
    
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetVal = parseInt(el.dataset.target, 10);
                if (targetVal) {
                    const text = el.textContent.trim();
                    const suffix = text.includes('+') ? '+' : '';
                    animateNumber(el, 0, targetVal, 2000, suffix);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    statElements.forEach(el => {
        // Set data-target from content if not set
        if (!el.dataset.target) {
            const targetText = el.textContent.replace(/,/g, '').match(/\d+/);
            if (targetText) {
                el.dataset.target = targetText[0];
            }
        }
        countUpObserver.observe(el);
    });
}

function animateNumber(element, start, end, duration, suffix) {
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(easeProgress * (end - start) + start);
        
        element.textContent = currentVal.toLocaleString('en-US') + suffix;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = end.toLocaleString('en-US') + suffix;
        }
    }
    requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   5. Interactive Hero Particles & Parallax Engine
   -------------------------------------------------------------------------- */
function initializeHeroParticles() {
    const hero = document.getElementById('home');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';
    canvas.style.opacity = '0.35';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let width = canvas.width = hero.offsetWidth;
    let height = canvas.height = hero.offsetHeight;

    window.addEventListener('resize', () => {
        if (!hero) return;
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * -0.4 - 0.1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
            if (this.x < 0 || this.x > width) {
                this.speedX *= -1;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = Math.floor((width * height) / 12000);
        for (let i = 0; i < Math.min(numberOfParticles, 120); i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

function initializeHeroParallax() {
    const hero = document.getElementById('home');
    if (!hero) return;

    window.addEventListener('mousemove', (e) => {
        const floaters = hero.querySelectorAll('.hero-float-badge, .hero-float-label');
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        floaters.forEach((fl, idx) => {
            const factor = (idx % 3 + 1) * 15;
            fl.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            fl.style.transition = 'transform 0.15s ease-out';
        });
    });
}

/* --------------------------------------------------------------------------
   6. Scroll Story Sequenced Revelations
   -------------------------------------------------------------------------- */
function initializeScrollStory() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .stagger-container');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.12}s`;
                        child.classList.add('reveal-on-scroll', 'fade-up', 'revealed');
                    });
                }
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => scrollObserver.observe(el));
}

/* --------------------------------------------------------------------------
   7. Accessibility and Inclusivity Aids
   -------------------------------------------------------------------------- */
function setupAccessibilityAids() {
    if (!document.getElementById('skip-link')) {
        const skip = document.createElement('a');
        skip.id = 'skip-link';
        skip.href = '#pillars';
        skip.textContent = 'Skip to main content';
        skip.style.position = 'absolute';
        skip.style.top = '-100px';
        skip.style.left = '20px';
        skip.style.background = '#fbbf24';
        skip.style.color = '#000000';
        skip.style.padding = '8px 16px';
        skip.style.zIndex = '99999';
        skip.style.fontWeight = 'bold';
        skip.style.borderRadius = '4px';
        skip.style.transition = 'top 0.3s';
        
        skip.addEventListener('focus', () => {
            skip.style.top = '15px';
        });
        skip.addEventListener('blur', () => {
            skip.style.top = '-100px';
        });
        
        document.body.insertBefore(skip, document.body.firstChild);
    }

    const allButtons = document.querySelectorAll('button, .btn-enhanced, .map-filter-btn, .cta-button');
    allButtons.forEach(btn => {
        if (!btn.getAttribute('role')) {
            btn.setAttribute('role', 'button');
        }
        if (btn.tagName !== 'BUTTON' && btn.getAttribute('tabindex') === null) {
            btn.setAttribute('tabindex', '0');
        }
        
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}
