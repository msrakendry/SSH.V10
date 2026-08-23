// ============================================
// INTERACTIVE WORLD MAP FUNCTIONALITY
// ============================================
// Implements zoom, pan (drag), scroll-to-zoom,
// and touch support for the image-based world map.

            //map script
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

            // ========================================
            // BACKEND CONFIGURATION SECTION
            // ========================================
            
            // PROJECT COLORS - Matching the legend
            const COLORS = {
                WATER: '#3B5998',           // Blue (Water Projects)
                LIVELIHOOD: '#E63946',      // Red (Livelihood)
                ENERGY: '#2A9D8F',          // Teal (Renewable Energy)
                EDUCATION: '#F59E0B'        // Orange (Education)
            };

            // WORK POINTS CONFIGURATION
            // To ADD a new point: Copy a point object and modify the values
            // To DELETE a point: Set enabled: false OR remove the entire object
            // To HIDE temporarily: Set enabled: false
            // Position: x and y are percentages (0-100)
            //   x: 0 = left edge, 100 = right edge
            //   y: 0 = top edge, 100 = bottom edge
            
            const WORK_POINTS_CONFIG = [
                // ==================== WATER PROJECTS ====================
                {
                    id: 'water_01',
                    name: 'KIRYANDONGO-REFUGEE SETTLMENT, Water Project',
                    country: 'SUDAN',
                    category: 'Water Projects',
                    color: COLORS.WATER,
                    x: 42.3,
                    y: 54.4,
                    enabled: true,
                    description: 'Clean water initiative'
                },
                {
                    id: 'water_02',
                    name: 'Juba Water Project',
                    country: 'South Sudan',
                    category: 'Water Projects',
                    color: COLORS.WATER,
                    x: 50.6,
                    y: 42.4,
                    enabled: false,
                    description: 'Water supply system'
                },
                {
                    id: 'water_02',
                    name: 'KIRYANDONGO-REFUGEE SETTLMENT, Water Project',
                    country: 'UGANDA',
                    category: 'Water Projects',
                    color: COLORS.WATER,
                    x: 44.2,
                    y: 61.4,
                    enabled: true,
                    description: 'Water supply system'
                },
                // ==================== LIVELIHOOD ====================
                {
                    id: 'livelihood_01',
                    name: 'NORTH DARFOUR-ELFASHER/TWILA, Livelihood Project',
                    country: 'SUDAN',
                    category: 'Livelihood',
                    color: COLORS.LIVELIHOOD,
                    x: 42.8,
                    y: 54.4,
                    enabled: true,
                    description: 'Community development'
                },
                {
                    id: 'livelihood_02',
                    name: 'KIRYANDONGO REFUGEE SETTLEMENT, Livelihood Project',
                    country: 'UGANDA',
                    category: 'Livelihood',
                    color: COLORS.LIVELIHOOD,
                    x: 44.2,
                    y: 61,
                    enabled: true,
                    description: 'Agricultural support'
                },
                
                // ==================== RENEWABLE ENERGY ====================
                {
                    id: 'energy_01',
                    name: 'Kampala Solar Project',
                    country: 'Uganda',
                    category: 'Renewable Energy',
                    color: COLORS.ENERGY,
                    x: 50.4,
                    y: 45.1,
                    enabled: false,
                    description: 'Solar energy installation'
                },
                {
                    id: 'energy_02',
                    name: 'Entebbe Wind Farm',
                    country: 'Uganda',
                    category: 'Renewable Energy',
                    color: COLORS.ENERGY,
                    x: 49.9,
                    y: 45.8,
                    enabled: false,
                    description: 'Wind energy project'
                },
                
                // ==================== EDUCATION ====================
                {
                    id: 'education_01',
                    name: 'Regional Education Hub',
                    country: 'Regional',
                    category: 'Education',
                    color: COLORS.EDUCATION,
                    x: 49.3,
                    y: 41.1,
                    enabled: false,
                    description: 'Education center'
                },
                
                // ==================== EXAMPLE: ADD NEW POINTS BELOW ====================
                // Copy this template to add new points:
                /*
                {
                    id: 'unique_id_here',
                    name: 'Project Name',
                    country: 'Country Name',
                    category: 'Water Projects',  // or Livelihood, Renewable Energy, Education
                    color: COLORS.WATER,         // Match category color
                    x: 50.0,
                    y: 40.0,
                    enabled: true,
                    description: 'Description'
                },
                */
            ];
            
            // ========================================
            // END OF BACKEND CONFIGURATION
            // ========================================

            function createWorkPoints() {
                workPointsContainer.innerHTML = '';
                
                let totalCount = WORK_POINTS_CONFIG.length;
                let activeCount = 0;
                let hiddenCount = 0;
                
                WORK_POINTS_CONFIG.forEach((point, index) => {
                    if (!point.enabled) {
                        hiddenCount++;
                        return;
                    }
                    
                    activeCount++;
                    
                    const pointEl = document.createElement('div');
                    pointEl.className = 'work-point';
                    pointEl.style.borderColor = point.color;
                    pointEl.style.background = point.color + 'B3';
                    pointEl.style.left = point.x + '%';
                    pointEl.style.top = point.y + '%';
                    pointEl.dataset.id = point.id;
                    pointEl.dataset.index = index;
                    
                    const label = document.createElement('div');
                    label.className = 'point-label';
                    label.innerHTML = `
                        <strong>${point.name}</strong><br>
                        ${point.country} - ${point.category}<br>
                        <small>${point.description || ''}</small>
                    `;
                    pointEl.appendChild(label);
                    
                    pointEl.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showPointInfo(point);
                    });
                    
                    workPointsContainer.appendChild(pointEl);
                });
                
                document.getElementById('totalPoints').textContent = totalCount;
                document.getElementById('activePoints').textContent = activeCount;
                document.getElementById('hiddenPoints').textContent = hiddenCount;
            }

            function showPointInfo(point) {
                const info = `
    ━━━━━━━━━━━━━━━━━━━━━━
    📍 ${point.name}
    ━━━━━━━━━━━━━━━━━━━━━━
    Country: ${point.country}
    Category: ${point.category}
    Position: ${point.x}%, ${point.y}%
    ID: ${point.id}
    ${point.description ? 'Description: ' + point.description : ''}
    ━━━━━━━━━━━━━━━━━━━━━━
                `.trim();
                alert(info);
            }

            function updateTransform() {
                mapWrapper.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
                zoomLevel.textContent = `Zoom: ${Math.round(scale * 100)}%`;
            }

            function zoomIn() {
                scale = Math.min(scale + 0.25, 5);
                updateTransform();
            }

            function zoomOut() {
                scale = Math.max(scale - 0.25, 0.5);
                updateTransform();
            }

            function resetView() {
                scale = 1;
                posX = 0;
                posY = 0;
                updateTransform();
            }

            mapContainer.addEventListener('mousedown', (e) => {
                if (e.target.classList.contains('work-point')) return;
                isDragging = true;
                startX = e.clientX - posX;
                startY = e.clientY - posY;
                mapContainer.classList.add('grabbing');
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
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                scale = Math.max(0.5, Math.min(5, scale + delta));
                updateTransform();
            });

            let touchStartX = 0;
            let touchStartY = 0;

            mapContainer.addEventListener('touchstart', (e) => {
                if (e.target.classList.contains('work-point')) return;
                isDragging = true;
                const touch = e.touches[0];
                touchStartX = touch.clientX - posX;
                touchStartY = touch.clientY - posY;
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

            createWorkPoints();
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🗺️  World Map Initialized');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('Total points:', WORK_POINTS_CONFIG.length);
            console.log('Active points:', WORK_POINTS_CONFIG.filter(p => p.enabled).length);
            console.log('Hidden points:', WORK_POINTS_CONFIG.filter(p => !p.enabled).length);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
