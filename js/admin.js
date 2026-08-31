// admin.js v60 - Full Clean Rewrite

document.addEventListener('DOMContentLoaded', function () {
    checkAuth();
});

function checkAuth() {
    var isAuth = localStorage.getItem('wb_admin_auth');
    var sessStr = localStorage.getItem('workbee_session');
    if (sessStr) {
        try {
            var sess = JSON.parse(sessStr);
            if (sess && sess.role === 'admin') {
                isAuth = 'true';
                localStorage.setItem('wb_admin_auth', 'true');
            }
        } catch (e) {}
    }

    var loginGate = document.getElementById('login-gate');
    var dashboard = document.getElementById('admin-dashboard');
    if (isAuth === 'true') {
        if (loginGate) loginGate.style.display = 'none';
        if (dashboard) dashboard.style.display = 'flex';
        initAdmin();
    } else {
        if (loginGate) loginGate.style.display = 'flex';
        if (dashboard) dashboard.style.display = 'none';
        setupLoginForm();
    }
}

function setupLoginForm() {
    var toggleBtn = document.getElementById('toggle-password-btn');
    if (toggleBtn) {
        toggleBtn.onclick = function () {
            var passEl = document.getElementById('admin-password') || document.getElementById('admin-pass');
            if (passEl) {
                var ip = passEl.type === 'password';
                passEl.type = ip ? 'text' : 'password';
                toggleBtn.textContent = ip ? 'Hide' : 'Show';
            }
        };
    }
    var loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            var userEl = document.getElementById('admin-username') || document.getElementById('admin-user');
            var passEl = document.getElementById('admin-password') || document.getElementById('admin-pass');
            var user = userEl ? userEl.value.trim().toLowerCase() : '';
            var pass = passEl ? passEl.value : '';
            var errEl = document.getElementById('login-error');
            if (user === 'admin' && (pass === 'workbee2024' || pass === 'admin123')) {
                localStorage.setItem('wb_admin_auth', 'true');
                var adminSession = {
                    id: 'admin_root',
                    username: 'admin',
                    role: 'admin',
                    name: 'Administrator'
                };
                localStorage.setItem('workbee_session', JSON.stringify(adminSession));
                var lg = document.getElementById('login-gate');
                var db = document.getElementById('admin-dashboard');
                if (lg) lg.style.display = 'none';
                if (db) db.style.display = 'flex';
                initAdmin();
            } else {
                if (errEl) errEl.style.display = 'block';
            }
        };
    }
}

