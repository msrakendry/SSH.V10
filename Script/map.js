// ============================================
// INTERACTIVE WORLD MAP FUNCTIONALITY (UPGRADED)
// ============================================
// Implements responsive zoom, pan, search, interactive 
// category filters, dynamic pulse markers, and premium glassmorphic popups.

let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

const mapContainer = document.getElementById('mapContainer');
const mapWrapper = document.getElementById('mapWrapper');
const zoomLevel = document.getElementById('zoomLevel');
const workPointsContainer = document.getElementById('workPointsContainer');

// Active filter and search state
let currentFilter = 'all';
let currentSearch = '';

// ========================================
// BACKEND CONFIGURATION SECTION
// ========================================

// PROJECT COLORS - Premium Harmonious Colors
const COLORS = {
    WATER: '#3B5998',           // Blue (Water Projects)
    LIVELIHOOD: '#E63946',      // Red (Livelihood)
    ENERGY: '#2A9D8F',          // Teal (Renewable Energy)
    EDUCATION: '#F59E0B'        // Orange (Education)
};

// WORK POINTS CONFIGURATION
const WORK_POINTS_CONFIG = [
    // ==================== WATER PROJECTS ====================
    {
        id: 'water_01',
        name: 'Kiryandongo Refugee Settlement W.A.S.H. System',
        country: 'Uganda',
        countryCode: 'UG',
        category: 'Water Projects',
        color: COLORS.WATER,
        x: 42.3,
        y: 54.4,
        enabled: true,
        description: 'Establishment of deep boreholes, high-capacity hybrid solar water pumping systems, and pipe distribution networks reaching over 12,000 households.',
        beneficiaries: '15,000+ Refugees',
        progress: 85,
        status: 'Active'
    },
    {
        id: 'water_02',
        name: 'Kiryandongo Settlement Deep Well & Purification',
        country: 'Uganda',
        countryCode: 'UG',
        category: 'Water Projects',
        color: COLORS.WATER,
        x: 44.2,
        y: 61.4,
        enabled: true,
        description: 'Multi-stage filtration systems and chlorination units ensuring safe and drinkable water supplies for local clinics and primary schools.',
        beneficiaries: '10,000+ Learners',
        progress: 100,
        status: 'Completed'
    },
    {
        id: 'water_03',
        name: 'Darfur Emergency Water Supply Network',
        country: 'Sudan',
        countryCode: 'SD',
        category: 'Water Projects',
        color: COLORS.WATER,
        x: 41.5,
        y: 45.2,
        enabled: true,
        description: 'Rapid-deployment clean water trucking and immediate rehabilitation of shallow water wells in community centers.',
        beneficiaries: '25,000+ Displaced',
        progress: 60,
        status: 'Ongoing'
    },
    
    // ==================== LIVELIHOOD ====================
    {
        id: 'livelihood_01',
        name: 'North Darfur - El Fasher / Tawila Livelihood Initiative',
        country: 'Sudan',
        countryCode: 'SD',
        category: 'Livelihood',
        color: COLORS.LIVELIHOOD,
        x: 42.8,
        y: 52.4,
        enabled: true,
        description: 'Empowering local smallholder farmers with drought-resilient seed packets, organic composting training, and low-interest startup capital.',
        beneficiaries: '1,200 Youth Trained',
        progress: 90,
        status: 'Active'
    },
    {
        id: 'livelihood_02',
        name: 'Kiryandongo Youth Agricultural Hub',
        country: 'Uganda',
        countryCode: 'UG',
        category: 'Livelihood',
        color: COLORS.LIVELIHOOD,
        x: 45.1,
        y: 59.8,
        enabled: true,
        description: 'Training refugee youth in vocational skills, high-yield smart permaculture, poultry farming, and micro-business bookkeeping operations.',
        beneficiaries: '850 Entrepreneurs',
        progress: 75,
        status: 'Ongoing'
    },
    
    // ==================== RENEWABLE ENERGY ====================
    {
        id: 'energy_01',
        name: 'Community Clinic Solar Power Grids',
        country: 'Sudan',
        countryCode: 'SD',
        category: 'Renewable Energy',
        color: COLORS.ENERGY,
        x: 49.3,
        y: 43.1,
        enabled: true,
        description: 'Off-grid solar hybrid installations providing continuous, uninterrupted electricity to critical emergency rooms and pharmaceutical cold-chains.',
        beneficiaries: '15 Solar Projects',
        progress: 95,
        status: 'Active'
    },
    {
        id: 'energy_02',
        name: 'Bweyale Clean Cookstoves and Biogas Systems',
        country: 'Uganda',
        countryCode: 'UG',
        category: 'Renewable Energy',
        color: COLORS.ENERGY,
        x: 46.5,
        y: 62.0,
        enabled: true,
        description: 'Providing energy-efficient household stoves and small-scale domestic biogas reactors to mitigate deforestation and smoke inhalation.',
        beneficiaries: '450 Households',
        progress: 100,
        status: 'Completed'
    },
    
    // ==================== EDUCATION ====================
    {
        id: 'education_01',
        name: 'Regional STEM & Eco-Sustainability Hub',
        country: 'Regional',
        countryCode: 'SD',
        category: 'Education',
        color: COLORS.EDUCATION,
        x: 48.0,
        y: 49.2,
        enabled: true,
        description: 'Modern digital literacy training classroom utilizing high-efficiency tablets, e-learning courses, and environmental science field curricula.',
        beneficiaries: '6,000 Learners Reached',
        progress: 80,
        status: 'Active'
    }
];

