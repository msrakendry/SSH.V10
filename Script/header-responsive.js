/**
 * ============================================================================
 * Sudan Sustainability Hub (SSH) - Responsive Header Controller
 * File: Script/header-responsive.js
 * 
 * Features:
 * - Mobile drawer slide-in navigation with backdrop overlay
 * - WCAG 2.1 AA keyboard accessibility (Tab focus trap & Escape key)
 * - Mobile accordions with synchronized ARIA states
 * - Desktop dropdown keyboard navigation (Enter, Space, ArrowDown, Esc)
 * - Touch device friendly interactions without hover lock
 * - Sticky header scroll styling
 * - Conflict-free execution (prevents double-toggling if legacy scripts exist)
 * ============================================================================
 */

(function initResponsiveHeader() {
    'use strict';

    function setup() {
        const header = document.getElementById('header');
        const navBg = document.getElementById('navBg');
        const hamburger = document.getElementById('hamburger');
        const mobilePanel = document.getElementById('mobilePanel');
        const mobileClose = document.getElementById('mobileClose');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const navItems = document.querySelectorAll('.nav-primary .nav-item, .nav-primary .idot');
        const accordionBtns = document.querySelectorAll('#mobilePanel [data-accordion]');

        // Avoid multiple initializations on the same elements
        if (hamburger && hamburger.dataset.headerResponsiveInit === 'true') {
            return;
        }
        if (hamburger) {
            hamburger.dataset.headerResponsiveInit = 'true';
        }

        // ---------------------------------------------------------------------
        // 1. MOBILE DRAWER OPEN / CLOSE & FOCUS MANAGEMENT
        // ---------------------------------------------------------------------
        let lastFocusedElement = null;
        let lastToggleTime = 0;

        function getFocusableElements(container) {
            if (!container) return [];
            return Array.from(
                container.querySelectorAll(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
        }

        function openMobileMenu() {
            if (!mobilePanel || !hamburger) return;

            // Close any open desktop/tablet dropdown or three-dots menu
            closeAllDropdowns();

            lastFocusedElement = document.activeElement;
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');

            mobilePanel.classList.add('open');
            mobilePanel.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            // Focus management: move focus into the drawer
            window.setTimeout(() => {
                const focusables = getFocusableElements(mobilePanel);
                if (focusables.length > 0) {
                    const closeBtn = mobilePanel.querySelector('.mobile-close');
                    if (closeBtn) {
                        closeBtn.focus();
                    } else {
                        focusables[0].focus();
                    }
                }
            }, 50);
        }

        function closeMobileMenu() {
            if (!mobilePanel || !hamburger) return;

            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');

            mobilePanel.classList.remove('open');
            mobilePanel.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';

            // Restore focus to hamburger or previous trigger
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            } else if (hamburger) {
                hamburger.focus();
            }
        }

        if (hamburger) {
            hamburger.addEventListener('click', function (e) {
                const now = Date.now();
                // Debounce rapid / duplicate event triggers (prevents double-firing if legacy inline script exists)
                if (now - lastToggleTime < 200) return;
                lastToggleTime = now;

                const isOpen = mobilePanel && mobilePanel.classList.contains('open');
                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });
        }

        if (mobileClose) {
            mobileClose.addEventListener('click', function (e) {
                e.preventDefault();
                closeMobileMenu();
            });
        }

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', function () {
                closeMobileMenu();
            });
        }

        // Close mobile drawer when an anchor link is clicked
        if (mobilePanel) {
            const mobileLinks = mobilePanel.querySelectorAll('a[href]');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });

            // Focus trap inside mobile drawer
            mobilePanel.addEventListener('keydown', function (e) {
                if (e.key !== 'Tab' || !mobilePanel.classList.contains('open')) return;

                const focusables = getFocusableElements(mobilePanel);
                if (focusables.length === 0) return;

                const firstEl = focusables[0];
                const lastEl = focusables[focusables.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            });
        }

        // ---------------------------------------------------------------------
        // 2. MOBILE DRAWER ACCORDIONS
        // ---------------------------------------------------------------------
        accordionBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                if (!submenu) return;

                const isOpen = submenu.classList.contains('open');

                // Close all other accordions for clean UX
                accordionBtns.forEach(otherBtn => {
                    if (otherBtn !== btn) {
                        otherBtn.classList.remove('active');
                        otherBtn.setAttribute('aria-expanded', 'false');
                        const otherSubmenu = otherBtn.nextElementSibling;
                        if (otherSubmenu) {
                            otherSubmenu.classList.remove('open');
                        }
                    }
                });

                if (isOpen) {
                    submenu.classList.remove('open');
                    this.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    submenu.classList.add('open');
                    this.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // ---------------------------------------------------------------------
        // 3. DESKTOP & RESPONSIVE DROPDOWNS / THREE-DOTS MENU
        // ---------------------------------------------------------------------
        function closeAllDropdowns() {
            navItems.forEach(item => {
                item.classList.remove('active');
                item.classList.remove('open');
                const btn = item.querySelector('.nav-link, .dropdown-toggle');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                const menu = item.querySelector('.dropdown, .mega-menu, .mega-menuIDOT');
                if (menu) {
                    menu.classList.remove('is-open');
                    menu.style.opacity = '';
                    menu.style.visibility = '';
                    menu.style.pointerEvents = '';
                }
            });
        }

        navItems.forEach(item => {
            const trigger = item.querySelector('.nav-link, .dropdown-toggle');
            const menu = item.querySelector('.dropdown, .mega-menu, .mega-menuIDOT');

            if (!trigger || !menu) return;

            // Toggle on click/tap
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const isActive = item.classList.contains('active') || menu.classList.contains('is-open');
                closeAllDropdowns();

                if (!isActive) {
                    item.classList.add('active');
                    item.classList.add('open');
                    menu.classList.add('is-open');
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.pointerEvents = 'auto';
                    trigger.setAttribute('aria-expanded', 'true');

                    // If mobile drawer is open, close it
                    if (mobilePanel && mobilePanel.classList.contains('open')) {
                        closeMobileMenu();
                    }
                }
            });

            // Close when clicking any link inside menu
            menu.querySelectorAll('a[href]').forEach(link => {
                link.addEventListener('click', () => {
                    closeAllDropdowns();
                });
            });

            // Keyboard navigation within nav item
            trigger.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!item.classList.contains('active')) {
                        closeAllDropdowns();
                        item.classList.add('active');
                        item.classList.add('open');
                        menu.classList.add('is-open');
                        menu.style.opacity = '1';
                        menu.style.visibility = 'visible';
                        menu.style.pointerEvents = 'auto';
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                    const firstMenuLink = menu.querySelector('a, button');
                    if (firstMenuLink) firstMenuLink.focus();
                }
            });

            // Keyboard inside menu: escape to close and return focus to trigger
            menu.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    closeAllDropdowns();
                    trigger.focus();
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav-item') && !e.target.closest('.idot')) {
                closeAllDropdowns();
            }
        });

        // Global Escape key handler
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (mobilePanel && mobilePanel.classList.contains('open')) {
                    closeMobileMenu();
                } else {
                    closeAllDropdowns();
                }
            }
        });

        // Close mobile drawer if window resized to desktop width
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1023) {
                if (mobilePanel && mobilePanel.classList.contains('open')) {
                    closeMobileMenu();
                }
            }
        }, { passive: true });

        // ---------------------------------------------------------------------
        // 4. STICKY HEADER SCROLL EFFECT
        // ---------------------------------------------------------------------
        let scrollScheduled = false;
        function onScroll() {
            if (!scrollScheduled) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY > 15;
                    if (navBg) {
                        navBg.classList.toggle('scrolled', scrolled);
                    }
                    if (header) {
                        header.classList.toggle('is-scrolled', scrolled);
                    }
                    scrollScheduled = false;
                });
                scrollScheduled = true;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();