function seedData() {
    var hasSeeded = localStorage.getItem('workbee_seeded_initial');
    if (!hasSeeded) {
        var sw = [
            { id: 'WB-9001', firstName: 'Kamal', lastName: 'Perera', nic: '912345678V', phone: '0771234567', whatsapp: '0771234567', age: 32, category: 'Construction', experience: 5, skills: ['Masonry', 'Construction Helper'], locations: ['Colombo'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Maharagama', currentAddress: 'No. 12, High Level Rd, Maharagama', permanentAddress: 'No. 12, High Level Rd, Maharagama', nextOfKinName: 'Sunethra Perera', nextOfKinPhone: '0779988776', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 12, High Level Rd, Maharagama' },
            { id: 'WB-9002', firstName: 'Nimal', lastName: 'Silva', nic: '852345678V', phone: '0711234567', whatsapp: '0711234567', age: 40, category: 'Hospitality', experience: 10, skills: ['Cooking', 'Kitchen Helper', 'Steward'], locations: ['Kandy'], shifts: ['Night'], status: 'approved', date: new Date().toISOString(), policeStation: 'Kandy', currentAddress: 'No. 45, Peradeniya Rd, Kandy', permanentAddress: 'No. 45, Peradeniya Rd, Kandy', nextOfKinName: 'Malini Silva', nextOfKinPhone: '0719876543', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 45, Peradeniya Rd, Kandy' },
            { id: 'WB-9003', firstName: 'Sunil', lastName: 'Fernando', nic: '952345678V', phone: '0781234567', whatsapp: '0781234567', age: 28, category: 'Factory', experience: 2, skills: ['Packing', 'Machine Operator'], locations: ['Gampaha'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Ja-Ela', currentAddress: 'No. 88, Negombo Rd, Ja-Ela', permanentAddress: 'No. 88, Negombo Rd, Ja-Ela', nextOfKinName: 'Anula Fernando', nextOfKinPhone: '0788877665', nextOfKinRelationship: 'Parent (මව / පියා)', nextOfKinAddress: 'No. 88, Negombo Rd, Ja-Ela' },
            { id: 'WB-9004', firstName: 'Ruwan', lastName: 'Wickramasinghe', nic: '931122334V', phone: '0765544332', whatsapp: '0765544332', age: 35, category: 'Electronics', experience: 7, skills: ['Electrician', 'Wiring', 'CCTV Technician'], locations: ['Colombo'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Nugegoda', currentAddress: 'No. 15, Station Rd, Nugegoda', permanentAddress: 'No. 15, Station Rd, Nugegoda', nextOfKinName: 'Champa Wickramasinghe', nextOfKinPhone: '0761122334', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 15, Station Rd, Nugegoda' },
            { id: 'WB-9005', firstName: 'Priyantha', lastName: 'Kumara', nic: '889988776V', phone: '0756677889', whatsapp: '0756677889', age: 45, category: 'Cleaning', experience: 8, skills: ['Cleaner', 'Gardening', 'Commercial Cleaning'], locations: ['Colombo'], shifts: ['Day', 'Night'], status: 'approved', date: new Date().toISOString(), policeStation: 'Piliyandala', currentAddress: 'No. 24, Main St, Piliyandala', permanentAddress: 'No. 24, Main St, Piliyandala', nextOfKinName: 'Kanthi Kumara', nextOfKinPhone: '0751122334', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 24, Main St, Piliyandala' },
            { id: 'WB-9006', firstName: 'Kasun', lastName: 'Rajapaksha', nic: '971122445V', phone: '0723344556', whatsapp: '0723344556', age: 29, category: 'Construction', experience: 4, skills: ['Masonry', 'Painter', 'Tiler'], locations: ['Colombo', 'Gampaha'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Kadawatha', currentAddress: 'No. 7, Kandy Rd, Kadawatha', permanentAddress: 'No. 7, Kandy Rd, Kadawatha', nextOfKinName: 'Dhammika Rajapaksha', nextOfKinPhone: '0729988776', nextOfKinRelationship: 'Parent (මව / පියා)', nextOfKinAddress: 'No. 7, Kandy Rd, Kadawatha' }
        ];
        if (localStorage.getItem('workbee_worker_registrations') === null) {
            localStorage.setItem('workbee_worker_registrations', JSON.stringify(sw));
        }

        var sc = [
            { id: 'C-8001', name: 'ABC Construction Ltd', brn: 'PV12345', contact: 'Saman Perera', phone: '0112345678', email: 'info@abc.com', city: 'Colombo', status: 'approved', date: new Date().toISOString() },
            { id: 'C-8002', name: 'Grand Lanka Hotel and Resorts', brn: 'PV67890', contact: 'Dilshan Fernando', phone: '0812233445', email: 'hr@grandlanka.lk', city: 'Kandy', status: 'approved', date: new Date().toISOString() },
            { id: 'C-8003', name: 'LogiTrans Logistics Pvt Ltd', brn: 'PV99887', contact: 'Kavinda Silva', phone: '0312255888', email: 'ops@logitrans.lk', city: 'Gampaha', status: 'approved', date: new Date().toISOString() },
            { id: 'C-8004', name: 'CleanTech Commercial Services', brn: 'PV44332', contact: 'Nirmala Jayasinghe', phone: '0117766554', email: 'contact@cleantech.lk', city: 'Colombo', status: 'approved', date: new Date().toISOString() },
            { id: 'C-8005', name: 'Gagana Construction', brn: 'PV88441', contact: 'Gagana Ranasinghe', phone: '0769447538', email: 'gagana@gmail.com', city: 'Colombo', status: 'approved', date: new Date().toISOString() }
        ];
        if (localStorage.getItem('workbee_companies') === null) {
            localStorage.setItem('workbee_companies', JSON.stringify(sc));
        }

        var sr = [
            { id: 'JOB-4821', company: 'ABC Construction Ltd', phone: '0112345678', industry: 'Construction', skills: ['Masonry', 'Construction Helper'], workersReq: 2, district: 'Colombo', town: 'Colombo 03', fromDate: '2026-09-01', toDate: '2026-09-15', totalDays: 15, payRate: 2500, totalPay: 75000, shifts: ['Day'], meals: ['Breakfast', 'Lunch'], desc: 'Commercial site construction.', status: 'OPEN', applicants: ['WB-9001'], applicantsDetails: [{ id: 'WB-9001', name: 'Kamal Perera', phone: '0771234567', nic: '912345678V', skills: ['Masonry'] }], postedDate: new Date().toISOString().split('T')[0] },
            { id: 'JOB-9500', company: 'Gagana Construction', phone: '0769447538', industry: 'Construction', skills: ['Masonry'], workersReq: 2, district: 'Colombo', town: 'Nugegoda', fromDate: '2026-08-21', toDate: '2026-08-28', totalDays: 8, payRate: 3200, totalPay: 51200, shifts: ['Night'], meals: ['Lunch'], desc: 'Masonry work.', status: 'OPEN', applicants: ['WB-9001', 'WB-9006'], applicantsDetails: [{ id: 'WB-9001', name: 'Kamal Perera', phone: '0771234567', nic: '912345678V', skills: ['Masonry'] }, { id: 'WB-9006', name: 'Kasun Rajapaksha', phone: '0723344556', nic: '971122445V', skills: ['Masonry'] }], postedDate: new Date().toISOString().split('T')[0] },
            { id: 'JOB-2280', company: 'Grand Lanka Hotel and Resorts', phone: '0812233445', industry: 'Hospitality', skills: ['Kitchen Helper', 'Steward'], workersReq: 2, district: 'Kandy', town: 'Kandy City', fromDate: '2026-09-05', toDate: '2026-09-20', totalDays: 15, payRate: 2200, totalPay: 66000, shifts: ['Day', 'Night'], meals: ['Breakfast', 'Lunch', 'Dinner'], desc: 'Hotel banquet catering.', status: 'OPEN', applicants: ['WB-9002'], applicantsDetails: [{ id: 'WB-9002', name: 'Nimal Silva', phone: '0711234567', nic: '852345678V', skills: ['Kitchen Helper'] }], postedDate: new Date().toISOString().split('T')[0] },
            { id: 'JOB-7740', company: 'LogiTrans Logistics Pvt Ltd', phone: '0312255888', industry: 'Factory', skills: ['Packing', 'Machine Operator'], workersReq: 3, district: 'Gampaha', town: 'Ja-Ela', fromDate: '2026-09-10', toDate: '2026-09-25', totalDays: 15, payRate: 2000, totalPay: 90000, shifts: ['Day'], meals: ['Lunch', 'Tea'], desc: 'Factory packaging.', status: 'OPEN', applicants: ['WB-9003'], applicantsDetails: [{ id: 'WB-9003', name: 'Sunil Fernando', phone: '0781234567', nic: '952345678V', skills: ['Packing'] }], postedDate: new Date().toISOString().split('T')[0] }
        ];
        if (localStorage.getItem('workbee_requirements') === null) {
            localStorage.setItem('workbee_requirements', JSON.stringify(sr));
        }

        localStorage.setItem('workbee_seeded_initial', 'true');
    }
}

function initAdmin() {
    seedData();
    var logoutBtn = document.getElementById('admin-logout') || document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = function () {
            localStorage.removeItem('wb_admin_auth');
            window.location.reload();
        };
    }
    var navItems = document.querySelectorAll('.nav-item, .admin-nav-item');
    for (var i = 0; i < navItems.length; i++) {
        (function (item) {
            item.addEventListener('click', function (e) {
                var href = item.getAttribute('href');
                if (href && href !== '#' && item.getAttribute('target') === '_blank') return;
                e.preventDefault();
                for (var j = 0; j < navItems.length; j++) navItems[j].classList.remove('active');
                var panels = document.querySelectorAll('.tab-content, .admin-panel');
                for (var j = 0; j < panels.length; j++) panels[j].classList.remove('active');
                item.classList.add('active');
                var target = item.getAttribute('data-target');
                var targetEl = target ? document.getElementById(target) : null;
                if (targetEl) targetEl.classList.add('active');

                var titleEl = document.getElementById('current-section-title');
                if (titleEl) {
                    var titles = {
                        'tab-workers': 'Workers',
                        'tab-companies': 'Companies',
                        'tab-requirements': 'Requirements',
                        'tab-broadcast': 'Broadcast',
                        'tab-backup': 'Backup & Restore'
                    };
                    if (titles[target]) titleEl.textContent = titles[target];
                }

                if (target === 'tab-workers') renderWorkers();
                if (target === 'tab-companies') renderCompanies();
                if (target === 'tab-requirements') renderRequirements();
                if (target === 'tab-broadcast') updateBroadcastPreview();
            });
        })(navItems[i]);
    }
    var si = document.getElementById('search-workers');
    if (si) si.addEventListener('input', function () { renderWorkers(this.value.trim().toLowerCase()); });
    var sc = document.getElementById('search-companies');
    if (sc) sc.addEventListener('input', function () { renderCompanies(this.value.trim().toLowerCase()); });
    var wf = document.getElementById('worker-filters');
    if (wf) {
        wf.addEventListener('click', function (e) {
            if (e.target.classList.contains('filter-btn')) {
                var btns = wf.querySelectorAll('.filter-btn');
                for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
                e.target.classList.add('active');
                renderWorkers();
            }
        });
    }
    setupDataBackupHandlers();
    updateStats();
    renderWorkers();
    renderCompanies();
    renderRequirements();

    // Trigger initial cloud sync from Firebase
    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.syncFromCloud().then(function (res) {
            if (res && res.updated) {
                updateStats();
                renderWorkers();
                renderCompanies();
                renderRequirements();
            }
        }).catch(function () {});

        // Background auto-sync every 12 seconds for real-time registrations
        if (window._wbSyncInterval) clearInterval(window._wbSyncInterval);
        window._wbSyncInterval = setInterval(function () {
            WB_FIREBASE.syncFromCloud().then(function (res) {
                if (res && res.updated) {
                    updateStats();
                    renderWorkers();
                    renderCompanies();
                    renderRequirements();
                }
            }).catch(function () {});
        }, 12000);
    }
}

window.triggerCloudSync = async function () {
    var btn = document.getElementById('btn-cloud-sync');
    var txt = document.getElementById('cloud-sync-text');
    if (txt) txt.textContent = 'Syncing...';
    if (btn) btn.style.background = '#d97706';

    if (typeof WB_FIREBASE !== 'undefined') {
        var res = await WB_FIREBASE.syncFromCloud();
        updateStats();
        renderWorkers();
        renderCompanies();
        renderRequirements();
        if (txt) txt.textContent = (res && res.success) ? 'Synced ✅' : 'Offline Mode';
        if (btn) btn.style.background = (res && res.success) ? '#059669' : '#64748b';
        setTimeout(function () {
            if (txt) txt.textContent = 'Sync with Cloud';
            if (btn) btn.style.background = '#0284c7';
        }, 3000);
    }
};

function getWorkersData() {
    var ws = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    var modified = false;

    for (var i = 0; i < users.length; i++) {
        var u = users[i];
        if (u.role === 'worker') {
            var p = u.profileData || {};
            var matchingIndex = -1;
            for (var k = 0; k < ws.length; k++) {
                var w = ws[k];
                if ((w.id && p.id && String(w.id) === String(p.id)) ||
                    (w.username && u.username && w.username.toLowerCase() === u.username.toLowerCase()) ||
                    (w.phone && p.phone && w.phone.replace(/[^0-9]/g, '') === p.phone.replace(/[^0-9]/g, '')) ||
                    (w.nic && p.nic && w.nic.toLowerCase() === p.nic.toLowerCase())) {
                    matchingIndex = k;
                    break;
                }
            }

            if (matchingIndex !== -1) {
                var existing = ws[matchingIndex];
                var merged = Object.assign({}, p, existing);
                merged.username = merged.username || u.username;
                merged.id = merged.id || existing.id || p.id || ('WB-' + Math.floor(1000 + Math.random() * 9000));
                merged.status = merged.status || existing.status || p.status || 'pending';
                if (JSON.stringify(merged) !== JSON.stringify(existing)) {
                    ws[matchingIndex] = merged;
                    modified = true;
                }
            } else {
                p.id = p.id || ('WB-' + Math.floor(1000 + Math.random() * 9000));
                p.username = p.username || u.username;
                p.status = p.status || 'pending';
                p.date = p.date || u.createdAt || new Date().toISOString();
                p.skills = p.skills || (p.category ? [p.category] : ['General']);
                p.locations = p.locations || ['Colombo'];
                p.shifts = p.shifts || ['Day'];
                ws.unshift(p);
                modified = true;
            }
        }
    }
    if (modified) {
        localStorage.setItem('workbee_worker_registrations', JSON.stringify(ws));
    }
    return ws;
}

function getCompaniesData() {
    var cs = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var legacyCs = JSON.parse(localStorage.getItem('workbee_company_registrations') || '[]');
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    var modified = false;

    for (var l = 0; l < legacyCs.length; l++) {
        var lc = legacyCs[l];
        var ex = cs.some(function (c) { return (c.id && lc.id && String(c.id) === String(lc.id)) || (c.name && lc.name && c.name.toLowerCase() === lc.name.toLowerCase()); });
        if (!ex) { cs.unshift(lc); modified = true; }
    }

    for (var i = 0; i < users.length; i++) {
        var u = users[i];
        if (u.role === 'company') {
            var cp = u.profileData || {};
            var matchingIndex = -1;
            for (var k = 0; k < cs.length; k++) {
                var c = cs[k];
                if ((c.id && cp.id && String(c.id) === String(cp.id)) ||
                    (c.username && u.username && c.username.toLowerCase() === u.username.toLowerCase()) ||
                    (c.phone && cp.phone && c.phone.replace(/[^0-9]/g, '') === cp.phone.replace(/[^0-9]/g, '')) ||
                    (c.name && cp.name && c.name.toLowerCase() === cp.name.toLowerCase()) ||
                    (c.companyName && cp.companyName && c.companyName.toLowerCase() === cp.companyName.toLowerCase()) ||
                    (c.brn && cp.brn && c.brn.toLowerCase() === cp.brn.toLowerCase())) {
                    matchingIndex = k;
                    break;
                }
            }

            if (matchingIndex !== -1) {
                var existingC = cs[matchingIndex];
                var mergedC = Object.assign({}, cp, existingC);
                mergedC.username = mergedC.username || u.username;
                mergedC.id = mergedC.id || existingC.id || cp.id || ('C-' + Math.floor(1000 + Math.random() * 9000));
                mergedC.name = mergedC.name || mergedC.companyName || cp.name || cp.companyName || u.username || 'Company';
                mergedC.status = mergedC.status || existingC.status || cp.status || 'approved';
                if (JSON.stringify(mergedC) !== JSON.stringify(existingC)) {
                    cs[matchingIndex] = mergedC;
                    modified = true;
                }
            } else {
                cp.id = cp.id || ('C-' + Math.floor(1000 + Math.random() * 9000));
                cp.username = cp.username || u.username;
                cp.name = cp.name || cp.companyName || u.username || 'Company';
                cp.status = cp.status || 'approved';
                cp.date = cp.date || u.createdAt || new Date().toISOString();
                cs.unshift(cp);
                modified = true;
            }
        }
    }
    if (modified) {
        localStorage.setItem('workbee_companies', JSON.stringify(cs));
    }
    return cs;
}

function getRequirementsData() {
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var postings = JSON.parse(localStorage.getItem('workbee_job_postings') || '[]');
    var modified = false;

    for (var i = 0; i < postings.length; i++) {
        var p = postings[i];
        var matchingIdx = -1;
        for (var k = 0; k < reqs.length; k++) {
            if (String(reqs[k].id) === String(p.id)) {
                matchingIdx = k;
                break;
            }
        }
        if (matchingIdx === -1) {
            reqs.unshift({
                id: p.id || ('JOB-' + Math.floor(1000 + Math.random() * 9000)),
                company: p.companyName || p.company || 'Client',
                phone: p.companyPhone || p.phone || 'N/A',
                skills: p.skillRequired ? [p.skillRequired] : (p.skills || ['General']),
                workersReq: parseInt(p.workersNeeded || p.workersReq) || 1,
                district: p.location || p.district || 'Colombo',
                town: p.town || '',
                fromDate: p.requiredDate || p.fromDate || new Date().toISOString().split('T')[0],
                toDate: p.requiredDate || p.toDate || new Date().toISOString().split('T')[0],
                totalPay: parseFloat(p.dailyPay || p.totalPay) || 0,
                shifts: p.shifts || ['Day'],
                meals: p.meals || ['Provided by Employer'],
                desc: p.notes || p.desc || '',
                status: p.status === 'Awaiting Admin Dispatch' ? 'OPEN' : (p.status || 'OPEN'),
                applicants: p.applicants || [],
                postedDate: p.createdAt ? p.createdAt.split('T')[0] : (p.postedDate || new Date().toISOString().split('T')[0])
            });
            modified = true;
        }
    }
    if (modified) {
        localStorage.setItem('workbee_requirements', JSON.stringify(reqs));
    }
    return reqs;
}

function updateStats() {
    var workers = getWorkersData();
    var companies = getCompaniesData();
    var reqs = getRequirementsData();
    var w = document.getElementById('stat-total-workers');
    var p = document.getElementById('stat-pending');
    var c = document.getElementById('stat-companies');
    var r = document.getElementById('stat-requirements');
    if (w) w.textContent = workers.length;
    if (p) p.textContent = workers.filter(function (x) { return x.status === 'pending'; }).length;
    if (c) c.textContent = companies.length;
    if (r) r.textContent = reqs.length;
}

function renderWorkers(q) {
    var tbody = document.getElementById('workers-tbody');
    if (!tbody) return;
    var workers = getWorkersData();
    var fb = document.querySelector('#worker-filters .filter-btn.active');
    var f = fb ? fb.getAttribute('data-filter') : 'all';
    var filtered = (f && f !== 'all') ? workers.filter(function (w) { return w.status === f; }) : workers;
    if (q) {
        var ql = q.toLowerCase();
        filtered = filtered.filter(function (w) {
            var n = ((w.firstName || '') + ' ' + (w.lastName || w.name || '')).toLowerCase();
            var s = (Array.isArray(w.skills) ? w.skills.join(' ') : (w.skills || '')).toLowerCase();
            return n.indexOf(ql) !== -1 || s.indexOf(ql) !== -1 || String(w.id || '').toLowerCase().indexOf(ql) !== -1;
        });
    }
    tbody.innerHTML = '';
    if (!filtered.length) { tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:20px;color:#64748b;">No workers found.</td></tr>'; return; }
    for (var i = 0; i < filtered.length; i++) {
        var w = filtered[i];
        var tr = document.createElement('tr');
        var sk = Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || w.category || 'N/A');
        var lo = Array.isArray(w.locations) ? w.locations.join(', ') : (w.locations || 'N/A');
        var sh = Array.isArray(w.shifts) ? w.shifts.join('/') : (w.shifts || 'Day');
        var fn = ((w.firstName || '') + ' ' + (w.lastName || w.name || '')).trim();
        var ia = w.status === 'approved';
        var wid = String(w.id || ('WB-' + i));
        tr.innerHTML = '<td><strong style="color:#F59E0B;">#' + wid + '</strong></td>' +
            '<td>' + fn + '</td>' +
            '<td>' + (w.nic || 'N/A') + '</td>' +
            '<td>' + (w.phone || 'N/A') + '</td>' +
            '<td>' + (w.whatsapp || w.phone || 'N/A') + '</td>' +
            '<td>' + (w.age || 25) + '</td>' +
            '<td><small style="background:#f1f5f9;color:#334155;padding:2px 6px;border-radius:4px;">' + sk + '</small></td>' +
            '<td>' + lo + '</td>' +
            '<td>' + sh + '</td>' +
            '<td><span style="background:' + (ia ? '#dcfce7;color:#166534' : (w.status === 'rejected' ? '#fee2e2;color:#dc2626' : '#fef3c7;color:#92400e')) + ';padding:2px 8px;border-radius:4px;font-weight:600;">' + (w.status || 'pending') + '</span></td>' +
            '<td style="white-space:nowrap;">' +
            '<button style="background:#0284c7;color:white;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;" onclick="window._viewWorker(\'' + wid + '\')">👁️ Details</button>' +
            '<button style="background:#f59e0b;color:#0f172a;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;" onclick="window._editWorker(\'' + wid + '\')">✏️ Edit</button>' +
            '<button style="background:#ef4444;color:white;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;" onclick="window._deleteWorker(\'' + wid + '\')">🗑️ Delete</button>' +
            (!ia ? '<button style="background:#10B981;color:white;border:none;padding:5px 8px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;" onclick="window._approveWorker(\'' + wid + '\')">Approve</button>' : '') +
            '</td>';
        tbody.appendChild(tr);
    }
}

// ----------------- WORKER MODALS -----------------

window._VWD = function (id) {
    var old = document.getElementById('wb-wmodal');
    if (old) old.parentNode.removeChild(old);

    var ws = getWorkersData();
    var w = null;
    for (var i = 0; i < ws.length; i++) {
        if (String(ws[i].id) === String(id) || (ws[i].username && String(ws[i].username) === String(id))) { w = ws[i]; break; }
    }
    if (!w) { alert('Worker #' + id + ' not found!'); return; }

    var fn = ((w.firstName || '') + ' ' + (w.lastName || w.name || 'Worker')).trim();
    var sk = Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || w.category || 'N/A');
    var lo = Array.isArray(w.locations) ? w.locations.join(', ') : (w.locations || 'N/A');
    var sh = Array.isArray(w.shifts) ? w.shifts.join('/') : (w.shifts || 'Day');

    var ov = document.createElement('div');
    ov.id = 'wb-wmodal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:680px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    bx.innerHTML = '<button onclick="window._CWM()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:16px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;">' +
        '<span style="font-family:monospace;color:#F59E0B;font-weight:bold;">WORKER ID: #' + w.id + '</span>' +
        '<h2 style="color:#0f172a;margin:4px 0 2px;">👷 ' + fn + '</h2>' +
        '<span style="background:' + (w.status === 'approved' ? '#dcfce7;color:#166534' : (w.status === 'rejected' ? '#fee2e2;color:#dc2626' : '#fef3c7;color:#92400e')) + ';padding:2px 10px;border-radius:12px;font-size:0.8rem;font-weight:bold;">Status: ' + (w.status || 'pending') + '</span>' +
        '</div>' +
        '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:14px;margin-bottom:14px;color:#1e3a8a;font-size:0.875rem;">' +
        '<div style="font-weight:bold;margin-bottom:8px;color:#1e40af;">🔒 Confidential Personal Information (Admin Only)</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
        '<div>🪪 <strong>NIC Number:</strong> ' + (w.nic || 'N/A') + '</div>' +
        '<div>📞 <strong>Primary Phone:</strong> ' + (w.phone || 'N/A') + '</div>' +
        '<div>💬 <strong>WhatsApp:</strong> ' + (w.whatsapp || w.phone || 'N/A') + '</div>' +
        '<div>🚔 <strong>Nearest Police Station:</strong> <strong style="color:#0284c7;">' + (w.policeStation || 'N/A') + '</strong></div>' +
        '<div style="grid-column:1/-1;">🏠 <strong>Current Address:</strong> ' + (w.currentAddress || 'N/A') + '</div>' +
        '<div style="grid-column:1/-1;">🏡 <strong>Permanent Address:</strong> ' + (w.permanentAddress || 'N/A') + '</div>' +
        '</div></div>' +
        '<div style="background:#fff8e6;border:1px solid #fde68a;border-radius:12px;padding:14px;margin-bottom:14px;color:#78350f;font-size:0.875rem;">' +
        '<div style="font-weight:bold;margin-bottom:8px;color:#92400e;">🚨 Emergency Contact / Next of Kin Details</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
        '<div>👤 <strong>Next of Kin Name:</strong> ' + (w.nextOfKinName || 'N/A') + '</div>' +
        '<div>📞 <strong>Kin Phone:</strong> <strong style="color:#b45309;">' + (w.nextOfKinPhone || 'N/A') + '</strong></div>' +
        '<div>🤝 <strong>Relationship:</strong> ' + (w.nextOfKinRelationship || 'N/A') + '</div>' +
        '<div>📍 <strong>Kin Address:</strong> ' + (w.nextOfKinAddress || 'N/A') + '</div>' +
        '</div></div>' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.875rem;color:#334155;">' +
        '<div style="font-weight:bold;margin-bottom:8px;color:#0f172a;">💼 Work Skills & Preferences</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
        '<div>🛠️ <strong>Category:</strong> ' + (w.category || 'N/A') + '</div>' +
        '<div>⌛ <strong>Experience:</strong> ' + (w.experience || 0) + ' years</div>' +
        '<div>🎂 <strong>Age:</strong> ' + (w.age || 'N/A') + '</div>' +
        '<div>⚡ <strong>Notice Period:</strong> ' + (w.noticeperiod || 'Immediate') + '</div>' +
        '<div>🕒 <strong>Shifts:</strong> ' + sh + '</div>' +
        '<div>📍 <strong>Districts:</strong> ' + lo + '</div>' +
        '<div style="grid-column:1/-1;">💡 <strong>Skills:</strong> ' + sk + '</div>' +
        '</div></div>' +
        '<div style="display:flex;justify-content:flex-end;gap:10px;">' +
        '<button onclick="window._CWM(); window._editWorker(\'' + w.id + '\')" style="padding:10px 18px;background:#F59E0B;color:#0f172a;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">✏️ Edit Worker</button>' +
        '<button onclick="window._CWM()" style="padding:10px 20px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Close</button>' +
        '</div>';

    ov.appendChild(bx);
    document.body.appendChild(ov);
};
window._viewWorker = window._VWD;
window._viewWorkerDetails = window._VWD;

window._CWM = function () {
    var m = document.getElementById('wb-wmodal');
    if (m) m.parentNode.removeChild(m);
};
window._closeWorkerModal = window._CWM;

// Edit Worker Modal
window._editWorker = function (id) {
    var old = document.getElementById('wb-wedit-modal');
    if (old) old.parentNode.removeChild(old);

    var ws = getWorkersData();
    var w = null;
    for (var i = 0; i < ws.length; i++) {
        if (String(ws[i].id) === String(id) || (ws[i].username && String(ws[i].username) === String(id))) { w = ws[i]; break; }
    }
    if (!w) { alert('Worker #' + id + ' not found!'); return; }

    var sk = Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || '');
    var lo = Array.isArray(w.locations) ? w.locations.join(', ') : (w.locations || '');
    var sh = Array.isArray(w.shifts) ? w.shifts.join(', ') : (w.shifts || 'Day');

    var ov = document.createElement('div');
    ov.id = 'wb-wedit-modal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:720px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    bx.innerHTML = '<button onclick="window._closeEditWorkerModal()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:18px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;">' +
        '<span style="font-family:monospace;color:#F59E0B;font-weight:bold;">EDIT WORKER #' + w.id + '</span>' +
        '<h2 style="color:#0f172a;margin:4px 0 0;">✏️ Edit Worker Profile</h2>' +
        '</div>' +
        '<form id="wb-edit-worker-form" onsubmit="window._saveWorker(event, \'' + w.id + '\')">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">First Name</label><input type="text" id="ew-fn" value="' + (w.firstName || '').replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Last Name</label><input type="text" id="ew-ln" value="' + (w.lastName || w.name || '').replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">NIC Number</label><input type="text" id="ew-nic" value="' + (w.nic || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Age</label><input type="number" id="ew-age" value="' + (w.age || 25) + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Phone Number</label><input type="text" id="ew-phone" value="' + (w.phone || '').replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">WhatsApp Number</label><input type="text" id="ew-wa" value="' + (w.whatsapp || w.phone || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Primary Category</label><input type="text" id="ew-cat" value="' + (w.category || 'General').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Experience (Years)</label><input type="number" id="ew-exp" value="' + (w.experience || 0) + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Skills (comma separated)</label><input type="text" id="ew-skills" value="' + sk.replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Locations / Districts (comma separated)</label><input type="text" id="ew-locs" value="' + lo.replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Shifts</label><input type="text" id="ew-shifts" value="' + sh.replace(/"/g, '&quot;') + '" placeholder="Day / Night" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Status</label><select id="ew-status" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"><option value="approved"' + (w.status === 'approved' ? ' selected' : '') + '>Approved</option><option value="pending"' + (w.status === 'pending' ? ' selected' : '') + '>Pending</option><option value="rejected"' + (w.status === 'rejected' ? ' selected' : '') + '>Rejected</option></select></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Nearest Police Station</label><input type="text" id="ew-ps" value="' + (w.policeStation || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Notice Period</label><input type="text" id="ew-np" value="' + (w.noticeperiod || 'Immediate').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Current Address</label><input type="text" id="ew-ca" value="' + (w.currentAddress || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Permanent Address</label><input type="text" id="ew-pa" value="' + (w.permanentAddress || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Next of Kin Name</label><input type="text" id="ew-kn" value="' + (w.nextOfKinName || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Next of Kin Phone</label><input type="text" id="ew-kp" value="' + (w.nextOfKinPhone || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;border-top:1px solid #e2e8f0;padding-top:14px;">' +
        '<button type="button" onclick="window._closeEditWorkerModal()" style="padding:10px 18px;background:#94a3b8;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Cancel</button>' +
        '<button type="submit" style="padding:10px 24px;background:#10B981;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">💾 Save Changes</button>' +
        '</div>' +
        '</form>';

    ov.appendChild(bx);
    document.body.appendChild(ov);
};
window._EWD = window._editWorker;

window._closeEditWorkerModal = function () {
    var m = document.getElementById('wb-wedit-modal');
    if (m) m.parentNode.removeChild(m);
};

window._saveWorker = function (e, id) {
    if (e) e.preventDefault();
    var ws = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var found = false;
    for (var i = 0; i < ws.length; i++) {
        if (String(ws[i].id) === String(id)) {
            var fn = document.getElementById('ew-fn').value.trim();
            var ln = document.getElementById('ew-ln').value.trim();
            var nic = document.getElementById('ew-nic').value.trim();
            var age = parseInt(document.getElementById('ew-age').value, 10) || 25;
            var phone = document.getElementById('ew-phone').value.trim();
            var wa = document.getElementById('ew-wa').value.trim();
            var cat = document.getElementById('ew-cat').value.trim();
            var exp = parseInt(document.getElementById('ew-exp').value, 10) || 0;
            var skillsRaw = document.getElementById('ew-skills').value.trim();
            var locsRaw = document.getElementById('ew-locs').value.trim();
            var shiftsRaw = document.getElementById('ew-shifts').value.trim();
            var status = document.getElementById('ew-status').value;
            var ps = document.getElementById('ew-ps').value.trim();
            var np = document.getElementById('ew-np').value.trim();
            var ca = document.getElementById('ew-ca').value.trim();
            var pa = document.getElementById('ew-pa').value.trim();
            var kn = document.getElementById('ew-kn').value.trim();
            var kp = document.getElementById('ew-kp').value.trim();

            ws[i].firstName = fn;
            ws[i].lastName = ln;
            ws[i].name = (fn + ' ' + ln).trim();
            ws[i].nic = nic;
            ws[i].age = age;
            ws[i].phone = phone;
            ws[i].whatsapp = wa;
            ws[i].category = cat;
            ws[i].experience = exp;
            ws[i].skills = skillsRaw ? skillsRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [cat];
            ws[i].locations = locsRaw ? locsRaw.split(',').map(function (l) { return l.trim(); }).filter(Boolean) : ['Colombo'];
            ws[i].shifts = shiftsRaw ? shiftsRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : ['Day'];
            ws[i].status = status;
            ws[i].policeStation = ps;
            ws[i].noticeperiod = np;
            ws[i].currentAddress = ca;
            ws[i].permanentAddress = pa;
            ws[i].nextOfKinName = kn;
            ws[i].nextOfKinPhone = kp;

            found = true;
            break;
        }
    }

    if (found) {
        localStorage.setItem('workbee_worker_registrations', JSON.stringify(ws));
        window._closeEditWorkerModal();
        renderWorkers();
        updateStats();
        showToast('Worker #' + id + ' updated successfully!', 'success');
    }
};

window._AW = function (id) {
    var ws = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    for (var i = 0; i < ws.length; i++) { if (String(ws[i].id) === String(id)) { ws[i].status = 'approved'; break; } }
    localStorage.setItem('workbee_worker_registrations', JSON.stringify(ws));
    renderWorkers(); updateStats(); showToast('Worker ' + id + ' approved!', 'success');
};
window._DW = function (id) {
    if (!confirm('Delete worker ' + id + '?')) return;
    var ws = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var targetWorker = null;
    for (var i = 0; i < ws.length; i++) {
        if (String(ws[i].id) === String(id) || String(ws[i].username) === String(id)) {
            targetWorker = ws[i];
            break;
        }
    }
    var targetUsername = targetWorker ? targetWorker.username : null;
    var targetPhone = targetWorker ? (targetWorker.phone || '').replace(/[^0-9]/g, '') : '';
    var targetNic = targetWorker ? (targetWorker.nic || '').toLowerCase() : '';

    // 1. Remove from workbee_worker_registrations
    ws = ws.filter(function (w) { return String(w.id) !== String(id) && (!targetUsername || String(w.username) !== String(targetUsername)); });
    localStorage.setItem('workbee_worker_registrations', JSON.stringify(ws));

    // 2. Remove from workbee_users
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    users = users.filter(function (u) {
        if (u.role !== 'worker') return true;
        var p = u.profileData || {};
        if (String(u.id) === String(id) || (p.id && String(p.id) === String(id))) return false;
        if (targetUsername && (u.username === targetUsername || p.username === targetUsername)) return false;
        if (targetPhone && p.phone && p.phone.replace(/[^0-9]/g, '') === targetPhone) return false;
        if (targetNic && p.nic && p.nic.toLowerCase() === targetNic) return false;
        return true;
    });
    localStorage.setItem('workbee_users', JSON.stringify(users));

    // 3. Delete from Firebase Cloud DB immediately
    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.deleteWorker(id, targetUsername);
    }

    renderWorkers();
    updateStats();
    showToast('Worker deleted from system & cloud.', 'info');
};
window._approveWorker = window._AW;
window._deleteWorker = window._DW;

window._deleteAllWorkers = function () {
    var ws = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    var workerUsersCount = users.filter(function (u) { return u.role === 'worker'; }).length;
    var totalCount = Math.max(ws.length, workerUsersCount);

    if (!totalCount) {
        alert('Worker list is already empty.');
        return;
    }
    if (!confirm('Are you sure you want to delete ALL ' + totalCount + ' registered workers? This will permanently delete them from system & cloud.')) return;

    localStorage.setItem('workbee_worker_registrations', JSON.stringify([]));
    users = users.filter(function (u) { return u.role !== 'worker'; });
    localStorage.setItem('workbee_users', JSON.stringify(users));
    localStorage.setItem('workbee_seeded_initial', 'true');

    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.deleteAllWorkers();
    }

    renderWorkers();
    updateStats();
    showToast('All workers deleted successfully from system & cloud.', 'info');
};
window.deleteAllWorkers = window._deleteAllWorkers;

// ----------------- COMPANIES TAB -----------------

function renderCompanies(q) {
    var tbody = document.getElementById('companies-tbody');
    if (!tbody) return;
    var cs = getCompaniesData();
    if (q) {
        var ql = q.toLowerCase();
        cs = cs.filter(function (c) {
            var n = (c.name || c.companyName || '').toLowerCase();
            var b = (c.brn || c.regNumber || '').toLowerCase();
            var ct = (c.contact || c.contactPerson || '').toLowerCase();
            var p = (c.phone || '').toLowerCase();
            var e = (c.email || '').toLowerCase();
            var ci = (c.city || c.district || '').toLowerCase();
            var ind = (c.industry || '').toLowerCase();
            var cid = String(c.id || '').toLowerCase();
            return n.indexOf(ql) !== -1 || b.indexOf(ql) !== -1 || ct.indexOf(ql) !== -1 || p.indexOf(ql) !== -1 || e.indexOf(ql) !== -1 || ci.indexOf(ql) !== -1 || ind.indexOf(ql) !== -1 || cid.indexOf(ql) !== -1;
        });
    }
    tbody.innerHTML = '';
    if (!cs.length) { tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px;color:#64748b;">No companies found.</td></tr>'; return; }
    for (var i = 0; i < cs.length; i++) {
        var c = cs[i]; var tr = document.createElement('tr');
        var fd = c.date ? (c.date.indexOf('T') !== -1 ? c.date.split('T')[0] : c.date) : 'Today';
        var compKey = String(c.id || c.name || i);
        var st = c.status || 'approved';
        tr.innerHTML = '<td><strong>' + (c.name || c.companyName || 'Company') + '</strong></td>' +
            '<td>' + (c.brn || c.regNumber || 'N/A') + '</td>' +
            '<td>' + (c.industry || 'General') + '</td>' +
            '<td>' + (c.contact || c.contactPerson || 'N/A') + '</td>' +
            '<td>' + (c.phone || 'N/A') + '</td>' +
            '<td>' + (c.email || 'N/A') + '</td>' +
            '<td>' + (c.city || c.district || 'N/A') + '</td>' +
            '<td><small>' + fd + '</small></td>' +
            '<td><span style="background:' + (st === 'approved' ? '#dcfce7;color:#166534' : (st === 'rejected' ? '#fee2e2;color:#dc2626' : '#fef3c7;color:#92400e')) + ';padding:2px 8px;border-radius:4px;font-weight:600;">' + st + '</span></td>' +
            '<td style="white-space:nowrap;">' +
            '<button style="background:#0284c7;color:white;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;" onclick="window._viewCompany(\'' + compKey.replace(/'/g, "\\'") + '\')">👁️ Details</button>' +
            '<button style="background:#f59e0b;color:#0f172a;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;" onclick="window._editCompany(\'' + compKey.replace(/'/g, "\\'") + '\')">✏️ Edit</button>' +
            '<button style="background:#ef4444;color:white;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;" onclick="window._deleteCompany(\'' + compKey.replace(/'/g, "\\'") + '\')">🗑️ Delete</button>' +
            '</td>';
        tbody.appendChild(tr);
    }
}

// ----------------- COMPANY MODALS -----------------

window._viewCompany = function (id) {
    var old = document.getElementById('wb-cmodal');
    if (old) old.parentNode.removeChild(old);

    var cs = getCompaniesData();
    var c = null;
    for (var i = 0; i < cs.length; i++) {
        if (String(cs[i].id || cs[i].name) === String(id) || String(cs[i].name) === String(id) || (cs[i].username && String(cs[i].username) === String(id))) { c = cs[i]; break; }
    }
    if (!c) { alert('Company not found!'); return; }

    var cName = c.name || c.companyName || 'Company';
    var fd = c.date ? (c.date.indexOf('T') !== -1 ? c.date.split('T')[0] : c.date) : 'Recent';

    // Find job postings by this company
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var compReqs = reqs.filter(function (r) {
        return r.company && r.company.toLowerCase() === cName.toLowerCase();
    });

    var ov = document.createElement('div');
    ov.id = 'wb-cmodal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:680px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    var reqsHtml = '';
    if (compReqs.length > 0) {
        reqsHtml = '<div style="margin-top:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;">' +
            '<div style="font-weight:bold;color:#0f172a;margin-bottom:8px;font-size:0.85rem;">📋 Active Requirements Posted (' + compReqs.length + ')</div>';
        for (var k = 0; k < compReqs.length; k++) {
            var cr = compReqs[k];
            var crSk = Array.isArray(cr.skills) ? cr.skills.join(', ') : (cr.skills || cr.industry || 'General');
            reqsHtml += '<div style="padding:6px 0;border-bottom:1px solid #e2e8f0;font-size:0.8rem;display:flex;justify-content:space-between;">' +
                '<span><strong>#' + cr.id + '</strong> - ' + crSk + ' (' + (cr.workersReq || 1) + ' workers)</span>' +
                '<span style="color:#059669;font-weight:bold;">' + (cr.status || 'OPEN') + '</span>' +
                '</div>';
        }
        reqsHtml += '</div>';
    }

    bx.innerHTML = '<button onclick="window._closeCompanyModal()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:16px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;">' +
        '<span style="font-family:monospace;color:#F59E0B;font-weight:bold;">COMPANY ID: ' + (c.id || 'N/A') + '</span>' +
        '<h2 style="color:#0f172a;margin:4px 0 2px;">🏢 ' + cName + '</h2>' +
        '<span style="background:' + (c.status === 'approved' ? '#dcfce7;color:#166534' : '#fef3c7;color:#92400e') + ';padding:2px 10px;border-radius:12px;font-size:0.8rem;font-weight:bold;">Status: ' + (c.status || 'approved') + '</span>' +
        '</div>' +
        '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px;color:#1e3a8a;font-size:0.875rem;">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
        '<div>📑 <strong>BR Number:</strong> ' + (c.brn || c.regNumber || 'N/A') + '</div>' +
        '<div>🏭 <strong>Industry:</strong> ' + (c.industry || 'General') + '</div>' +
        '<div>👤 <strong>Contact Person:</strong> ' + (c.contact || c.contactPerson || 'N/A') + '</div>' +
        '<div>📞 <strong>Phone:</strong> ' + (c.phone || 'N/A') + '</div>' +
        '<div>📧 <strong>Email:</strong> ' + (c.email || 'N/A') + '</div>' +
        '<div>📍 <strong>City / District:</strong> ' + (c.city || c.district || 'N/A') + '</div>' +
        '<div style="grid-column:1/-1;">🏠 <strong>Address:</strong> ' + (c.address || c.city || 'N/A') + '</div>' +
        '<div>📅 <strong>Registered Date:</strong> ' + fd + '</div>' +
        '</div></div>' +
        reqsHtml +
        '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;">' +
        '<button onclick="window._closeCompanyModal(); window._editCompany(\'' + String(c.id || c.name).replace(/'/g, "\\'") + '\')" style="padding:10px 18px;background:#F59E0B;color:#0f172a;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">✏️ Edit Company</button>' +
        '<button onclick="window._closeCompanyModal()" style="padding:10px 20px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Close</button>' +
        '</div>';

    ov.appendChild(bx);
    document.body.appendChild(ov);
};
window._VCD = window._viewCompany;
window._viewCompanyDetails = window._viewCompany;

window._closeCompanyModal = function () {
    var m = document.getElementById('wb-cmodal');
    if (m) m.parentNode.removeChild(m);
};

// Edit Company Modal
window._editCompany = function (id) {
    var old = document.getElementById('wb-cedit-modal');
    if (old) old.parentNode.removeChild(old);

    var cs = getCompaniesData();
    var c = null;
    for (var i = 0; i < cs.length; i++) {
        if (String(cs[i].id || cs[i].name) === String(id) || String(cs[i].name) === String(id) || (cs[i].username && String(cs[i].username) === String(id))) { c = cs[i]; break; }
    }
    if (!c) { alert('Company not found!'); return; }

    var cName = c.name || c.companyName || '';
    var compKey = String(c.id || c.name);

    var ov = document.createElement('div');
    ov.id = 'wb-cedit-modal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:640px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    bx.innerHTML = '<button onclick="window._closeEditCompanyModal()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:18px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;">' +
        '<span style="font-family:monospace;color:#F59E0B;font-weight:bold;">EDIT COMPANY</span>' +
        '<h2 style="color:#0f172a;margin:4px 0 0;">🏢 Edit Company Profile</h2>' +
        '</div>' +
        '<form id="wb-edit-company-form" onsubmit="window._saveCompany(event, \'' + compKey.replace(/'/g, "\\'") + '\')">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Company Name</label><input type="text" id="ec-name" value="' + cName.replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">BR Number</label><input type="text" id="ec-brn" value="' + (c.brn || c.regNumber || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Industry</label><input type="text" id="ec-ind" value="' + (c.industry || 'General').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Contact Person</label><input type="text" id="ec-contact" value="' + (c.contact || c.contactPerson || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Phone</label><input type="text" id="ec-phone" value="' + (c.phone || '').replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Email</label><input type="email" id="ec-email" value="' + (c.email || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">City / District</label><input type="text" id="ec-city" value="' + (c.city || c.district || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Address</label><input type="text" id="ec-addr" value="' + (c.address || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Status</label><select id="ec-status" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"><option value="approved"' + (c.status === 'approved' ? ' selected' : '') + '>Approved</option><option value="pending"' + (c.status === 'pending' ? ' selected' : '') + '>Pending</option><option value="rejected"' + (c.status === 'rejected' ? ' selected' : '') + '>Rejected</option></select></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;border-top:1px solid #e2e8f0;padding-top:14px;">' +
        '<button type="button" onclick="window._closeEditCompanyModal()" style="padding:10px 18px;background:#94a3b8;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Cancel</button>' +
        '<button type="submit" style="padding:10px 24px;background:#10B981;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">💾 Save Changes</button>' +
        '</div>' +
        '</form>';

    ov.appendChild(bx);
    document.body.appendChild(ov);
};
window._ECD = window._editCompany;

window._closeEditCompanyModal = function () {
    var m = document.getElementById('wb-cedit-modal');
    if (m) m.parentNode.removeChild(m);
};

window._saveCompany = function (e, key) {
    if (e) e.preventDefault();
    var cs = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var found = false;
    for (var i = 0; i < cs.length; i++) {
        if (String(cs[i].id || cs[i].name) === String(key) || String(cs[i].name) === String(key)) {
            var n = document.getElementById('ec-name').value.trim();
            var brn = document.getElementById('ec-brn').value.trim();
            var ind = document.getElementById('ec-ind').value.trim();
            var ct = document.getElementById('ec-contact').value.trim();
            var p = document.getElementById('ec-phone').value.trim();
            var em = document.getElementById('ec-email').value.trim();
            var cy = document.getElementById('ec-city').value.trim();
            var addr = document.getElementById('ec-addr').value.trim();
            var st = document.getElementById('ec-status').value;

            cs[i].name = n;
            cs[i].companyName = n;
            cs[i].brn = brn;
            cs[i].regNumber = brn;
            cs[i].industry = ind;
            cs[i].contact = ct;
            cs[i].contactPerson = ct;
            cs[i].phone = p;
            cs[i].email = em;
            cs[i].city = cy;
            cs[i].district = cy;
            cs[i].address = addr;
            cs[i].status = st;

            found = true;
            break;
        }
    }

    if (found) {
        localStorage.setItem('workbee_companies', JSON.stringify(cs));
        window._closeEditCompanyModal();
        var sc = document.getElementById('search-companies');
        renderCompanies(sc ? sc.value.trim().toLowerCase() : '');
        updateStats();
        showToast('Company details updated successfully!', 'success');
    }
};

window._DC = function (id) {
    if (!confirm('Delete this company record?')) return;
    var cs = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var targetComp = null;
    for (var i = 0; i < cs.length; i++) {
        if (String(cs[i].id || cs[i].name) === String(id) || String(cs[i].name) === String(id)) {
            targetComp = cs[i];
            break;
        }
    }
    var cName = targetComp ? (targetComp.name || targetComp.companyName || id) : id;
    var cUsername = targetComp ? targetComp.username : null;
    var cBrn = targetComp ? (targetComp.brn || targetComp.regNumber || '').toLowerCase() : '';

    // 1. Remove from workbee_companies & workbee_company_registrations
    cs = cs.filter(function (c) {
        return String(c.id || c.name) !== String(id) && String(c.name || '') !== String(cName);
    });
    localStorage.setItem('workbee_companies', JSON.stringify(cs));

    var legCs = JSON.parse(localStorage.getItem('workbee_company_registrations') || '[]');
    legCs = legCs.filter(function (c) {
        return String(c.id || c.name) !== String(id) && String(c.name || '') !== String(cName);
    });
    localStorage.setItem('workbee_company_registrations', JSON.stringify(legCs));

    // 2. Remove from workbee_users
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    users = users.filter(function (u) {
        if (u.role !== 'company') return true;
        var p = u.profileData || {};
        if (String(u.id) === String(id) || (p.id && String(p.id) === String(id))) return false;
        if (cUsername && (u.username === cUsername || p.username === cUsername)) return false;
        if (cName && ((p.companyName && p.companyName.toLowerCase() === cName.toLowerCase()) || (p.name && p.name.toLowerCase() === cName.toLowerCase()) || (u.username && u.username.toLowerCase() === cName.toLowerCase()))) return false;
        if (cBrn && (p.brn && p.brn.toLowerCase() === cBrn || p.regNumber && p.regNumber.toLowerCase() === cBrn)) return false;
        return true;
    });
    localStorage.setItem('workbee_users', JSON.stringify(users));

    // 3. Delete from Firebase Cloud DB immediately
    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.deleteCompany(id, cName, cUsername);
    }

    var sc = document.getElementById('search-companies');
    renderCompanies(sc ? sc.value.trim().toLowerCase() : '');
    updateStats();
    showToast('Company deleted from system & cloud.', 'info');
};
window._deleteCompany = window._DC;

window._deleteAllCompanies = function () {
    var cs = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    var compUsersCount = users.filter(function (u) { return u.role === 'company'; }).length;
    var totalCount = Math.max(cs.length, compUsersCount);

    if (!totalCount) {
        alert('Company list is already empty.');
        return;
    }
    if (!confirm('Are you sure you want to delete ALL ' + totalCount + ' registered companies? This will permanently delete them from system & cloud.')) return;

    localStorage.setItem('workbee_companies', JSON.stringify([]));
    localStorage.setItem('workbee_company_registrations', JSON.stringify([]));
    users = users.filter(function (u) { return u.role !== 'company'; });
    localStorage.setItem('workbee_users', JSON.stringify(users));
    localStorage.setItem('workbee_seeded_initial', 'true');

    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.deleteAllCompanies();
    }

    var sc = document.getElementById('search-companies');
    renderCompanies(sc ? sc.value.trim().toLowerCase() : '');
    updateStats();
    showToast('All companies deleted successfully from system & cloud.', 'info');
};
window.deleteAllCompanies = window._deleteAllCompanies;

// ----------------- REQUIREMENTS TAB -----------------

function renderRequirements() {
    var tbody = document.getElementById('requirements-tbody');
    if (!tbody) return;
    var reqs = getRequirementsData();
    tbody.innerHTML = '';
    if (!reqs.length) { tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px;color:#64748b;">No job requirements yet.</td></tr>'; return; }
    for (var i = 0; i < reqs.length; i++) {
        var r = reqs[i]; var tr = document.createElement('tr');
        var iF = r.status === 'FILLED'; var iD = r.dispatched === true;
        var ac = (r.applicants && r.applicants.length) ? r.applicants.length : 0;
        var rid = String(r.id);
        var sk = Array.isArray(r.skills) ? r.skills.join(', ') : (r.skills || r.industry || 'General');
        var sh = Array.isArray(r.shifts) ? r.shifts.join('/') : (r.shifts || 'Day');
        var sb = iD ? '<span style="background:#dbeafe;color:#1e40af;padding:3px 10px;border-radius:20px;font-weight:bold;">DISPATCHED</span>' : (iF ? '<span style="background:#fee2e2;color:#dc2626;padding:3px 10px;border-radius:20px;font-weight:bold;">FILLED</span>' : '<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:20px;font-weight:bold;">OPEN</span>');
        tr.innerHTML = '<td><strong style="color:#F59E0B;">#' + rid + '</strong></td>' +
            '<td><strong>' + (r.company || 'Client') + '</strong><br><small style="color:#64748b;">Ph: ' + (r.phone || 'N/A') + '</small></td>' +
            '<td>' + sk + '</td>' +
            '<td>' + (r.workersReq || 1) + '</td>' +
            '<td>' + (r.district || 'N/A') + '</td>' +
            '<td>' + sh + '</td>' +
            '<td>' + (r.fromDate || 'N/A') + ' - ' + (r.toDate || 'N/A') + '<br><small style="color:#059669;">LKR ' + Number(r.totalPay || 0).toLocaleString() + '</small></td>' +
            '<td><button onclick="event.stopPropagation();window._viewRequirement(\'' + rid + '\')" style="background:#e0f2fe;color:#0369a1;border:1px solid #7dd3fc;padding:4px 8px;border-radius:6px;font-size:0.75rem;cursor:pointer;">View (' + ac + '/' + (r.workersReq || 1) + ')</button></td>' +
            '<td>' + sb + '</td>' +
            '<td style="white-space:nowrap;">' +
            '<button onclick="event.stopPropagation();window._viewRequirement(\'' + rid + '\')" style="background:#0284c7;color:white;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;">👁️ Details</button>' +
            '<button onclick="event.stopPropagation();window._editRequirement(\'' + rid + '\')" style="background:#f59e0b;color:#0f172a;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;">✏️ Edit</button>' +
            '<button onclick="event.stopPropagation();window._deleteRequirement(\'' + rid + '\')" style="background:#ef4444;color:white;border:none;padding:5px 9px;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-right:4px;">🗑️ Delete</button>' +
            '<button onclick="event.stopPropagation();window._ODM(\'' + rid + '\')" style="background:#10B981;color:white;padding:5px 9px;border-radius:6px;border:none;cursor:pointer;font-size:0.78rem;font-weight:bold;">🚀 Dispatch</button>' +
            '</td>';
        tbody.appendChild(tr);
    }
}

// ----------------- REQUIREMENT MODALS -----------------

window._viewRequirement = function (rid) {
    var old = document.getElementById('wb-rmodal');
    if (old) old.parentNode.removeChild(old);

    var reqs = getRequirementsData();
    var r = null;
    for (var i = 0; i < reqs.length; i++) {
        if (String(reqs[i].id) === String(rid)) { r = reqs[i]; break; }
    }
    if (!r) { alert('Job #' + rid + ' not found!'); return; }

    var sk = Array.isArray(r.skills) ? r.skills.join(', ') : (r.skills || r.industry || 'General');
    var sh = Array.isArray(r.shifts) ? r.shifts.join('/') : (r.shifts || 'Day');
    var meals = r.meals ? (Array.isArray(r.meals) ? r.meals.join(', ') : r.meals) : 'N/A';
    var ac = (r.applicants && r.applicants.length) ? r.applicants.length : 0;

    var ov = document.createElement('div');
    ov.id = 'wb-rmodal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:680px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    bx.innerHTML = '<button onclick="window._closeRequirementModal()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:16px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;">' +
        '<span style="font-family:monospace;color:#F59E0B;font-weight:bold;">JOB REF: #' + r.id + '</span>' +
        '<h2 style="color:#0f172a;margin:4px 0 2px;">📋 ' + (r.company || 'Client Requirement') + '</h2>' +
        '<span style="background:' + (r.status === 'FILLED' ? '#fee2e2;color:#dc2626' : '#dcfce7;color:#166534') + ';padding:2px 10px;border-radius:12px;font-size:0.8rem;font-weight:bold;">Status: ' + (r.status || 'OPEN') + '</span>' +
        '</div>' +
        '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px;color:#1e3a8a;font-size:0.875rem;margin-bottom:14px;">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
        '<div>🏢 <strong>Company:</strong> ' + (r.company || 'Client') + '</div>' +
        '<div>📞 <strong>Phone:</strong> ' + (r.phone || 'N/A') + '</div>' +
        '<div>🛠️ <strong>Skills Needed:</strong> ' + sk + '</div>' +
        '<div>👷 <strong>Workers Required:</strong> ' + (r.workersReq || 1) + ' worker(s)</div>' +
        '<div>📍 <strong>Location:</strong> ' + (r.district || 'N/A') + (r.town ? ' (' + r.town + ')' : '') + '</div>' +
        '<div>🕒 <strong>Shift:</strong> ' + sh + '</div>' +
        '<div>📅 <strong>Dates:</strong> ' + (r.fromDate || 'N/A') + ' to ' + (r.toDate || 'N/A') + '</div>' +
        '<div>⏳ <strong>Duration:</strong> ' + (r.totalDays || 1) + ' days</div>' +
        '<div>⚡ <strong>Urgency:</strong> <span style="font-weight:bold;color:' + (r.urgency === 'Very Urgent' ? '#dc2626' : (r.urgency === 'Urgent' ? '#d97706' : '#166534')) + ';">' + (r.urgency || 'Normal') + '</span></div>' +
        '<div>💵 <strong>Daily Rate:</strong> LKR ' + Number(r.payRate || 0).toLocaleString() + '</div>' +
        '<div>💰 <strong>Total Payout:</strong> LKR ' + Number(r.totalPay || 0).toLocaleString() + '</div>' +
        '<div style="grid-column:1/-1;">🍱 <strong>Meals Provided:</strong> ' + meals + '</div>' +
        (r.desc ? '<div style="grid-column:1/-1;">📝 <strong>Description / Notes:</strong> ' + r.desc + '</div>' : '') +
        '</div></div>' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;font-size:0.85rem;color:#334155;margin-bottom:16px;">' +
        '<strong>👥 Current Applicants / Assigned:</strong> ' + ac + ' worker(s)' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end;gap:10px;">' +
        '<button onclick="window._closeRequirementModal(); window._ODM(\'' + r.id + '\')" style="padding:10px 18px;background:#10B981;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">🚀 Dispatch Workers</button>' +
        '<button onclick="window._closeRequirementModal(); window._editRequirement(\'' + r.id + '\')" style="padding:10px 18px;background:#F59E0B;color:#0f172a;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">✏️ Edit Requirement</button>' +
        '<button onclick="window._closeRequirementModal()" style="padding:10px 20px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Close</button>' +
        '</div>';

    ov.appendChild(bx);
    document.body.appendChild(ov);
};
window._VRD = window._viewRequirement;
window._viewRequirementDetails = window._viewRequirement;

window._closeRequirementModal = function () {
    var m = document.getElementById('wb-rmodal');
    if (m) m.parentNode.removeChild(m);
};

// Edit Requirement Modal
window._editRequirement = function (rid) {
    var old = document.getElementById('wb-redit-modal');
    if (old) old.parentNode.removeChild(old);

    var reqs = getRequirementsData();
    var r = null;
    for (var i = 0; i < reqs.length; i++) {
        if (String(reqs[i].id) === String(rid)) { r = reqs[i]; break; }
    }
    if (!r) { alert('Job #' + rid + ' not found!'); return; }

    var sk = Array.isArray(r.skills) ? r.skills.join(', ') : (r.skills || r.industry || '');
    var sh = Array.isArray(r.shifts) ? r.shifts.join(', ') : (r.shifts || 'Day');
    var meals = r.meals ? (Array.isArray(r.meals) ? r.meals.join(', ') : r.meals) : '';

    var ov = document.createElement('div');
    ov.id = 'wb-redit-modal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:680px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    bx.innerHTML = '<button onclick="window._closeEditRequirementModal()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:18px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;">' +
        '<span style="font-family:monospace;color:#F59E0B;font-weight:bold;">EDIT JOB REQUIREMENT #' + r.id + '</span>' +
        '<h2 style="color:#0f172a;margin:4px 0 0;">📋 Edit Job Requirement</h2>' +
        '</div>' +
        '<form id="wb-edit-requirement-form" onsubmit="window._saveRequirement(event, \'' + r.id + '\')">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Company Name</label><input type="text" id="er-comp" value="' + (r.company || '').replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Phone</label><input type="text" id="er-phone" value="' + (r.phone || '').replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Required Skills</label><input type="text" id="er-skills" value="' + sk.replace(/"/g, '&quot;') + '" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Workers Required</label><input type="number" id="er-num" value="' + (r.workersReq || 1) + '" min="1" required style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">District / City</label><input type="text" id="er-dist" value="' + (r.district || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Town / Area</label><input type="text" id="er-town" value="' + (r.town || '').replace(/"/g, '&quot;') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Shifts</label><input type="text" id="er-shifts" value="' + sh.replace(/"/g, '&quot;') + '" placeholder="Day / Night" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Status</label><select id="er-status" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"><option value="OPEN"' + (r.status === 'OPEN' ? ' selected' : '') + '>OPEN</option><option value="FILLED"' + (r.status === 'FILLED' ? ' selected' : '') + '>FILLED</option><option value="CANCELLED"' + (r.status === 'CANCELLED' ? ' selected' : '') + '>CANCELLED</option></select></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">From Date</label><input type="date" id="er-fd" value="' + (r.fromDate || '') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">To Date</label><input type="date" id="er-td" value="' + (r.toDate || '') + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Daily Pay Rate (LKR)</label><input type="number" id="er-rate" value="' + (r.payRate || 0) + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Total Pay (LKR)</label><input type="number" id="er-tot" value="' + (r.totalPay || 0) + '" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Meals Provided (comma separated)</label><input type="text" id="er-meals" value="' + meals.replace(/"/g, '&quot;') + '" placeholder="Breakfast, Lunch" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;"></div>' +
        '<div style="grid-column:1/-1;"><label style="font-size:0.8rem;font-weight:600;color:#475569;display:block;margin-bottom:4px;">Notes / Description</label><textarea id="er-desc" rows="2" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;">' + (r.desc || '').replace(/</g, '&lt;') + '</textarea></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;border-top:1px solid #e2e8f0;padding-top:14px;">' +
        '<button type="button" onclick="window._closeEditRequirementModal()" style="padding:10px 18px;background:#94a3b8;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Cancel</button>' +
        '<button type="submit" style="padding:10px 24px;background:#10B981;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">💾 Save Changes</button>' +
        '</div>' +
        '</form>';

    ov.appendChild(bx);
    document.body.appendChild(ov);
};
window._ERD = window._editRequirement;

window._closeEditRequirementModal = function () {
    var m = document.getElementById('wb-redit-modal');
    if (m) m.parentNode.removeChild(m);
};

window._saveRequirement = function (e, rid) {
    if (e) e.preventDefault();
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var found = false;
    for (var i = 0; i < reqs.length; i++) {
        if (String(reqs[i].id) === String(rid)) {
            var comp = document.getElementById('er-comp').value.trim();
            var phone = document.getElementById('er-phone').value.trim();
            var skRaw = document.getElementById('er-skills').value.trim();
            var num = parseInt(document.getElementById('er-num').value, 10) || 1;
            var dist = document.getElementById('er-dist').value.trim();
            var town = document.getElementById('er-town').value.trim();
            var shRaw = document.getElementById('er-shifts').value.trim();
            var st = document.getElementById('er-status').value;
            var fd = document.getElementById('er-fd').value;
            var td = document.getElementById('er-td').value;
            var rate = parseFloat(document.getElementById('er-rate').value) || 0;
            var tot = parseFloat(document.getElementById('er-tot').value) || 0;
            var mealsRaw = document.getElementById('er-meals').value.trim();
            var desc = document.getElementById('er-desc').value.trim();

            reqs[i].company = comp;
            reqs[i].phone = phone;
            reqs[i].skills = skRaw ? skRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : ['General'];
            reqs[i].workersReq = num;
            reqs[i].district = dist;
            reqs[i].town = town;
            reqs[i].shifts = shRaw ? shRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : ['Day'];
            reqs[i].status = st;
            reqs[i].fromDate = fd;
            reqs[i].toDate = td;
            reqs[i].payRate = rate;
            reqs[i].totalPay = tot;
            reqs[i].meals = mealsRaw ? mealsRaw.split(',').map(function (m) { return m.trim(); }).filter(Boolean) : [];
            reqs[i].desc = desc;

            found = true;
            break;
        }
    }

    if (found) {
        localStorage.setItem('workbee_requirements', JSON.stringify(reqs));
        window._closeEditRequirementModal();
        renderRequirements();
        updateStats();
        showToast('Requirement #' + rid + ' updated successfully!', 'success');
    }
};

window._TJS = function (rid) {
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    for (var i = 0; i < reqs.length; i++) { if (String(reqs[i].id) === String(rid)) { reqs[i].status = reqs[i].status === 'FILLED' ? 'OPEN' : 'FILLED'; break; } }
    localStorage.setItem('workbee_requirements', JSON.stringify(reqs));
    renderRequirements(); showToast('Job status updated.', 'success');
};
window.toggleJobStatus = window._TJS;

window._DR = function (rid) {
    if (!confirm('Delete requirement #' + rid + '?')) return;
    // 1. Remove from workbee_requirements
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    reqs = reqs.filter(function (r) { return String(r.id) !== String(rid); });
    localStorage.setItem('workbee_requirements', JSON.stringify(reqs));

    // 2. Remove from workbee_job_postings
    var postings = JSON.parse(localStorage.getItem('workbee_job_postings') || '[]');
    postings = postings.filter(function (p) { return String(p.id) !== String(rid); });
    localStorage.setItem('workbee_job_postings', JSON.stringify(postings));

    // 3. Delete from Firebase Cloud DB immediately
    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.deleteRequirement(rid);
    }

    renderRequirements();
    updateStats();
    showToast('Requirement #' + rid + ' deleted from system & cloud.', 'info');
};
window.deleteRequirement = window._DR;

window._deleteAllRequirements = function () {
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var postings = JSON.parse(localStorage.getItem('workbee_job_postings') || '[]');
    var totalCount = Math.max(reqs.length, postings.length);

    if (!totalCount) {
        alert('Job requirements list is already empty.');
        return;
    }
    if (!confirm('Are you sure you want to delete ALL ' + totalCount + ' job requirements? This will permanently delete them from system & cloud.')) return;

    localStorage.setItem('workbee_requirements', JSON.stringify([]));
    localStorage.setItem('workbee_job_postings', JSON.stringify([]));
    localStorage.setItem('workbee_seeded_initial', 'true');

    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.deleteAllRequirements();
    }

    renderRequirements();
    updateStats();
    showToast('All job requirements deleted successfully from system & cloud.', 'info');
};
window.deleteAllRequirements = window._deleteAllRequirements;

window._ODM = function (reqId) {
    var old = document.getElementById('wb-dm');
    if (old) old.parentNode.removeChild(old);

    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var req = null;
    for (var i = 0; i < reqs.length; i++) { if (String(reqs[i].id) === String(reqId)) { req = reqs[i]; break; } }
    if (!req) { alert('Job #' + reqId + ' not found!'); return; }

    var rsk = [];
    if (Array.isArray(req.skills) && req.skills.length) rsk = req.skills;
    else if (typeof req.skills === 'string' && req.skills) rsk = [req.skills];
    else rsk = [req.industry || 'General'];

    var allW = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var mW = [], nmW = [];
    for (var i = 0; i < allW.length; i++) {
        var w = allW[i];
        var wsk = [];
        if (Array.isArray(w.skills) && w.skills.length) wsk = w.skills;
        else if (typeof w.skills === 'string' && w.skills) wsk = [w.skills];
        else wsk = [w.category || ''];
        var m = false;
        for (var j = 0; j < rsk.length && !m; j++) {
            var rs = String(rsk[j]).toLowerCase();
            for (var k = 0; k < wsk.length && !m; k++) {
                var ws = String(wsk[k]).toLowerCase();
                if (rs.indexOf(ws) !== -1 || ws.indexOf(rs) !== -1) m = true;
            }
        }
        if (m) mW.push(w); else nmW.push(w);
    }

    var ad = req.applicantsDetails || [];
    var aids = ad.map(function (x) { return String(x.id); });
    var ps = req.applicants ? req.applicants.map(String) : aids;
    var disp = [];
    for (var i = 0; i < ad.length; i++) {
        var a = ad[i];
        disp.push({ id: String(a.id), name: a.name || String(a.id), phone: a.phone || 'N/A', nic: a.nic || 'N/A', sk: Array.isArray(a.skills) ? a.skills.join(', ') : (a.skills || 'N/A'), tag: 'Applied Online', bg: '#dcfce7', col: '#166534', chk: true });
    }
    for (var i = 0; i < mW.length; i++) {
        var w = mW[i]; var mid = String(w.id);
        if (aids.indexOf(mid) !== -1) continue;
        disp.push({ id: mid, name: ((w.firstName || '') + ' ' + (w.lastName || w.name || '')).trim(), phone: w.phone || w.whatsapp || 'N/A', nic: w.nic || 'N/A', sk: Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || w.category || 'N/A'), tag: 'Skill Match', bg: '#e0f2fe', col: '#0369a1', chk: ps.indexOf(mid) !== -1 });
    }
    var mids = mW.map(function (x) { return String(x.id); });
    for (var i = 0; i < nmW.length; i++) {
        var w = nmW[i]; var nid = String(w.id);
        if (aids.indexOf(nid) !== -1 || mids.indexOf(nid) !== -1) continue;
        disp.push({ id: nid, name: ((w.firstName || '') + ' ' + (w.lastName || w.name || '')).trim(), phone: w.phone || w.whatsapp || 'N/A', nic: w.nic || 'N/A', sk: Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || w.category || 'N/A'), tag: 'Other', bg: '#f1f5f9', col: '#64748b', chk: false });
    }

    // Store disp globally for skill filter
    window._dmDisp = disp;

    // Collect unique skills for filter dropdown
    var skillSet = {};
    for (var i = 0; i < disp.length; i++) {
        var skArr2 = disp[i].sk ? disp[i].sk.split(',') : [];
        for (var j = 0; j < skArr2.length; j++) {
            var skTrim = skArr2[j].trim();
            if (skTrim && skTrim !== 'N/A') skillSet[skTrim] = true;
        }
    }
    var skillOptions = '<option value="all">All Skills</option>';
    var sortedSkills = Object.keys(skillSet).sort();
    for (var i = 0; i < sortedSkills.length; i++) {
        skillOptions += '<option value="' + sortedSkills[i].replace(/"/g, '') + '">' + sortedSkills[i] + '</option>';
    }

    var ch = window._buildDMWorkerList(disp);

    var cs = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var mc = null; var rpc = String(req.phone || '').replace(/[^0-9]/g, '');
    for (var i = 0; i < cs.length && !mc; i++) {
        var c = cs[i];
        if (c.name && req.company && c.name.toLowerCase() === req.company.toLowerCase()) { mc = c; break; }
        if (c.phone && rpc) { var cp = String(c.phone).replace(/[^0-9]/g, ''); if (cp === rpc || (cp.length > 5 && cp.indexOf(rpc) !== -1)) mc = c; }
    }
    var cn = req.company || (mc ? mc.name : 'Client');
    var cph = req.phone || (mc ? mc.phone : 'N/A');
    var cco = mc ? mc.contact : 'N/A';
    var cb = mc ? mc.brn : 'N/A';
    var ccy = req.district || (mc ? mc.city : 'N/A');

    var ov = document.createElement('div');
    ov.id = 'wb-dm';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:740px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';
    bx.innerHTML = '<button onclick="window._CDM()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:16px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;"><span style="font-family:monospace;color:#F59E0B;font-weight:bold;">REF: #' + req.id + '</span><h2 style="color:#0f172a;margin:4px 0 2px;">Dispatch Workers Dashboard</h2><p style="color:#64748b;font-size:0.875rem;margin:0;">Select workers below and click Confirm Dispatch.</p></div>' +
        '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:12px;margin-bottom:14px;color:#1e3a8a;font-size:0.875rem;"><strong>Employer:</strong> ' + cn + ' | <strong>Ph:</strong> ' + cph + ' | <strong>BRN:</strong> ' + cb + ' | <strong>Contact:</strong> ' + cco + ' | <strong>City:</strong> ' + ccy + '</div>' +
        '<div style="background:#fffbe6;border:1px solid #fde68a;border-radius:12px;padding:10px;margin-bottom:14px;font-size:0.875rem;color:#78350f;"><strong>Skills:</strong> ' + rsk.join(', ') + ' | <strong>Needed:</strong> ' + (req.workersReq || 1) + ' | <strong>Pay:</strong> LKR ' + Number(req.payRate || 0).toLocaleString() + '/day</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><h3 style="margin:0;color:#0f172a;">Select Workers</h3><span id="wb-sc" style="background:#10b981;color:white;padding:3px 10px;border-radius:20px;font-size:0.8rem;font-weight:bold;">0 Selected</span></div>' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;">' +
        '<label style="font-size:0.82rem;font-weight:600;color:#475569;white-space:nowrap;">Filter by Skill:</label>' +
        '<select id="dm-skill-filter" onchange="window._FDMF()" style="flex:1;padding:7px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:0.85rem;color:#0f172a;background:#fff;cursor:pointer;outline:none;">' + skillOptions + '</select>' +
        '<span id="dm-filter-count" style="font-size:0.78rem;color:#64748b;white-space:nowrap;"></span>' +
        '<button id="dm-sel-all-btn" onclick="window._SAF()" style="padding:7px 14px;background:#0f172a;color:white;border:none;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background 0.2s;" onmouseover="this.style.background=&quot;#1e293b&quot;" onmouseout="this.style.background=&quot;#0f172a&quot;">Select All</button>' +
        '</div>' +
        '<div id="dm-worker-list" style="max-height:310px;overflow-y:auto;padding-right:4px;margin-bottom:16px;">' + ch + '</div>' +
        '<div style="display:flex;gap:10px;"><button onclick="window._CFD(\'' + reqId + '\')" style="flex:2;padding:14px;background:#10B981;color:white;border:none;border-radius:10px;font-weight:bold;cursor:pointer;font-size:1rem;">Confirm Dispatch</button><button onclick="window._CDM()" style="flex:1;padding:14px;background:#0f172a;color:white;border:none;border-radius:10px;font-weight:bold;cursor:pointer;font-size:1rem;">Cancel</button></div>';
    ov.appendChild(bx);
    document.body.appendChild(ov);
    window._USC();
};
window._openDispatchModal = window._ODM;
window.dispatchJobMatch = window._ODM;
window.viewAcceptedWorkersModal = window._ODM;

window._CDM = function () { var m = document.getElementById('wb-dm'); if (m) m.parentNode.removeChild(m); };
window._closeDispatchModal = window._CDM;

// Build workers list HTML from a disp array
window._buildDMWorkerList = function (arr) {
    if (!arr || !arr.length) return '<div style="text-align:center;color:#64748b;padding:20px;">No workers found for this filter.</div>';
    var html = '';
    for (var i = 0; i < arr.length; i++) {
        var d = arr[i];
        var ck = d.chk ? 'checked' : '';
        var cbg = d.chk ? '#f0fdf4' : '#fff';
        var cbr = d.chk ? '#10b981' : '#cbd5e1';
        var sid = d.id.replace(/[^a-zA-Z0-9\-]/g, '_');
        var sn = d.name.replace(/"/g, '');
        var ssk = d.sk.replace(/"/g, '');
        html += '<div id="wc-' + sid + '" style="background:' + cbg + ';border:2px solid ' + cbr + ';border-radius:12px;padding:14px;margin-bottom:10px;"><label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;"><input type="checkbox" class="wb-cb" value="' + d.id + '" data-n="' + sn + '" data-p="' + d.phone + '" data-ni="' + d.nic + '" data-s="' + ssk + '" ' + ck + ' style="width:20px;height:20px;margin-top:3px;accent-color:#10b981;flex-shrink:0;" onchange="window._CC(\'' + sid + '\')"><div style="flex:1;"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px;margin-bottom:4px;"><strong style="color:#0f172a;">' + d.name + ' <span style="color:#64748b;font-size:0.82rem;">(#' + d.id + ')</span></strong><span style="background:' + d.bg + ';color:' + d.col + ';padding:2px 8px;border-radius:10px;font-size:0.75rem;font-weight:bold;">' + d.tag + '</span></div><div style="font-size:0.82rem;color:#334155;">Ph: ' + d.phone + ' | NIC: ' + d.nic + '<br>Skills: <span style="color:#059669;font-weight:bold;">' + d.sk + '</span></div></div></label></div>';
    }
    return html;
};

// Filter dispatch modal workers list by skill
window._FDMF = function () {
    var sel = (document.getElementById('dm-skill-filter') || {}).value || 'all';
    var all = window._dmDisp || [];
    var filtered = sel === 'all' ? all : all.filter(function (d) {
        var skArr = d.sk ? d.sk.split(',') : [];
        for (var i = 0; i < skArr.length; i++) {
            if (skArr[i].trim().toLowerCase() === sel.toLowerCase()) return true;
        }
        return false;
    });
    var listEl = document.getElementById('dm-worker-list');
    var countEl = document.getElementById('dm-filter-count');
    var saBtn = document.getElementById('dm-sel-all-btn');
    if (listEl) listEl.innerHTML = window._buildDMWorkerList(filtered);
    if (countEl) countEl.textContent = filtered.length + ' worker' + (filtered.length !== 1 ? 's' : '');
    if (saBtn) { saBtn.textContent = 'Select All'; saBtn.setAttribute('data-state', '0'); }
    window._USC();
};

// Select All / Deselect All filtered workers
window._SAF = function () {
    var btn = document.getElementById('dm-sel-all-btn');
    var state = btn ? btn.getAttribute('data-state') : '0';
    var doSelect = state !== '1';
    var cbs = document.querySelectorAll('#dm-worker-list .wb-cb');
    for (var i = 0; i < cbs.length; i++) {
        var cb = cbs[i];
        if (cb.checked !== doSelect) {
            cb.checked = doSelect;
            var sid = cb.closest('[id^="wc-"]') ? cb.closest('[id^="wc-"]').id.replace('wc-', '') : null;
            if (sid) window._CC(sid);
        }
    }
    if (btn) {
        btn.setAttribute('data-state', doSelect ? '1' : '0');
        btn.textContent = doSelect ? 'Deselect All' : 'Select All';
        btn.style.background = doSelect ? '#10b981' : '#0f172a';
    }
    window._USC();
};

window._CC = function (sid) {
    var cb = document.querySelector('#wc-' + sid + ' .wb-cb');
    var card = document.getElementById('wc-' + sid);
    if (card && cb) { card.style.background = cb.checked ? '#f0fdf4' : '#fff'; card.style.border = '2px solid ' + (cb.checked ? '#10b981' : '#cbd5e1'); }
    window._USC();
};

window._USC = function () {
    var n = document.querySelectorAll('.wb-cb:checked').length;
    var b = document.getElementById('wb-sc');
    if (b) b.textContent = n + ' Selected';
};
window._updateSelCount = window._USC;

window._CFD = function (reqId) {
    var cbs = document.querySelectorAll('.wb-cb:checked');
    if (!cbs.length) { alert('Please select at least 1 worker!'); return; }
    var sel = [];
    for (var i = 0; i < cbs.length; i++) {
        var cb = cbs[i];
        sel.push({ id: cb.value, name: cb.getAttribute('data-n') || cb.value, phone: cb.getAttribute('data-p') || 'N/A', nic: cb.getAttribute('data-ni') || 'N/A', skills: [cb.getAttribute('data-s') || 'General'] });
    }
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var req = null;
    for (var i = 0; i < reqs.length; i++) {
        if (String(reqs[i].id) === String(reqId)) {
            reqs[i].dispatched = true; reqs[i].dispatchedAt = new Date().toLocaleString();
            reqs[i].applicantsDetails = sel; reqs[i].applicants = sel.map(function (w) { return w.id; });
            reqs[i].status = 'FILLED'; req = reqs[i]; break;
        }
    }
    localStorage.setItem('workbee_requirements', JSON.stringify(reqs));
    renderRequirements();
    var cp = req ? String(req.phone || '').replace(/[^0-9]/g, '') : '';
    var cn = req ? (req.company || 'Client') : 'Client';
    var di = req ? (req.district || 'N/A') : 'N/A';
    var pr = req ? Number(req.payRate || 0).toLocaleString() : '0';
    var ml = req && req.meals ? (Array.isArray(req.meals) ? req.meals.join(', ') : req.meals) : 'N/A';
    var wl = '';
    for (var i = 0; i < sel.length; i++) { wl += (i + 1) + '. ' + sel[i].name + ' | Ph: ' + sel[i].phone + ' | NIC: ' + sel[i].nic + '\n'; }
    var msg = 'WorkBee.lk Dispatch\n\nEmployer: ' + cn + '\nJob: #' + reqId + '\nLocation: ' + di + '\n\nWorkers (' + sel.length + '):\n' + wl + '\nPay: LKR ' + pr + '\nMeals: ' + ml + '\n\nRef: DISPATCH-' + reqId;
    var wp = cp ? '94' + cp.replace(/^0/, '') : '';
    var wu = wp ? ('https://wa.me/' + wp + '?text=' + encodeURIComponent(msg)) : ('https://wa.me/?text=' + encodeURIComponent(msg));
    var m = document.getElementById('wb-dm');
    if (!m) return;
    var b = m.querySelector('div');
    if (!b) return;
    b.innerHTML = '<div style="text-align:center;padding:10px 0;"><div style="width:72px;height:72px;background:#10B981;border-radius:50%;color:white;font-size:2.5rem;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">OK</div><h2 style="color:#0f172a;margin-bottom:8px;">Dispatch Confirmed!</h2><p style="color:#64748b;margin-bottom:20px;">Job <strong>#' + reqId + '</strong> dispatched. <strong>' + sel.length + '</strong> worker(s) assigned.</p><div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:12px;padding:14px;text-align:left;color:#1e3a8a;margin-bottom:16px;"><strong>Employer:</strong> ' + cn + '<br><strong>Phone:</strong> ' + (req ? req.phone : 'N/A') + '<br><strong>Workers:</strong> ' + sel.length + '</div><div style="display:flex;flex-direction:column;gap:10px;"><a href="' + wu + '" target="_blank" style="display:block;text-align:center;text-decoration:none;padding:14px;background:#25D366;color:white;border-radius:10px;font-weight:bold;">Send WhatsApp to Employer</a><button onclick="window._CDM()" style="padding:12px;background:#0f172a;color:white;border:none;border-radius:10px;font-weight:bold;cursor:pointer;">Close</button></div></div>';
    showToast('Job #' + reqId + ' dispatched!', 'success');
};
window.executeManualDispatch = window._CFD;

function updateBroadcastPreview() {
    var cat = (document.getElementById('bc-category') || {}).value || 'all';
    var dis = (document.getElementById('bc-district') || {}).value || 'all';
    var sh = (document.getElementById('bc-shift') || {}).value || 'all';
    var ws = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var m = ws.filter(function (w) { return w.status === 'approved'; });
    if (cat !== 'all') m = m.filter(function (w) { return w.category === cat; });
    if (dis !== 'all') m = m.filter(function (w) { return Array.isArray(w.locations) ? w.locations.indexOf(dis) !== -1 : w.locations === dis; });
    if (sh !== 'all') m = m.filter(function (w) { return Array.isArray(w.shifts) ? w.shifts.indexOf(sh) !== -1 : w.shifts === sh; });
    var el = document.getElementById('bc-match-count');
    if (el) el.textContent = m.length;
}

function showToast(msg, type) {
    type = type || 'info';
    var t = document.createElement('div');
    t.textContent = msg;
    var bg = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    t.style.cssText = 'position:fixed;bottom:20px;right:20px;padding:12px 24px;border-radius:8px;color:#fff;z-index:9999999;background:' + bg + ';box-shadow:0 4px 12px rgba(0,0,0,0.2);font-size:0.9rem;font-weight:600;';
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300); }, 3500);
}

window.renderRequirements = renderRequirements;
window.renderWorkers = renderWorkers;
window.renderCompanies = renderCompanies;
window.showToast = showToast;

// ==========================================
// DATA BACKUP & EXCEL IMPORT / EXPORT SYSTEM
// ==========================================

function setupDataBackupHandlers() {
    // Workers Export / Import
    var expWBtn = document.getElementById('export-workers-btn');
    if (expWBtn) expWBtn.onclick = function () { exportWorkersToExcel(); };

    var impWBtn = document.getElementById('import-workers-btn');
    var wFileInput = document.getElementById('worker-file-input');
    if (impWBtn && wFileInput) {
        impWBtn.onclick = function () { wFileInput.value = ''; wFileInput.click(); };
        wFileInput.onchange = function () {
            if (this.files && this.files[0]) importWorkersFromExcel(this.files[0]);
        };
    }

    // Companies Export / Import
    var expCBtn = document.getElementById('export-companies-btn');
    if (expCBtn) expCBtn.onclick = function () { exportCompaniesToExcel(); };

    var impCBtn = document.getElementById('import-companies-btn');
    var cFileInput = document.getElementById('company-file-input');
    if (impCBtn && cFileInput) {
        impCBtn.onclick = function () { cFileInput.value = ''; cFileInput.click(); };
        cFileInput.onchange = function () {
            if (this.files && this.files[0]) importCompaniesFromExcel(this.files[0]);
        };
    }

    // Full System Backup Export (JSON)
    var expJsonBtn = document.getElementById('btn-export-full-json');
    if (expJsonBtn) expJsonBtn.onclick = function () { exportFullSystemBackup(); };

    // Master Excel Export (.xlsx)
    var expMasterBtn = document.getElementById('btn-export-master-excel');
    if (expMasterBtn) expMasterBtn.onclick = function () { exportMasterExcel(); };

    // Full System Restore (JSON)
    var restoreBtn = document.getElementById('btn-restore-backup');
    var backupFileInput = document.getElementById('backup-file-input');
    if (restoreBtn && backupFileInput) {
        restoreBtn.onclick = function () { backupFileInput.value = ''; backupFileInput.click(); };
        backupFileInput.onchange = function () {
            if (this.files && this.files[0]) importFullSystemBackup(this.files[0]);
        };
    }

    // Template downloads
    var dlWTpl = document.getElementById('btn-dl-worker-template');
    if (dlWTpl) dlWTpl.onclick = function () { downloadWorkerTemplate(); };

    var dlCTpl = document.getElementById('btn-dl-company-template');
    if (dlCTpl) dlCTpl.onclick = function () { downloadCompanyTemplate(); };
}

// 1. WORKERS EXCEL EXPORT
function exportWorkersToExcel() {
    var workers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    if (!workers.length) {
        showToast('No worker records available to export!', 'error');
        return;
    }

    var exportData = workers.map(function (w, idx) {
        var fn = ((w.firstName || '') + ' ' + (w.lastName || w.name || w.fullName || '')).trim();
        var skillsStr = Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || w.category || '');
        var locsStr = Array.isArray(w.locations) ? w.locations.join(', ') : (w.locations || w.district || '');
        var shiftsStr = Array.isArray(w.shifts) ? w.shifts.join(', ') : (w.shifts || 'Day');
        var regDate = w.date ? (w.date.indexOf('T') !== -1 ? w.date.split('T')[0] : w.date) : new Date().toISOString().split('T')[0];

        return {
            'Worker ID': String(w.id || ('WB-' + (9000 + idx))),
            'First Name': w.firstName || '',
            'Last Name': w.lastName || '',
            'Full Name': fn,
            'NIC Number': w.nic || '',
            'Primary Phone': w.phone || '',
            'WhatsApp Number': w.whatsapp || w.phone || '',
            'Age': w.age || '',
            'Category': w.category || '',
            'Experience (Years)': w.experience || 0,
            'Skills': skillsStr,
            'Districts / Locations': locsStr,
            'Shifts': shiftsStr,
            'Police Station': w.policeStation || '',
            'Current Address': w.currentAddress || '',
            'Permanent Address': w.permanentAddress || '',
            'Next of Kin Name': w.nextOfKinName || '',
            'Next of Kin Phone': w.nextOfKinPhone || '',
            'Next of Kin Relationship': w.nextOfKinRelationship || '',
            'Next of Kin Address': w.nextOfKinAddress || '',
            'Notice Period': w.noticeperiod || 'Immediate',
            'Status': w.status || 'approved',
            'Registered Date': regDate
        };
    });

    var dateStr = new Date().toISOString().split('T')[0];
    if (window.XLSX) {
        var ws = XLSX.utils.json_to_sheet(exportData);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Workers');
        XLSX.writeFile(wb, 'WorkBee_Workers_' + dateStr + '.xlsx');
        showToast('Workers exported to Excel successfully!', 'success');
    } else {
        downloadCSV(exportData, 'WorkBee_Workers_' + dateStr + '.csv');
        showToast('Workers exported to CSV successfully!', 'success');
    }
}

// 2. WORKERS EXCEL IMPORT
function importWorkersFromExcel(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];
            var json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

            if (!json || !json.length) {
                showToast('Selected file contains no data rows!', 'error');
                return;
            }

            var existingWorkers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
            var importedCount = 0;
            var updatedCount = 0;

            for (var i = 0; i < json.length; i++) {
                var row = json[i];

                var wid = getRowVal(row, ['Worker ID', 'WorkerID', 'ID', 'id', 'worker_id', 'Ref']);
                var firstName = getRowVal(row, ['First Name', 'FirstName', 'firstName', 'fname', 'first_name']);
                var lastName = getRowVal(row, ['Last Name', 'LastName', 'lastName', 'lname', 'last_name']);
                var fullName = getRowVal(row, ['Full Name', 'FullName', 'fullName', 'Name', 'name']);
                if (!firstName && fullName) {
                    var parts = fullName.trim().split(' ');
                    firstName = parts[0] || '';
                    lastName = parts.slice(1).join(' ') || '';
                }
                var nic = getRowVal(row, ['NIC Number', 'NIC', 'nic', 'Nic', 'ID Number']);
                var phone = String(getRowVal(row, ['Primary Phone', 'Phone', 'phone', 'Mobile', 'mobile', 'Contact'])).trim();
                var whatsapp = String(getRowVal(row, ['WhatsApp Number', 'WhatsApp', 'whatsapp', 'wa_phone'])).trim() || phone;
                var age = parseInt(getRowVal(row, ['Age', 'age'])) || 25;
                var category = getRowVal(row, ['Category', 'category', 'Industry', 'industry']) || 'General';
                var experience = parseInt(getRowVal(row, ['Experience (Years)', 'Experience', 'experience', 'exp'])) || 0;
                
                var rawSkills = getRowVal(row, ['Skills', 'skills', 'Skill', 'skill']);
                var skills = Array.isArray(rawSkills) ? rawSkills : (rawSkills ? String(rawSkills).split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean) : [category]);
                
                var rawLocs = getRowVal(row, ['Districts / Locations', 'Districts', 'Locations', 'district', 'districts', 'locations', 'location']);
                var locations = Array.isArray(rawLocs) ? rawLocs : (rawLocs ? String(rawLocs).split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean) : ['Colombo']);
                
                var rawShifts = getRowVal(row, ['Shifts', 'Shift', 'shifts', 'shift']);
                var shifts = Array.isArray(rawShifts) ? rawShifts : (rawShifts ? String(rawShifts).split(/[,;/]/).map(function (s) { return s.trim(); }).filter(Boolean) : ['Day']);

                var policeStation = getRowVal(row, ['Police Station', 'policeStation', 'police_station', 'Police']);
                var currentAddress = getRowVal(row, ['Current Address', 'currentAddress', 'Address', 'address']);
                var permanentAddress = getRowVal(row, ['Permanent Address', 'permanentAddress']) || currentAddress;
                var nextOfKinName = getRowVal(row, ['Next of Kin Name', 'nextOfKinName', 'Kin Name', 'kinName']);
                var nextOfKinPhone = getRowVal(row, ['Next of Kin Phone', 'nextOfKinPhone', 'Kin Phone', 'kinPhone']);
                var nextOfKinRelationship = getRowVal(row, ['Next of Kin Relationship', 'nextOfKinRelationship', 'Kin Relationship', 'Relationship']);
                var nextOfKinAddress = getRowVal(row, ['Next of Kin Address', 'nextOfKinAddress', 'Kin Address']);
                var noticeperiod = getRowVal(row, ['Notice Period', 'noticeperiod', 'Notice']) || 'Immediate';
                var status = String(getRowVal(row, ['Status', 'status']) || 'approved').toLowerCase();
                var regDate = getRowVal(row, ['Registered Date', 'Date', 'date', 'registeredDate']) || new Date().toISOString();

                if (!firstName && !lastName && !fullName && !phone && !nic) continue; // Skip blank rows

                if (!wid) {
                    wid = 'WB-' + (9000 + existingWorkers.length + i + 1);
                }

                // Match duplicate worker by ID or NIC or Phone
                var matchIdx = -1;
                for (var k = 0; k < existingWorkers.length; k++) {
                    if (String(existingWorkers[k].id).toLowerCase() === String(wid).toLowerCase()) { matchIdx = k; break; }
                    if (nic && existingWorkers[k].nic && String(existingWorkers[k].nic).toLowerCase() === String(nic).toLowerCase()) { matchIdx = k; break; }
                    if (phone && existingWorkers[k].phone && String(existingWorkers[k].phone) === phone) { matchIdx = k; break; }
                }

                var workerObj = {
                    id: wid,
                    firstName: firstName || 'Worker',
                    lastName: lastName || '',
                    nic: nic || '',
                    phone: phone || '',
                    whatsapp: whatsapp || phone || '',
                    age: age,
                    category: category,
                    experience: experience,
                    skills: skills,
                    locations: locations,
                    shifts: shifts,
                    policeStation: policeStation || '',
                    currentAddress: currentAddress || '',
                    permanentAddress: permanentAddress || '',
                    nextOfKinName: nextOfKinName || '',
                    nextOfKinPhone: nextOfKinPhone || '',
                    nextOfKinRelationship: nextOfKinRelationship || '',
                    nextOfKinAddress: nextOfKinAddress || '',
                    noticeperiod: noticeperiod,
                    status: status,
                    date: regDate
                };

                if (matchIdx !== -1) {
                    existingWorkers[matchIdx] = Object.assign({}, existingWorkers[matchIdx], workerObj);
                    updatedCount++;
                } else {
                    existingWorkers.push(workerObj);
                    importedCount++;
                }
            }

            localStorage.setItem('workbee_worker_registrations', JSON.stringify(existingWorkers));
            renderWorkers();
            updateStats();
            showToast('Workers Import: ' + importedCount + ' added, ' + updatedCount + ' updated.', 'success');
        } catch (err) {
            console.error('Worker import error:', err);
            showToast('Failed to import Excel file: ' + err.message, 'error');
        }
    };
    reader.readAsArrayBuffer(file);
}

// 3. COMPANIES EXCEL EXPORT
function exportCompaniesToExcel() {
    var companies = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    if (!companies.length) {
        showToast('No company records available to export!', 'error');
        return;
    }

    var exportData = companies.map(function (c, idx) {
        var regDate = c.date ? (c.date.indexOf('T') !== -1 ? c.date.split('T')[0] : c.date) : new Date().toISOString().split('T')[0];
        return {
            'Company ID': String(c.id || ('C-' + (8000 + idx))),
            'Company Name': c.name || c.companyName || '',
            'BR Number': c.brn || c.regNumber || '',
            'Industry': c.industry || 'General',
            'Contact Person': c.contact || c.contactPerson || '',
            'Phone Number': c.phone || '',
            'Email Address': c.email || '',
            'City / District': c.city || c.district || '',
            'Status': c.status || 'approved',
            'Registered Date': regDate
        };
    });

    var dateStr = new Date().toISOString().split('T')[0];
    if (window.XLSX) {
        var ws = XLSX.utils.json_to_sheet(exportData);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Companies');
        XLSX.writeFile(wb, 'WorkBee_Companies_' + dateStr + '.xlsx');
        showToast('Companies exported to Excel successfully!', 'success');
    } else {
        downloadCSV(exportData, 'WorkBee_Companies_' + dateStr + '.csv');
        showToast('Companies exported to CSV successfully!', 'success');
    }
}

// 4. COMPANIES EXCEL IMPORT
function importCompaniesFromExcel(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];
            var json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

            if (!json || !json.length) {
                showToast('Selected file contains no data rows!', 'error');
                return;
            }

            var existingCompanies = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
            var importedCount = 0;
            var updatedCount = 0;

            for (var i = 0; i < json.length; i++) {
                var row = json[i];
                var cid = getRowVal(row, ['Company ID', 'CompanyID', 'ID', 'id', 'cid']);
                var name = getRowVal(row, ['Company Name', 'CompanyName', 'name', 'Name', 'Company', 'company']);
                var brn = getRowVal(row, ['BR Number', 'BRN', 'brn', 'regNumber', 'BR No', 'Registration Number']);
                var industry = getRowVal(row, ['Industry', 'industry', 'Category', 'category']) || 'General';
                var contact = getRowVal(row, ['Contact Person', 'contactPerson', 'contact', 'Contact', 'Person']);
                var phone = String(getRowVal(row, ['Phone Number', 'Phone', 'phone', 'Mobile', 'mobile', 'Contact Phone'])).trim();
                var email = getRowVal(row, ['Email Address', 'Email', 'email', 'E-mail']);
                var city = getRowVal(row, ['City / District', 'City', 'city', 'District', 'district', 'Location']);
                var status = String(getRowVal(row, ['Status', 'status']) || 'approved').toLowerCase();
                var regDate = getRowVal(row, ['Registered Date', 'Date', 'date', 'registeredDate']) || new Date().toISOString();

                if (!name) continue; // Skip empty rows

                if (!cid) {
                    cid = 'C-' + (8000 + existingCompanies.length + i + 1);
                }

                var matchIdx = -1;
                for (var k = 0; k < existingCompanies.length; k++) {
                    if (String(existingCompanies[k].id).toLowerCase() === String(cid).toLowerCase()) { matchIdx = k; break; }
                    if (brn && existingCompanies[k].brn && String(existingCompanies[k].brn).toLowerCase() === String(brn).toLowerCase()) { matchIdx = k; break; }
                    if (existingCompanies[k].name && String(existingCompanies[k].name).toLowerCase() === String(name).toLowerCase()) { matchIdx = k; break; }
                }

                var compObj = {
                    id: cid,
                    name: name,
                    brn: brn || '',
                    industry: industry,
                    contact: contact || '',
                    phone: phone || '',
                    email: email || '',
                    city: city || 'Colombo',
                    status: status,
                    date: regDate
                };

                if (matchIdx !== -1) {
                    existingCompanies[matchIdx] = Object.assign({}, existingCompanies[matchIdx], compObj);
                    updatedCount++;
                } else {
                    existingCompanies.push(compObj);
                    importedCount++;
                }
            }

            localStorage.setItem('workbee_companies', JSON.stringify(existingCompanies));
            renderCompanies();
            updateStats();
            showToast('Companies Import: ' + importedCount + ' added, ' + updatedCount + ' updated.', 'success');
        } catch (err) {
            console.error('Company import error:', err);
            showToast('Failed to import Excel file: ' + err.message, 'error');
        }
    };
    reader.readAsArrayBuffer(file);
}

