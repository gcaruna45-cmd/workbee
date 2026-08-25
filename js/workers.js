// workers.js

const sampleWorkers = [
    { id: 'WB-1024', lastName: 'Perera', age: 28, experience: 4, skills: ['Masonry', 'Plumbing'], category: 'Construction', locations: ['Colombo', 'Gampaha'], shifts: ['Day', 'Night'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1025', lastName: 'Silva', age: 35, experience: 8, skills: ['Carpentry'], category: 'Construction', locations: ['Kandy'], shifts: ['Day'], workDays: ['Mon-Fri', 'Weekends'], availability: 'busy', noticeperiod: '1 Week' },
    { id: 'WB-1026', lastName: 'Fernando', age: 42, experience: 12, skills: ['Cooking', 'Serving'], category: 'Hospitality', locations: ['Galle', 'Matara'], shifts: ['Night'], workDays: ['Weekends'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1027', lastName: 'Rajapaksa', age: 22, experience: 2, skills: ['Packing', 'Assembly'], category: 'Factory', locations: ['Colombo', 'Kalutara'], shifts: ['Day', 'Night'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: '2 Weeks' },
    { id: 'WB-1028', lastName: 'Wickramasinghe', age: 31, experience: 5, skills: ['Cleaning', 'Dusting'], category: 'Cleaning', locations: ['Colombo'], shifts: ['Day'], workDays: ['Mon-Fri'], availability: 'busy', noticeperiod: 'Immediate' },
    { id: 'WB-1029', lastName: 'Dissanayake', age: 29, experience: 3, skills: ['Electrician'], category: 'Construction', locations: ['Kurunegala'], shifts: ['Day', 'On-call'], workDays: ['Mon-Fri', 'Weekends'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1030', lastName: 'Senanayake', age: 45, experience: 20, skills: ['Management', 'Supervision'], category: 'Factory', locations: ['Gampaha'], shifts: ['Day'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: '1 Month' },
    { id: 'WB-1031', lastName: 'Jayawardena', age: 26, experience: 1, skills: ['Housekeeping'], category: 'Hospitality', locations: ['Colombo', 'Kandy'], shifts: ['Night'], workDays: ['Weekends'], availability: 'busy', noticeperiod: 'Immediate' },
    { id: 'WB-1032', lastName: 'Mendis', age: 38, experience: 10, skills: ['Painting', 'Plastering'], category: 'Construction', locations: ['Galle'], shifts: ['Day'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: '2 Weeks' },
    { id: 'WB-1033', lastName: 'Bandara', age: 33, experience: 7, skills: ['Machine Operator'], category: 'Factory', locations: ['Colombo'], shifts: ['Night'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1034', lastName: 'Perera', age: 24, experience: 2, skills: ['Serving', 'Bartending'], category: 'Hospitality', locations: ['Matara'], shifts: ['Day', 'Night'], workDays: ['Weekends'], availability: 'busy', noticeperiod: '1 Week' },
    { id: 'WB-1035', lastName: 'Kumara', age: 40, experience: 15, skills: ['Welding'], category: 'Construction', locations: ['Colombo'], shifts: ['Day'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1036', lastName: 'Rathnayake', age: 27, experience: 4, skills: ['Packing'], category: 'Factory', locations: ['Gampaha'], shifts: ['Day'], workDays: ['Mon-Fri', 'Weekends'], availability: 'available', noticeperiod: '1 Month' },
    { id: 'WB-1037', lastName: 'De Silva', age: 36, experience: 9, skills: ['Office Cleaning'], category: 'Cleaning', locations: ['Kandy'], shifts: ['Night'], workDays: ['Mon-Fri'], availability: 'busy', noticeperiod: '2 Weeks' },
    { id: 'WB-1038', lastName: 'Gunawardena', age: 30, experience: 6, skills: ['Chef'], category: 'Hospitality', locations: ['Galle'], shifts: ['Day', 'Night'], workDays: ['Mon-Fri', 'Weekends'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1039', lastName: 'Herath', age: 21, experience: 1, skills: ['Helper'], category: 'Construction', locations: ['Kurunegala'], shifts: ['Day'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1040', lastName: 'Karunaratne', age: 50, experience: 25, skills: ['Security'], category: 'Other', locations: ['Colombo'], shifts: ['Night'], workDays: ['Weekends'], availability: 'busy', noticeperiod: '1 Month' },
    { id: 'WB-1041', lastName: 'Gamage', age: 32, experience: 5, skills: ['Forklift Operator'], category: 'Factory', locations: ['Kalutara'], shifts: ['Day'], workDays: ['Mon-Fri'], availability: 'available', noticeperiod: 'Immediate' },
    { id: 'WB-1042', lastName: 'Peiris', age: 29, experience: 3, skills: ['Janitorial'], category: 'Cleaning', locations: ['Gampaha'], shifts: ['Day', 'Night'], workDays: ['Weekends'], availability: 'available', noticeperiod: '2 Weeks' },
    { id: 'WB-1043', lastName: 'Samaranayake', age: 34, experience: 8, skills: ['Plumbing', 'Electrician'], category: 'Construction', locations: ['Colombo'], shifts: ['Day'], workDays: ['Mon-Fri'], availability: 'busy', noticeperiod: '1 Week' }
];

const state = {
    filters: {
        category: [],
        district: [],
        shift: [],
        workDay: []
    },
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 9
};

document.addEventListener('DOMContentLoaded', () => {
    initWorkers();
});

function initWorkers() {
    bindFilters();
    bindSearch();
    bindModal();
    applyFilters();
}

function renderWorkerCards(workers) {
    const grid = document.getElementById('workers-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    if (workers.length === 0) {
        grid.innerHTML = '<div class="no-results">No workers found matching your criteria.</div>';
        return;
    }

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedWorkers = workers.slice(0, startIndex + state.itemsPerPage);

    paginatedWorkers.forEach(worker => {
        const card = document.createElement('div');
        card.className = 'worker-card';
        card.innerHTML = `
            <div class="worker-header">
                <h3>${worker.id} - ${worker.lastName}</h3>
                <span class="status-badge ${worker.availability}">${worker.availability}</span>
            </div>
            <div class="worker-details">
                <p><strong>Category:</strong> ${worker.category}</p>
                <p><strong>Age/Exp:</strong> ${worker.age} yrs | ${worker.experience} yrs exp</p>
                <p><strong>Skills:</strong> ${worker.skills.join(', ')}</p>
                <p><strong>Locations:</strong> ${worker.locations.join(', ')}</p>
                <p><strong>Availability:</strong> ${worker.shifts.join('/')} | ${worker.workDays.join(', ')}</p>
                <p><strong>Notice:</strong> ${worker.noticeperiod}</p>
            </div>
            <button class="request-btn" data-id="${worker.id}" ${worker.availability === 'busy' ? 'disabled' : ''}>
                ${worker.availability === 'busy' ? 'Currently Busy' : 'Request Worker'}
            </button>
        `;
        grid.appendChild(card);
    });

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        if (paginatedWorkers.length < workers.length) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.onclick = () => {
                state.currentPage++;
                renderWorkerCards(workers);
            };
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Bind request buttons
    document.querySelectorAll('.request-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openRequestModal(e.target.getAttribute('data-id'));
        });
    });
}

function bindFilters() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            const filterType = e.target.getAttribute('data-filter-type');
            const filterVal = e.target.getAttribute('data-value');
            
            e.target.classList.toggle('active');
            
            if (e.target.classList.contains('active')) {
                state.filters[filterType].push(filterVal);
            } else {
                state.filters[filterType] = state.filters[filterType].filter(v => v !== filterVal);
            }
            
            state.currentPage = 1;
            applyFilters();
        });
    });
}

function bindSearch() {
    const searchInput = document.getElementById('worker-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase();
            state.currentPage = 1;
            applyFilters();
        });
    }
}

function getAllWorkers() {
    const regWorkers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    const formattedRegWorkers = regWorkers.map(w => ({
        id: w.id || 'WB-' + Math.floor(1000 + Math.random() * 9000),
        lastName: w.lastName || w.firstName || 'Worker',
        age: w.age || 25,
        experience: w.experience || 1,
        category: w.category || 'General',
        skills: Array.isArray(w.skills) ? w.skills : [w.category || 'General'],
        locations: Array.isArray(w.locations) ? w.locations : ['Colombo'],
        shifts: Array.isArray(w.shifts) ? w.shifts : ['Day'],
        workDays: Array.isArray(w.workDays) ? w.workDays : ['Daily Wage'],
        availability: w.status === 'busy' ? 'busy' : 'available',
        noticeperiod: w.noticeperiod || 'Immediate'
    }));

    // Put newly registered workers first, followed by sample workers
    return [...formattedRegWorkers, ...sampleWorkers];
}

function applyFilters() {
    const allWorkers = getAllWorkers();
    let filtered = allWorkers.filter(w => {
        // Search
        if (state.searchQuery) {
            const searchMatch = (w.skills && w.skills.some(s => s.toLowerCase().includes(state.searchQuery))) || 
                                (w.category && w.category.toLowerCase().includes(state.searchQuery)) ||
                                (w.id && w.id.toLowerCase().includes(state.searchQuery)) ||
                                (w.lastName && w.lastName.toLowerCase().includes(state.searchQuery));
            if (!searchMatch) return false;
        }

        // Category filter
        if (state.filters.category.length > 0 && !state.filters.category.includes(w.category)) return false;
        
        // District filter (if worker has any of the selected districts)
        if (state.filters.district.length > 0 && (!w.locations || !w.locations.some(loc => state.filters.district.includes(loc)))) return false;

        // Shift filter
        if (state.filters.shift.length > 0 && (!w.shifts || !w.shifts.some(s => state.filters.shift.includes(s)))) return false;

        // Work day filter
        if (state.filters.workDay.length > 0 && (!w.workDays || !w.workDays.some(d => state.filters.workDay.includes(d)))) return false;

        return true;
    });

    renderWorkerCards(filtered);
}

// Sample initial job requirements if none in localStorage
const sampleJobRequirements = [
    {
        id: 'JOB-4821',
        company: 'Premium Hospitality Group (Privacy Protected)',
        phone: '+94 77 123 4567',
        industry: 'Hospitality',
        skills: ['Kitchen Helper', 'Steward'],
        workersReq: 2,
        district: 'Colombo',
        town: 'Colombo 03',
        fromDate: '2026-09-01',
        toDate: '2026-09-15',
        totalDays: 15,
        payRate: 2000,
        totalPay: 60000,
        shifts: ['Day', 'Night'],
        desc: 'Urgent requirement for kitchen helpers. Meals provided during shift.',
        status: 'OPEN',
        applicants: [],
        postedDate: '2026-08-20'
    },
    {
        id: 'JOB-5109',
        company: 'Apex Builders Lanka (Privacy Protected)',
        phone: '+94 71 987 6543',
        industry: 'Construction',
        skills: ['Mason', 'Helper'],
        workersReq: 3,
        district: 'Kandy',
        town: 'Peradeniya',
        fromDate: '2026-09-05',
        toDate: '2026-09-25',
        totalDays: 20,
        payRate: 2800,
        totalPay: 168000,
        shifts: ['Day'],
        desc: 'Commercial building project. Safety gear provided on site.',
        status: 'OPEN',
        applicants: [],
        postedDate: '2026-08-21'
    },
    {
        id: 'JOB-8832',
        company: 'Digital Solutions SL (Privacy Protected)',
        phone: '+94 76 555 1234',
        industry: 'IT',
        skills: ['Web Design / UI Design', 'Data Entry Operator'],
        workersReq: 1,
        district: 'Gampaha',
        town: 'Negombo',
        fromDate: '2026-09-01',
        toDate: '2026-09-30',
        totalDays: 30,
        payRate: 3500,
        totalPay: 105000,
        shifts: ['Flexible'],
        desc: 'Website redesign and product catalog entry. Laptop provided.',
        status: 'OPEN',
        applicants: [],
        postedDate: '2026-08-21'
    },
    {
        id: 'JOB-3310',
        company: 'Lanka Electronics Ltd (Privacy Protected)',
        phone: '+94 70 333 4444',
        industry: 'Electronics',
        skills: ['2-Phase Electrical Wiring', 'CCTV / Security Systems'],
        workersReq: 2,
        district: 'Galle',
        town: 'Unawatuna',
        fromDate: '2026-08-25',
        toDate: '2026-08-30',
        totalDays: 6,
        payRate: 3200,
        totalPay: 38400,
        shifts: ['Day'],
        desc: 'Hotel wiring upgrade and security camera installation.',
        status: 'FILLED', // Marked as filled
        applicants: ['WB-1024', 'WB-1029'],
        postedDate: '2026-08-18'
    }
];

function initJobRequirements() {
    let reqs = localStorage.getItem('workbee_requirements');
    if (!reqs || JSON.parse(reqs).length === 0) {
        localStorage.setItem('workbee_requirements', JSON.stringify(sampleJobRequirements));
    }
}

let activeViewTab = 'workers';

function switchViewTab(tab) {
    activeViewTab = tab;
    const workersTabBtn = document.getElementById('view-workers-tab');
    const jobsTabBtn = document.getElementById('view-jobs-tab');
    const workersGrid = document.getElementById('workers-grid');
    const jobsContainer = document.getElementById('jobs-container');
    const topBarControls = document.getElementById('top-bar-controls');
    const paginationContainer = document.getElementById('pagination-container');

    if (tab === 'workers') {
        workersTabBtn.className = 'flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all shadow-sm bg-primary text-dark flex items-center justify-center gap-2';
        jobsTabBtn.className = 'flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all text-slate-600 hover:text-dark flex items-center justify-center gap-2';
        
        if (workersGrid) workersGrid.style.display = 'grid';
        if (jobsContainer) jobsContainer.style.display = 'none';
        if (topBarControls) topBarControls.style.display = 'flex';
        if (paginationContainer) paginationContainer.style.display = 'flex';
    } else {
        jobsTabBtn.className = 'flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all shadow-sm bg-primary text-dark flex items-center justify-center gap-2';
        workersTabBtn.className = 'flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all text-slate-600 hover:text-dark flex items-center justify-center gap-2';
        
        if (workersGrid) workersGrid.style.display = 'none';
        if (jobsContainer) jobsContainer.style.display = 'block';
        if (topBarControls) topBarControls.style.display = 'none';
        if (paginationContainer) paginationContainer.style.display = 'none';

        renderJobBoard();
    }
}

function renderJobBoard(skillFilter = 'all') {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    initJobRequirements();
    const reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');

    // ONLY SHOW OPEN JOBS TO PUBLIC WORKERS (FILLED jobs are hidden from workers and only visible to Admin)
    let openReqs = reqs.filter(r => r.status !== 'FILLED');

    if (skillFilter && skillFilter !== 'all') {
        openReqs = openReqs.filter(r => {
            const indMatch = r.industry && r.industry.toLowerCase().includes(skillFilter.toLowerCase());
            const skillMatch = r.skills && r.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
            return indMatch || skillMatch;
        });
    }

    container.innerHTML = `
        <div style="background: white; padding: 16px 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-weight: 700; color: #0f172a; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                🎯 <span>Filter Open Jobs by Skill / Sector:</span>
            </div>
            <select id="job-skill-filter" onchange="renderJobBoard(this.value)" style="padding: 10px 16px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-weight: 600; color: #0f172a; background-color: #ffffff; cursor: pointer; font-size: 0.9rem;">
                <option value="all" ${skillFilter === 'all' ? 'selected' : ''}>🌟 All Open Jobs & Skills</option>
                <option value="Construction" ${skillFilter === 'Construction' ? 'selected' : ''}>🏗️ Construction (Mason, Carpenter, Helper)</option>
                <option value="Hospitality" ${skillFilter === 'Hospitality' ? 'selected' : ''}>🍽️ Hotel & Hospitality (Kitchen Helper, Steward)</option>
                <option value="Logistics" ${skillFilter === 'Logistics' ? 'selected' : ''}>⚙️ Factory & Logistics (Packing, Operator)</option>
                <option value="Cleaning" ${skillFilter === 'Cleaning' ? 'selected' : ''}>✨ Cleaning Services (Commercial, Gardening)</option>
                <option value="IT" ${skillFilter === 'IT' ? 'selected' : ''}>💻 Information Technology (Web, Hardware)</option>
                <option value="Electronics" ${skillFilter === 'Electronics' ? 'selected' : ''}>⚡ Electronics & Electrical (Wiring, CCTV, AC)</option>
            </select>
        </div>
    `;

    if (openReqs.length === 0) {
        container.innerHTML += '<div class="bg-white p-8 rounded-xl text-center text-slate-600 font-semibold shadow-sm border border-slate-200">🎉 No open job requirements matching this category right now. Check back soon for new openings!</div>';
        return;
    }

    const currentWorkerApplied = JSON.parse(localStorage.getItem('workbee_applied_jobs') || '[]');

    openReqs.forEach(req => {
        const hasApplied = currentWorkerApplied.includes(req.id);
        const filledCount = (req.applicants ? req.applicants.length : 0);
        const totalReq = (req.workersReq || 1);

        const card = document.createElement('div');
        card.className = `bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all border-amber-200`;
        card.style.background = '#ffffff';

        let statusBadge = `<span style="background: #10B981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">🟢 OPEN FOR APPLYING (${filledCount}/${totalReq})</span>`;

        let skillsBadges = (req.skills || []).map(s => `<span style="background: #fffbe6; color: #b45309; border: 1px solid #fde68a; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${s}</span>`).join(' ');

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                <div>
                    <span style="font-family: monospace; font-weight: bold; color: #F59E0B; font-size: 1rem;">REF: #${req.id}</span>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #0F172A; margin: 4px 0 2px;">${req.skills ? req.skills.join(', ') : req.industry} Required</h3>
                    <p style="font-size: 0.85rem; color: #64748B;">Employer: Client Company (Privacy Protected)</p>
                </div>
                <div>${statusBadge}</div>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
                ${skillsBadges}
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 16px; font-size: 0.875rem;">
                <div>📍 <strong>Location:</strong> ${req.district} ${req.town ? '(' + req.town + ')' : ''}</div>
                <div>⏰ <strong>Shift:</strong> ${(req.shifts || ['Day']).join('/')}</div>
                <div>🍱 <strong>Meals:</strong> ${(req.meals || ['Lunch']).join(', ')}</div>
                <div>📅 <strong>Dates:</strong> ${req.fromDate || req.postedDate} &rarr; ${req.toDate || 'Ongoing'} (${req.totalDays || 1} Days)</div>
                <div>👥 <strong>Required:</strong> ${totalReq} Worker(s) (${filledCount} Accepted)</div>
                <div>💵 <strong>Daily Pay:</strong> LKR ${(req.payRate || 0).toLocaleString()} / day</div>
                <div>💰 <strong>Total Pay:</strong> <strong style="color: #059669; font-size: 1rem;">LKR ${(req.totalPay || 0).toLocaleString()}</strong></div>
            </div>

            ${req.desc ? `<p style="font-size: 0.875rem; color: #475569; margin-bottom: 16px;"><em>"${req.desc}"</em></p>` : ''}

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
                <span style="font-size: 0.8rem; color: #94a3b8;">Posted on: ${req.postedDate || 'Recent'}</span>
                <div>
                    ${hasApplied ? `
                        <button disabled style="background: #059669; color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: not-allowed;">
                            ✓ You Applied (Pending Review)
                        </button>
                    ` : `
                        <button onclick="applyForJob('${req.id}')" style="background: #F59E0B; color: #0F172A; padding: 10px 24px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(245,158,11,0.3);">
                            ✅ Apply / Accept Job
                        </button>
                    `}
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function applyForJob(reqId) {
    const workerInput = prompt("Enter your Worker ID (e.g. WB-1024) or Your Full Name to accept this job:", "WB-1024");
    if (!workerInput || !workerInput.trim()) return;

    const cleanedInput = workerInput.trim();
    let reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    const reqIndex = reqs.findIndex(r => r.id === reqId);

    if (reqIndex !== -1) {
        let req = reqs[reqIndex];
        if (!req.applicants) req.applicants = [];
        if (!req.applicantsDetails) req.applicantsDetails = [];

        // Check if already applied
        if (!req.applicants.includes(cleanedInput)) {
            req.applicants.push(cleanedInput);

            // Lookup worker in localStorage or sampleWorkers
            const allWorkers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
            const foundWorker = allWorkers.find(w => w.id === cleanedInput || ((w.firstName || '') + ' ' + (w.lastName || '')).toLowerCase().includes(cleanedInput.toLowerCase())) ||
                                (typeof sampleWorkers !== 'undefined' ? sampleWorkers.find(w => w.id === cleanedInput || (w.lastName && w.lastName.toLowerCase().includes(cleanedInput.toLowerCase()))) : null);

            const applicantDetail = {
                id: foundWorker ? foundWorker.id : cleanedInput,
                name: foundWorker ? ((foundWorker.firstName || '') + ' ' + (foundWorker.lastName || foundWorker.name || '')).trim() : cleanedInput,
                phone: foundWorker ? (foundWorker.phone || foundWorker.whatsapp || 'N/A') : 'N/A',
                nic: foundWorker ? (foundWorker.nic || 'N/A') : 'N/A',
                skills: foundWorker ? (foundWorker.skills || [foundWorker.category || 'General']) : (req.skills || ['General']),
                dateApplied: new Date().toLocaleString()
            };

            req.applicantsDetails.push(applicantDetail);

            const totalNeeded = parseInt(req.workersReq) || 1;
            if (req.applicants.length >= totalNeeded) {
                req.status = 'FILLED';
                alert(`🎉 Congratulations! All ${totalNeeded} worker position(s) for Job #${req.id} have been filled.\n\nThe job requirement is now CLOSED and submitted exclusively to Admin for dispatching.`);
            } else {
                alert(`✅ Application accepted for Job #${req.id}! (${req.applicants.length}/${totalNeeded} positions filled)`);
            }

            localStorage.setItem('workbee_requirements', JSON.stringify(reqs));
        } else {
            alert(`You have already accepted/applied for Job #${req.id}.`);
        }
    }

    let applied = JSON.parse(localStorage.getItem('workbee_applied_jobs') || '[]');
    if (!applied.includes(reqId)) {
        applied.push(reqId);
        localStorage.setItem('workbee_applied_jobs', JSON.stringify(applied));
    }

    renderJobBoard();
}

function bindModal() {
    const modal = document.getElementById('request-modal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('request-form');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const workerId = document.getElementById('req-worker-id').value;
            alert(`Request sent successfully for Worker ${workerId}! Our team will contact you shortly.`);
            modal.style.display = 'none';
            form.reset();
        });
    }
}

function openRequestModal(workerId) {
    const modal = document.getElementById('request-modal');
    const workerIdInput = document.getElementById('req-worker-id');
    const messageInput = document.getElementById('req-message');
    
    if (modal && workerIdInput && messageInput) {
        workerIdInput.value = workerId;
        messageInput.value = `I am interested in hiring worker ${workerId}. Please contact me.`;
        modal.style.display = 'block';
    }
}