// ========================================
// END OF BACKEND CONFIGURATION
// ========================================

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    initializeMapWidgets();
    createWorkPoints();
});

// Dynamic Injection of Interactive Widgets (Filters, Search, Zoom, Popup)
function initializeMapWidgets() {
    if (!mapContainer) return;

    // 1. Inject Search & Filter Widget above Map Wrapper
    if (!document.getElementById('mapFilterWidget')) {
        const filterWidget = document.createElement('div');
        filterWidget.id = 'mapFilterWidget';
        filterWidget.className = 'map-filter-widget';
        filterWidget.innerHTML = `
            <div class="map-search-wrapper">
                <svg class="map-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" id="mapSearchInput" class="map-search-input" placeholder="Search projects by country, title, keywords..." aria-label="Search map projects">
            </div>
            <div class="map-pill-filters">
                <button class="map-filter-btn active" data-filter="all">All Pillars</button>
                <button class="map-filter-btn" data-filter="water"><span class="dot water"></span> WASH</button>
                <button class="map-filter-btn" data-filter="livelihood"><span class="dot livelihood"></span> Livelihood</button>
                <button class="map-filter-btn" data-filter="energy"><span class="dot energy"></span> Energy</button>
                <button class="map-filter-btn" data-filter="education"><span class="dot education"></span> Education</button>
            </div>
        `;
        mapContainer.parentNode.insertBefore(filterWidget, mapContainer);

        // Bind filter event listeners
        document.querySelectorAll('.map-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                createWorkPoints();
            });
        });

        // Bind search listener
        const searchInput = document.getElementById('mapSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value.toLowerCase().trim();
                createWorkPoints();
            });
        }
    }

    // 2. Inject Dynamic Popover Overlay inside mapContainer
    if (!document.getElementById('mapPopupOverlay')) {
        const popupOverlay = document.createElement('div');
        popupOverlay.id = 'mapPopupOverlay';
        popupOverlay.className = 'map-popup-overlay';
        popupOverlay.innerHTML = `
            <div class="map-popup-close" id="mapPopupClose" role="button" aria-label="Close popup">&times;</div>
            <div class="map-popup-img" id="mapPopupImg">📍</div>
            <div class="map-popup-body">
                <div class="map-popup-meta">
                    <span class="smart-badge verified" id="mapPopupPillar">Water</span>
                    <span class="smart-badge live" id="mapPopupStatus">Active</span>
                </div>
                <h4 class="map-popup-title" id="mapPopupTitle">Project Name</h4>
                <p class="map-popup-desc" id="mapPopupDesc">Description details go here.</p>
                <div class="map-popup-progress-container">
                    <div class="map-progress-label">
                        <span id="mapPopupBeneficiaries">Impact metrics</span>
                        <span id="mapPopupProgressPercent">85%</span>
                    </div>
                    <div class="map-progress-bar-bg">
                        <div class="map-progress-fill" id="mapPopupProgressFill"></div>
                    </div>
                </div>
            </div>
        `;
        mapContainer.appendChild(popupOverlay);

        // Bind close button
        document.getElementById('mapPopupClose').addEventListener('click', (e) => {
            e.stopPropagation();
            closePopup();
        });
    }

    // 3. Inject Zoom Widget inside mapContainer
    if (!document.getElementById('mapZoomWidget')) {
        const zoomWidget = document.createElement('div');
        zoomWidget.id = 'mapZoomWidget';
        zoomWidget.className = 'map-zoom-widget';
        zoomWidget.innerHTML = `
            <button class="map-zoom-btn" onclick="zoomIn()" aria-label="Zoom In">+</button>
            <button class="map-zoom-btn" onclick="zoomOut()" aria-label="Zoom Out">-</button>
            <button class="map-zoom-btn" onclick="resetView()" aria-label="Reset View">⟲</button>
        `;
        mapContainer.appendChild(zoomWidget);
    }
}