// 5. FULL SYSTEM BACKUP (JSON EXPORT)
function exportFullSystemBackup() {
    var workers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var companies = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var compRegs = JSON.parse(localStorage.getItem('workbee_company_registrations') || '[]');
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    var postings = JSON.parse(localStorage.getItem('workbee_job_postings') || '[]');
    var apps = JSON.parse(localStorage.getItem('workbee_job_applications') || '[]');

    var backupPayload = {
        system: 'WorkBee.lk',
        version: '2.0',
        exportedAt: new Date().toISOString(),
        metadata: {
            workersCount: workers.length,
            companiesCount: companies.length,
            requirementsCount: reqs.length,
            usersCount: users.length,
            jobPostingsCount: postings.length,
            applicationsCount: apps.length
        },
        storage: {
            workbee_worker_registrations: workers,
            workbee_companies: companies,
            workbee_company_registrations: compRegs,
            workbee_requirements: reqs,
            workbee_users: users,
            workbee_job_postings: postings,
            workbee_job_applications: apps
        }
    };

    var blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.href = url;
    a.download = 'WorkBee_Full_System_Backup_' + dateStr + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 500);
    showToast('Full system backup downloaded successfully!', 'success');
}

// 6. MASTER MULTI-SHEET EXCEL EXPORT
function exportMasterExcel() {
    if (!window.XLSX) {
        showToast('SheetJS library is not ready, please try again.', 'info');
        return;
    }
    var wb = XLSX.utils.book_new();

    // 1. Workers Sheet
    var workers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var workerRows = workers.map(function (w, idx) {
        return {
            'Worker ID': String(w.id || ('WB-' + (9000 + idx))),
            'Full Name': ((w.firstName || '') + ' ' + (w.lastName || w.name || '')).trim(),
            'NIC': w.nic || '',
            'Phone': w.phone || '',
            'WhatsApp': w.whatsapp || w.phone || '',
            'Age': w.age || 25,
            'Category': w.category || '',
            'Experience (Yrs)': w.experience || 0,
            'Skills': Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || ''),
            'Districts': Array.isArray(w.locations) ? w.locations.join(', ') : (w.locations || ''),
            'Shifts': Array.isArray(w.shifts) ? w.shifts.join(', ') : (w.shifts || ''),
            'Police Station': w.policeStation || '',
            'Current Address': w.currentAddress || '',
            'Permanent Address': w.permanentAddress || '',
            'Kin Name': w.nextOfKinName || '',
            'Kin Phone': w.nextOfKinPhone || '',
            'Kin Relationship': w.nextOfKinRelationship || '',
            'Status': w.status || 'approved',
            'Date': w.date || ''
        };
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(workerRows), 'Workers');

    // 2. Companies Sheet
    var companies = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var companyRows = companies.map(function (c, idx) {
        return {
            'Company ID': String(c.id || ('C-' + (8000 + idx))),
            'Company Name': c.name || c.companyName || '',
            'BR Number': c.brn || '',
            'Industry': c.industry || 'General',
            'Contact Person': c.contact || '',
            'Phone': c.phone || '',
            'Email': c.email || '',
            'City': c.city || '',
            'Status': c.status || 'approved',
            'Date': c.date || ''
        };
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(companyRows), 'Companies');

    // 3. Job Requirements Sheet
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    var reqRows = reqs.map(function (r) {
        return {
            'Job Ref#': String(r.id || ''),
            'Company Name': r.company || '',
            'Phone': r.phone || '',
            'Industry': r.industry || '',
            'Skills Needed': Array.isArray(r.skills) ? r.skills.join(', ') : (r.skills || ''),
            'Workers Required': r.workersReq || 1,
            'District': r.district || '',
            'Town': r.town || '',
            'From Date': r.fromDate || '',
            'To Date': r.toDate || '',
            'Daily Pay': r.payRate || 0,
            'Total Pay': r.totalPay || 0,
            'Shifts': Array.isArray(r.shifts) ? r.shifts.join('/') : (r.shifts || ''),
            'Status': r.status || 'OPEN',
            'Dispatched': r.dispatched ? 'YES' : 'NO'
        };
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(reqRows), 'Job Requirements');

    // 4. Users Sheet
    var users = JSON.parse(localStorage.getItem('workbee_users') || '[]');
    var userRows = users.map(function (u) {
        return {
            'User ID': u.id || '',
            'Username': u.username || '',
            'Role': u.role || '',
            'Created Date': u.createdAt || ''
        };
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(userRows), 'Users');

    var dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, 'WorkBee_Master_Database_' + dateStr + '.xlsx');
    showToast('Master Excel Database exported successfully!', 'success');
}

// 7. FULL SYSTEM RESTORE (JSON OR MASTER EXCEL IMPORT)
function importFullSystemBackup(file) {
    if (!file) return;
    var fileName = file.name.toLowerCase();

    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });
                var storage = {};
                var wCount = 0, cCount = 0, rCount = 0, uCount = 0;

                // 1. Workers Sheet
                var workerSheetName = workbook.SheetNames.find(function (n) { return /worker/i.test(n); });
                if (workerSheetName) {
                    var wJson = XLSX.utils.sheet_to_json(workbook.Sheets[workerSheetName], { defval: '' });
                    var workersList = [];
                    for (var i = 0; i < wJson.length; i++) {
                        var row = wJson[i];
                        var wid = getRowVal(row, ['Worker ID', 'WorkerID', 'ID', 'id', 'Ref']);
                        var firstName = getRowVal(row, ['First Name', 'FirstName', 'firstName', 'fname']);
                        var lastName = getRowVal(row, ['Last Name', 'LastName', 'lastName', 'lname']);
                        var fullName = getRowVal(row, ['Full Name', 'FullName', 'fullName', 'Name', 'name']);
                        if (!firstName && fullName) {
                            var parts = fullName.trim().split(' ');
                            firstName = parts[0] || '';
                            lastName = parts.slice(1).join(' ') || '';
                        }
                        var nic = getRowVal(row, ['NIC Number', 'NIC', 'nic', 'Nic']);
                        var phone = String(getRowVal(row, ['Primary Phone', 'Phone', 'phone', 'Mobile', 'mobile'])).trim();
                        var whatsapp = String(getRowVal(row, ['WhatsApp Number', 'WhatsApp', 'whatsapp', 'wa_phone'])).trim() || phone;
                        var age = parseInt(getRowVal(row, ['Age', 'age'])) || 25;
                        var category = getRowVal(row, ['Category', 'category', 'Industry', 'industry']) || 'General';
                        var experience = parseInt(getRowVal(row, ['Experience (Years)', 'Experience (Yrs)', 'Experience', 'experience'])) || 0;
                        var rawSkills = getRowVal(row, ['Skills', 'skills', 'Skill', 'skill']);
                        var skills = Array.isArray(rawSkills) ? rawSkills : (rawSkills ? String(rawSkills).split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean) : [category]);
                        var rawLocs = getRowVal(row, ['Districts / Locations', 'Districts', 'Locations', 'district', 'districts']);
                        var locations = Array.isArray(rawLocs) ? rawLocs : (rawLocs ? String(rawLocs).split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean) : ['Colombo']);
                        var rawShifts = getRowVal(row, ['Shifts', 'Shift', 'shifts', 'shift']);
                        var shifts = Array.isArray(rawShifts) ? rawShifts : (rawShifts ? String(rawShifts).split(/[,;/]/).map(function (s) { return s.trim(); }).filter(Boolean) : ['Day']);
                        var policeStation = getRowVal(row, ['Police Station', 'policeStation', 'police_station', 'Police']);
                        var currentAddress = getRowVal(row, ['Current Address', 'currentAddress', 'Address', 'address']);
                        var permanentAddress = getRowVal(row, ['Permanent Address', 'permanentAddress']) || currentAddress;
                        var nextOfKinName = getRowVal(row, ['Next of Kin Name', 'nextOfKinName', 'Kin Name', 'kinName']);
                        var nextOfKinPhone = getRowVal(row, ['Next of Kin Phone', 'nextOfKinPhone', 'Kin Phone', 'kinPhone']);
                        var nextOfKinRelationship = getRowVal(row, ['Next of Kin Relationship', 'nextOfKinRelationship', 'Kin Relationship', 'Relationship']);
                        var nextOfKinAddress = getRowVal(row, ['Next of Kin Address', 'nextOfKinAddress', 'Kin Address']);
                        var noticeperiod = getRowVal(row, ['Notice Period', 'noticeperiod', 'Notice']) || 'Immediate';
                        var status = String(getRowVal(row, ['Status', 'status']) || 'approved').toLowerCase();
                        var regDate = getRowVal(row, ['Registered Date', 'Date', 'date', 'registeredDate']) || new Date().toISOString();

                        if (!firstName && !lastName && !fullName && !phone && !nic) continue;
                        if (!wid) wid = 'WB-' + (9000 + i + 1);

                        workersList.push({
                            id: wid,
                            firstName: firstName || 'Worker',
                            lastName: lastName || '',
                            nic: nic || '',
                            phone: phone || '',
                            whatsapp: whatsapp || phone || '',
                            age: age,
                            category: category,
                            experience: experience,
                            skills: skills,
                            locations: locations,
                            shifts: shifts,
                            policeStation: policeStation || '',
                            currentAddress: currentAddress || '',
                            permanentAddress: permanentAddress || '',
                            nextOfKinName: nextOfKinName || '',
                            nextOfKinPhone: nextOfKinPhone || '',
                            nextOfKinRelationship: nextOfKinRelationship || '',
                            nextOfKinAddress: nextOfKinAddress || '',
                            noticeperiod: noticeperiod,
                            status: status,
                            date: regDate
                        });
                    }
                    if (workersList.length) {
                        storage.workbee_worker_registrations = workersList;
                        wCount = workersList.length;
                    }
                }

                // 2. Companies Sheet
                var compSheetName = workbook.SheetNames.find(function (n) { return /compan/i.test(n); });
                if (compSheetName) {
                    var cJson = XLSX.utils.sheet_to_json(workbook.Sheets[compSheetName], { defval: '' });
                    var companiesList = [];
                    for (var i = 0; i < cJson.length; i++) {
                        var row = cJson[i];
                        var cid = getRowVal(row, ['Company ID', 'CompanyID', 'ID', 'id', 'cid']);
                        var name = getRowVal(row, ['Company Name', 'CompanyName', 'name', 'Name', 'Company', 'company']);
                        var brn = getRowVal(row, ['BR Number', 'BRN', 'brn', 'regNumber', 'BR No', 'Registration Number']);
                        var industry = getRowVal(row, ['Industry', 'industry', 'Category', 'category']) || 'General';
                        var contact = getRowVal(row, ['Contact Person', 'contactPerson', 'contact', 'Contact', 'Person']);
                        var phone = String(getRowVal(row, ['Phone Number', 'Phone', 'phone', 'Mobile', 'mobile', 'Contact Phone'])).trim();
                        var email = getRowVal(row, ['Email Address', 'Email', 'email', 'E-mail']);
                        var city = getRowVal(row, ['City / District', 'City', 'city', 'District', 'district', 'Location']);
                        var status = String(getRowVal(row, ['Status', 'status']) || 'approved').toLowerCase();
                        var regDate = getRowVal(row, ['Registered Date', 'Date', 'date', 'registeredDate']) || new Date().toISOString();

                        if (!name) continue;
                        if (!cid) cid = 'C-' + (8000 + i + 1);

                        companiesList.push({
                            id: cid,
                            name: name,
                            brn: brn || '',
                            industry: industry,
                            contact: contact || '',
                            phone: phone || '',
                            email: email || '',
                            city: city || 'Colombo',
                            status: status,
                            date: regDate
                        });
                    }
                    if (companiesList.length) {
                        storage.workbee_companies = companiesList;
                        cCount = companiesList.length;
                    }
                }

                // 3. Job Requirements Sheet
                var reqSheetName = workbook.SheetNames.find(function (n) { return /req|job/i.test(n); });
                if (reqSheetName) {
                    var rJson = XLSX.utils.sheet_to_json(workbook.Sheets[reqSheetName], { defval: '' });
                    var reqsList = [];
                    for (var i = 0; i < rJson.length; i++) {
                        var row = rJson[i];
                        var rid = getRowVal(row, ['Job Ref#', 'Job Ref', 'Ref#', 'ID', 'id', 'Ref', 'Job ID']);
                        var compName = getRowVal(row, ['Company Name', 'Company', 'company']);
                        var phone = getRowVal(row, ['Phone', 'phone']);
                        var industry = getRowVal(row, ['Industry', 'industry']);
                        var rawSkills = getRowVal(row, ['Skills Needed', 'Skills', 'skills']);
                        var skills = Array.isArray(rawSkills) ? rawSkills : (rawSkills ? String(rawSkills).split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean) : [industry || 'General']);
                        var workersReq = parseInt(getRowVal(row, ['Workers Required', 'Workers Req', 'WorkersReq', 'workersReq'])) || 1;
                        var district = getRowVal(row, ['District', 'district', 'Location', 'location']);
                        var town = getRowVal(row, ['Town', 'town']) || district;
                        var fromDate = getRowVal(row, ['From Date', 'fromDate', 'Start Date']);
                        var toDate = getRowVal(row, ['To Date', 'toDate', 'End Date']);
                        var payRate = parseFloat(getRowVal(row, ['Daily Pay', 'DailyPay', 'payRate', 'Pay Rate'])) || 0;
                        var totalPay = parseFloat(getRowVal(row, ['Total Pay', 'TotalPay', 'totalPay'])) || (payRate * 1);
                        var rawShifts = getRowVal(row, ['Shifts', 'Shift', 'shifts', 'shift']);
                        var shifts = Array.isArray(rawShifts) ? rawShifts : (rawShifts ? String(rawShifts).split(/[,;/]/).map(function (s) { return s.trim(); }).filter(Boolean) : ['Day']);
                        var status = String(getRowVal(row, ['Status', 'status']) || 'OPEN').toUpperCase();
                        var dispatched = String(getRowVal(row, ['Dispatched', 'dispatched'])).toUpperCase() === 'YES' || String(getRowVal(row, ['Dispatched', 'dispatched'])).toLowerCase() === 'true';

                        if (!compName && !rid) continue;
                        if (!rid) rid = 'JOB-' + (4000 + i + 1);

                        reqsList.push({
                            id: rid,
                            company: compName || 'Client',
                            phone: phone || '',
                            industry: industry || 'General',
                            skills: skills,
                            workersReq: workersReq,
                            district: district || 'Colombo',
                            town: town || 'Colombo',
                            fromDate: fromDate || '',
                            toDate: toDate || '',
                            payRate: payRate,
                            totalPay: totalPay,
                            shifts: shifts,
                            status: status,
                            dispatched: dispatched
                        });
                    }
                    if (reqsList.length) {
                        storage.workbee_requirements = reqsList;
                        rCount = reqsList.length;
                    }
                }

                // 4. Users Sheet
                var userSheetName = workbook.SheetNames.find(function (n) { return /user/i.test(n); });
                if (userSheetName) {
                    var uJson = XLSX.utils.sheet_to_json(workbook.Sheets[userSheetName], { defval: '' });
                    var usersList = [];
                    for (var i = 0; i < uJson.length; i++) {
                        var row = uJson[i];
                        var uid = getRowVal(row, ['User ID', 'UserID', 'ID', 'id']);
                        var username = getRowVal(row, ['Username', 'username', 'User', 'Name', 'name']);
                        var role = getRowVal(row, ['Role', 'role']) || 'user';
                        var createdAt = getRowVal(row, ['Created Date', 'Date', 'createdAt']) || new Date().toISOString();
                        if (!username) continue;
                        usersList.push({
                            id: uid || ('U-' + (1000 + i + 1)),
                            username: username,
                            role: role,
                            createdAt: createdAt
                        });
                    }
                    if (usersList.length) {
                        storage.workbee_users = usersList;
                        uCount = usersList.length;
                    }
                }

                if (!wCount && !cCount && !rCount && !uCount) {
                    showToast('The selected Excel file contains no recognized WorkBee sheets or data!', 'error');
                    return;
                }

                window._showBackupRestoreModal(storage, {
                    date: 'Excel Master Database (' + file.name + ')',
                    workers: wCount,
                    companies: cCount,
                    requirements: rCount,
                    users: uCount
                });
            } catch (err) {
                console.error('Excel backup restore error:', err);
                showToast('Failed to parse Excel backup file: ' + err.message, 'error');
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var content = JSON.parse(e.target.result);
                var storage = content.storage || content.data || content;

                if (!storage.workbee_worker_registrations && !storage.workbee_companies && !storage.workbee_requirements) {
                    showToast('Invalid backup file format! Missing WorkBee database collections.', 'error');
                    return;
                }

                var wCount = (storage.workbee_worker_registrations || []).length;
                var cCount = (storage.workbee_companies || []).length;
                var rCount = (storage.workbee_requirements || []).length;
                var uCount = (storage.workbee_users || []).length;
                var bDate = content.exportedAt ? new Date(content.exportedAt).toLocaleString() : 'Unknown Date';

                window._showBackupRestoreModal(storage, {
                    date: bDate,
                    workers: wCount,
                    companies: cCount,
                    requirements: rCount,
                    users: uCount
                });
            } catch (err) {
                console.error('Backup restore error:', err);
                showToast('Failed to parse backup JSON file: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Modal for backup restore confirmation
window._showBackupRestoreModal = function (storage, meta) {
    var old = document.getElementById('wb-restore-modal');
    if (old) old.parentNode.removeChild(old);

    var ov = document.createElement('div');
    ov.id = 'wb-restore-modal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:540px;width:100%;margin:40px auto 0;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    bx.innerHTML = '<button onclick="window._closeRestoreModal()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="text-align:center;margin-bottom:16px;">' +
        '<div style="width:60px;height:60px;background:#FEF3C7;color:#D97706;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin:0 auto 12px;">🔄</div>' +
        '<h2 style="color:#0f172a;margin:0 0 6px;">Restore System Backup</h2>' +
        '<p style="color:#64748b;font-size:0.85rem;margin:0;">Backup Exported: <strong>' + meta.date + '</strong></p>' +
        '</div>' +
        '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:14px;margin-bottom:16px;font-size:0.85rem;color:#334155;">' +
        '<div style="font-weight:700;margin-bottom:8px;color:#0F172A;">📦 Backup Contents:</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
        '<div>👷 Workers: <strong>' + meta.workers + '</strong></div>' +
        '<div>🏢 Companies: <strong>' + meta.companies + '</strong></div>' +
        '<div>📋 Job Reqs: <strong>' + meta.requirements + '</strong></div>' +
        '<div>👤 Users: <strong>' + meta.users + '</strong></div>' +
        '</div></div>' +
        '<p style="font-size:0.85rem;color:#B45309;background:#FFFBEB;border:1px solid #FDE68A;padding:10px;border-radius:8px;margin-bottom:18px;">⚠️ <strong>Caution:</strong> Choosing "Replace All" will overwrite existing records with this backup.</p>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<button id="btn-confirm-replace-restore" style="padding:12px;background:#D97706;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:0.95rem;">Replace Current Database (Full Overwrite)</button>' +
        '<button id="btn-confirm-merge-restore" style="padding:12px;background:#10B981;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:0.95rem;">Merge with Existing Data</button>' +
        '<button onclick="window._closeRestoreModal()" style="padding:10px;background:#F1F5F9;color:#475569;border:1px solid #CBD5E1;border-radius:8px;font-weight:600;cursor:pointer;">Cancel</button>' +
        '</div>';

    ov.appendChild(bx);
    document.body.appendChild(ov);

    document.getElementById('btn-confirm-replace-restore').onclick = function () {
        window._executeRestore(storage, false);
    };
    document.getElementById('btn-confirm-merge-restore').onclick = function () {
        window._executeRestore(storage, true);
    };
};

window._closeRestoreModal = function () {
    var m = document.getElementById('wb-restore-modal');
    if (m) m.parentNode.removeChild(m);
};

window._executeRestore = function (storage, isMerge) {
    try {
        var keys = Object.keys(storage);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var val = storage[k];
            if (!val) continue;

            if (isMerge && Array.isArray(val)) {
                var current = JSON.parse(localStorage.getItem(k) || '[]');
                var merged = current.slice();
                for (var j = 0; j < val.length; j++) {
                    var item = val[j];
                    var exists = false;
                    for (var x = 0; x < current.length; x++) {
                        if ((item.id && current[x].id && String(item.id) === String(current[x].id)) ||
                            (item.username && current[x].username && item.username === current[x].username) ||
                            (item.nic && current[x].nic && item.nic === current[x].nic)) {
                            exists = true;
                            merged[x] = Object.assign({}, current[x], item);
                            break;
                        }
                    }
                    if (!exists) merged.push(item);
                }
                localStorage.setItem(k, JSON.stringify(merged));
            } else {
                localStorage.setItem(k, JSON.stringify(val));
            }
        }

        window._closeRestoreModal();
        renderWorkers();
        renderCompanies();
        renderRequirements();
        updateStats();
        updateBroadcastPreview();
        showToast(isMerge ? 'Data successfully merged from backup!' : 'Database completely restored from backup!', 'success');
    } catch (err) {
        console.error('Execution error during restore:', err);
        showToast('Restore failed: ' + err.message, 'error');
    }
};

// 8. TEMPLATE DOWNLOADS
function downloadWorkerTemplate() {
    var sampleRows = [
        {
            'Worker ID': 'WB-9001',
            'First Name': 'Kamal',
            'Last Name': 'Perera',
            'Full Name': 'Kamal Perera',
            'NIC Number': '912345678V',
            'Primary Phone': '0771234567',
            'WhatsApp Number': '0771234567',
            'Age': 32,
            'Category': 'Construction',
            'Experience (Years)': 5,
            'Skills': 'Masonry, Construction Helper',
            'Districts / Locations': 'Colombo, Gampaha',
            'Shifts': 'Day',
            'Police Station': 'Maharagama',
            'Current Address': 'No. 12, High Level Rd, Maharagama',
            'Permanent Address': 'No. 12, High Level Rd, Maharagama',
            'Next of Kin Name': 'Sunethra Perera',
            'Next of Kin Phone': '0779988776',
            'Next of Kin Relationship': 'Spouse',
            'Next of Kin Address': 'No. 12, High Level Rd, Maharagama',
            'Notice Period': 'Immediate',
            'Status': 'approved',
            'Registered Date': '2026-08-28'
        }
    ];

    if (window.XLSX) {
        var ws = XLSX.utils.json_to_sheet(sampleRows);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Workers Template');
        XLSX.writeFile(wb, 'WorkBee_Workers_Import_Template.xlsx');
    } else {
        downloadCSV(sampleRows, 'WorkBee_Workers_Import_Template.csv');
    }
    showToast('Workers Excel template downloaded!', 'success');
}

function downloadCompanyTemplate() {
    var sampleRows = [
        {
            'Company ID': 'C-8001',
            'Company Name': 'ABC Construction Ltd',
            'BR Number': 'PV12345',
            'Industry': 'Construction',
            'Contact Person': 'Saman Perera',
            'Phone Number': '0112345678',
            'Email Address': 'info@abc.com',
            'City / District': 'Colombo',
            'Status': 'approved',
            'Registered Date': '2026-08-28'
        }
    ];

    if (window.XLSX) {
        var ws = XLSX.utils.json_to_sheet(sampleRows);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Companies Template');
        XLSX.writeFile(wb, 'WorkBee_Companies_Import_Template.xlsx');
    } else {
        downloadCSV(sampleRows, 'WorkBee_Companies_Import_Template.csv');
    }
    showToast('Companies Excel template downloaded!', 'success');
}

// 9. HELPER FUNCTIONS
function getRowVal(row, possibleKeys) {
    if (!row || !possibleKeys) return '';
    var rowKeys = Object.keys(row);
    for (var i = 0; i < possibleKeys.length; i++) {
        var pk = possibleKeys[i].toLowerCase().replace(/[^a-z0-9]/g, '');
        for (var j = 0; j < rowKeys.length; j++) {
            var rk = rowKeys[j].toLowerCase().replace(/[^a-z0-9]/g, '');
            if (rk === pk) {
                var val = row[rowKeys[j]];
                return val !== undefined && val !== null ? val : '';
            }
        }
    }
    return '';
}

function downloadCSV(dataArray, filename) {
    if (!dataArray || !dataArray.length) return;
    var headers = Object.keys(dataArray[0]);
    var csvContent = headers.join(',') + '\n';
    for (var i = 0; i < dataArray.length; i++) {
        var row = dataArray[i];
        var rowStr = headers.map(function (h) {
            var val = String(row[h] || '').replace(/"/g, '""');
            return '"' + val + '"';
        }).join(',');
        csvContent += rowStr + '\n';
    }
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 500);
}

// Firebase Cloud Database Helpers for Admin
window.saveFirebaseUrl = function () {
    var inp = document.getElementById('cfg-firebase-url');
    if (!inp) return;
    var val = inp.value.trim();
    if (typeof WB_FIREBASE !== 'undefined') {
        WB_FIREBASE.setDbUrl(val);
        alert(val ? '✅ Firebase Realtime Database URL saved successfully!' : 'Default Firebase Realtime Database URL restored.');
        window.triggerCloudSync();
    }
};

window.pushAllToCloud = async function () {
    if (confirm('Push all local workers, companies, and requirements to your Firebase Cloud Database?')) {
        if (typeof WB_FIREBASE !== 'undefined') {
            var res = await WB_FIREBASE.syncToCloud();
            if (res && res.success) {
                alert('✅ All local records successfully uploaded to Firebase Cloud Database!');
            } else {
                alert('⚠️ Cloud push failed or database URL unreachable. Please check your Firebase Database URL and Rules.');
            }
        }
    }
};

// Populate Firebase URL field on load if present
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        var inp = document.getElementById('cfg-firebase-url');
        if (inp && typeof WB_FIREBASE !== 'undefined') {
            inp.value = WB_FIREBASE.getDbUrl();
        }
    }, 500);
});

// Global window exposure
window.exportWorkersToExcel = exportWorkersToExcel;
window.importWorkersFromExcel = importWorkersFromExcel;
window.exportCompaniesToExcel = exportCompaniesToExcel;
window.importCompaniesFromExcel = importCompaniesFromExcel;
window.exportFullSystemBackup = exportFullSystemBackup;
window.exportMasterExcel = exportMasterExcel;
window.importFullSystemBackup = importFullSystemBackup;
window.downloadWorkerTemplate = downloadWorkerTemplate;
window.downloadCompanyTemplate = downloadCompanyTemplate;