function createWorkPoints() {
    if (!workPointsContainer) return;
    workPointsContainer.innerHTML = '';
    
    let totalCount = WORK_POINTS_CONFIG.length;
    let activeCount = 0;
    let hiddenCount = 0;
    
    WORK_POINTS_CONFIG.forEach((point, index) => {
        if (!point.enabled) {
            hiddenCount++;
            return;
        }

        // Apply Category Filters
        if (currentFilter !== 'all') {
            const cat = point.category.toLowerCase();
            if (currentFilter === 'water' && !cat.includes('water')) { return; }
            if (currentFilter === 'livelihood' && !cat.includes('livelihood')) { return; }
            if (currentFilter === 'energy' && !cat.includes('energy')) { return; }
            if (currentFilter === 'education' && !cat.includes('education')) { return; }
        }

        // Apply Search Query
        if (currentSearch !== '') {
            const matchesName = point.name.toLowerCase().includes(currentSearch);
            const matchesCountry = point.country.toLowerCase().includes(currentSearch);
            const matchesDesc = point.description.toLowerCase().includes(currentSearch);
            const matchesCat = point.category.toLowerCase().includes(currentSearch);
            
            if (!matchesName && !matchesCountry && !matchesDesc && !matchesCat) {
                return;
            }
        }
        
        activeCount++;
        
        const pointEl = document.createElement('div');
        pointEl.className = 'work-point';
        pointEl.style.borderColor = '#ffffff';
        pointEl.style.backgroundColor = point.color;
        pointEl.style.left = point.x + '%';
        pointEl.style.top = point.y + '%';
        pointEl.dataset.id = point.id;
        pointEl.dataset.index = index;
        
        // Tooltip label for quick hover
        const label = document.createElement('div');
        label.className = 'point-label';
        
        // Select country emoji flags based on country code
        const flagEmoji = point.countryCode === 'UG' ? '🇺🇬' : '🇸🇩';
        
        label.innerHTML = `
            <strong>${flagEmoji} ${point.name}</strong><br>
            ${point.country} - ${point.category}<br>
            <small>Impact: ${point.beneficiaries}</small>
        `;
        pointEl.appendChild(label);
        
        // Mouse hover trigger show full interactive popup card
        pointEl.addEventListener('mouseenter', (e) => {
            showPointInfo(point);
        });

        // Click focus event
        pointEl.addEventListener('click', (e) => {
            e.stopPropagation();
            showPointInfo(point);
            centerOnPoint(point);
        });
        
        workPointsContainer.appendChild(pointEl);
    });
    
    // Update footer statistics counters if elements exist
    const totalPointsEl = document.getElementById('totalPoints');
    const activePointsEl = document.getElementById('activePoints');
    const hiddenPointsEl = document.getElementById('hiddenPoints');
    
    if (totalPointsEl) totalPointsEl.textContent = totalCount;
    if (activePointsEl) activePointsEl.textContent = activeCount;
    if (hiddenPointsEl) hiddenPointsEl.textContent = hiddenCount;
}

function showPointInfo(point) {
    const popup = document.getElementById('mapPopupOverlay');
    if (!popup) return;

    const titleEl = document.getElementById('mapPopupTitle');
    const descEl = document.getElementById('mapPopupDesc');
    const pillarEl = document.getElementById('mapPopupPillar');
    const statusEl = document.getElementById('mapPopupStatus');
    const beneficiariesEl = document.getElementById('mapPopupBeneficiaries');
    const progressPercentEl = document.getElementById('mapPopupProgressPercent');
    const progressFillEl = document.getElementById('mapPopupProgressFill');
    const imgEl = document.getElementById('mapPopupImg');

    // Unicode flags
    const flag = point.countryCode === 'UG' ? '🇺🇬' : '🇸🇩';

    // Populate data
    titleEl.innerHTML = `${flag} ${point.name}`;
    descEl.textContent = point.description;
    pillarEl.textContent = point.category;
    statusEl.textContent = point.status;
    beneficiariesEl.innerHTML = `🎯 <strong>Reach:</strong> ${point.beneficiaries}`;
    progressPercentEl.textContent = `${point.progress}%`;
    
    // Animate progress bar fill
    progressFillEl.style.width = '0%';
    progressFillEl.style.backgroundColor = point.color;

    // Apply specific gradient style based on category
    let headerGrad = 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(15, 23, 42, 0.9))';
    if (point.category.includes('Water')) {
        headerGrad = 'linear-gradient(135deg, rgba(37, 99, 235, 0.35), rgba(29, 78, 216, 0.85))';
        imgEl.textContent = '💧';
        pillarEl.className = 'smart-badge live';
    } else if (point.category.includes('Livelihood')) {
        headerGrad = 'linear-gradient(135deg, rgba(220, 38, 38, 0.35), rgba(185, 28, 28, 0.85))';
        imgEl.textContent = '💼';
        pillarEl.className = 'smart-badge featured';
    } else if (point.category.includes('Energy')) {
        headerGrad = 'linear-gradient(135deg, rgba(13, 148, 136, 0.35), rgba(15, 118, 110, 0.85))';
        imgEl.textContent = '⚡';
        pillarEl.className = 'smart-badge verified';
    } else if (point.category.includes('Education')) {
        headerGrad = 'linear-gradient(135deg, rgba(217, 119, 6, 0.35), rgba(180, 83, 9, 0.85))';
        imgEl.textContent = '🎓';
        pillarEl.className = 'smart-badge beta';
    }

    imgEl.style.background = headerGrad;

    // Change status badge color modifiers
    if (point.status === 'Completed') {
        statusEl.className = 'smart-badge new';
    } else if (point.status === 'Ongoing') {
        statusEl.className = 'smart-badge updated';
    } else {
        statusEl.className = 'smart-badge live';
    }

    // Toggle overlay active
    popup.classList.add('active');

    // Force progress reflow for CSS animation
    setTimeout(() => {
        progressFillEl.style.width = `${point.progress}%`;
    }, 50);
}

function closePopup() {
    const popup = document.getElementById('mapPopupOverlay');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Center view and zoom in on specific project coordinates
function centerOnPoint(point) {
    scale = 2.2;
    
    // Map dimensions in pixels
    const wrapperWidth = mapWrapper.offsetWidth;
    const wrapperHeight = mapWrapper.offsetHeight;
    
    // Point coordinates in pixels relative to center
    const pointX = (point.x / 100) * wrapperWidth;
    const pointY = (point.y / 100) * wrapperHeight;
    
    posX = (wrapperWidth / 2) - (pointX * scale);
    posY = (wrapperHeight / 2) - (pointY * scale);
    
    updateTransform();
}

function updateTransform() {
    mapWrapper.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    zoomLevel.textContent = `Zoom: ${Math.round(scale * 100)}%`;
}

function zoomIn() {
    scale = Math.min(scale + 0.35, 5);
    updateTransform();
}

function zoomOut() {
    scale = Math.max(scale - 0.35, 0.5);
    updateTransform();
}

function resetView() {
    scale = 1;
    posX = 0;
    posY = 0;
    updateTransform();
    closePopup();
}

// Mouse dragging & touch events implementation
mapContainer.addEventListener('mousedown', (e) => {
    // If dragging from popup elements, do not pan map
    if (e.target.closest('.map-popup-overlay') || e.target.closest('.map-zoom-widget')) return;
    
    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    mapContainer.classList.add('grabbing');
    closePopup();
});

mapContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    updateTransform();
});

mapContainer.addEventListener('mouseup', () => {
    isDragging = false;
    mapContainer.classList.remove('grabbing');
});

mapContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    mapContainer.classList.remove('grabbing');
});

mapContainer.addEventListener('wheel', (e) => {
    if (e.target.closest('.map-popup-overlay') || e.target.closest('.map-zoom-widget')) return;
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    const newScale = Math.max(0.5, Math.min(5, scale + delta));
    
    // Zoom centered on cursor position
    const rect = mapContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xBefore = (mouseX - posX) / scale;
    const yBefore = (mouseY - posY) / scale;
    
    scale = newScale;
    
    posX = mouseX - xBefore * scale;
    posY = mouseY - yBefore * scale;
    
    updateTransform();
});

let touchStartX = 0;
let touchStartY = 0;

mapContainer.addEventListener('touchstart', (e) => {
    if (e.target.closest('.map-popup-overlay') || e.target.closest('.map-zoom-widget')) return;
    isDragging = true;
    const touch = e.touches[0];
    touchStartX = touch.clientX - posX;
    touchStartY = touch.clientY - posY;
    closePopup();
});

mapContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    posX = touch.clientX - touchStartX;
    posY = touch.clientY - touchStartY;
    updateTransform();
});

mapContainer.addEventListener('touchend', () => {
    isDragging = false;
});

// Close popup on click outside active markers
mapContainer.addEventListener('click', (e) => {
    if (!e.target.closest('.work-point') && !e.target.closest('.map-popup-overlay') && !e.target.closest('.map-zoom-widget')) {
        closePopup();
    }
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🗺️ Upgraded World Map Initialized');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
