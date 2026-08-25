// admin.js v60 - Full Clean Rewrite

document.addEventListener('DOMContentLoaded', function () {
    checkAuth();
});

function checkAuth() {
    var isAuth = localStorage.getItem('wb_admin_auth');
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
            var user = userEl ? userEl.value.trim() : '';
            var pass = passEl ? passEl.value : '';
            var errEl = document.getElementById('login-error');
            if (user === 'admin' && pass === 'workbee2024') {
                localStorage.setItem('wb_admin_auth', 'true');
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
    var sw = [
        { id: 'WB-9001', firstName: 'Kamal', lastName: 'Perera', nic: '912345678V', phone: '0771234567', whatsapp: '0771234567', age: 32, category: 'Construction', experience: 5, skills: ['Masonry', 'Construction Helper'], locations: ['Colombo'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Maharagama', currentAddress: 'No. 12, High Level Rd, Maharagama', permanentAddress: 'No. 12, High Level Rd, Maharagama', nextOfKinName: 'Sunethra Perera', nextOfKinPhone: '0779988776', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 12, High Level Rd, Maharagama' },
        { id: 'WB-9002', firstName: 'Nimal', lastName: 'Silva', nic: '852345678V', phone: '0711234567', whatsapp: '0711234567', age: 40, category: 'Hospitality', experience: 10, skills: ['Cooking', 'Kitchen Helper', 'Steward'], locations: ['Kandy'], shifts: ['Night'], status: 'approved', date: new Date().toISOString(), policeStation: 'Kandy', currentAddress: 'No. 45, Peradeniya Rd, Kandy', permanentAddress: 'No. 45, Peradeniya Rd, Kandy', nextOfKinName: 'Malini Silva', nextOfKinPhone: '0719876543', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 45, Peradeniya Rd, Kandy' },
        { id: 'WB-9003', firstName: 'Sunil', lastName: 'Fernando', nic: '952345678V', phone: '0781234567', whatsapp: '0781234567', age: 28, category: 'Factory', experience: 2, skills: ['Packing', 'Machine Operator'], locations: ['Gampaha'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Ja-Ela', currentAddress: 'No. 88, Negombo Rd, Ja-Ela', permanentAddress: 'No. 88, Negombo Rd, Ja-Ela', nextOfKinName: 'Anula Fernando', nextOfKinPhone: '0788877665', nextOfKinRelationship: 'Parent (මව / පියා)', nextOfKinAddress: 'No. 88, Negombo Rd, Ja-Ela' },
        { id: 'WB-9004', firstName: 'Ruwan', lastName: 'Wickramasinghe', nic: '931122334V', phone: '0765544332', whatsapp: '0765544332', age: 35, category: 'Electronics', experience: 7, skills: ['Electrician', 'Wiring', 'CCTV Technician'], locations: ['Colombo'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Nugegoda', currentAddress: 'No. 15, Station Rd, Nugegoda', permanentAddress: 'No. 15, Station Rd, Nugegoda', nextOfKinName: 'Champa Wickramasinghe', nextOfKinPhone: '0761122334', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 15, Station Rd, Nugegoda' },
        { id: 'WB-9005', firstName: 'Priyantha', lastName: 'Kumara', nic: '889988776V', phone: '0756677889', whatsapp: '0756677889', age: 45, category: 'Cleaning', experience: 8, skills: ['Cleaner', 'Gardening', 'Commercial Cleaning'], locations: ['Colombo'], shifts: ['Day', 'Night'], status: 'approved', date: new Date().toISOString(), policeStation: 'Piliyandala', currentAddress: 'No. 24, Main St, Piliyandala', permanentAddress: 'No. 24, Main St, Piliyandala', nextOfKinName: 'Kanthi Kumara', nextOfKinPhone: '0751122334', nextOfKinRelationship: 'Spouse (ස්වාමියා / බිරිඳ)', nextOfKinAddress: 'No. 24, Main St, Piliyandala' },
        { id: 'WB-9006', firstName: 'Kasun', lastName: 'Rajapaksha', nic: '971122445V', phone: '0723344556', whatsapp: '0723344556', age: 29, category: 'Construction', experience: 4, skills: ['Masonry', 'Painter', 'Tiler'], locations: ['Colombo', 'Gampaha'], shifts: ['Day'], status: 'approved', date: new Date().toISOString(), policeStation: 'Kadawatha', currentAddress: 'No. 7, Kandy Rd, Kadawatha', permanentAddress: 'No. 7, Kandy Rd, Kadawatha', nextOfKinName: 'Dhammika Rajapaksha', nextOfKinPhone: '0729988776', nextOfKinRelationship: 'Parent (මව / පියා)', nextOfKinAddress: 'No. 7, Kandy Rd, Kadawatha' }
    ];
    var ew = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    if (ew.length < 4) localStorage.setItem('workbee_worker_registrations', JSON.stringify(sw));

    var sc = [
        { id: 'C-8001', name: 'ABC Construction Ltd', brn: 'PV12345', contact: 'Saman Perera', phone: '0112345678', email: 'info@abc.com', city: 'Colombo', status: 'approved', date: new Date().toISOString() },
        { id: 'C-8002', name: 'Grand Lanka Hotel and Resorts', brn: 'PV67890', contact: 'Dilshan Fernando', phone: '0812233445', email: 'hr@grandlanka.lk', city: 'Kandy', status: 'approved', date: new Date().toISOString() },
        { id: 'C-8003', name: 'LogiTrans Logistics Pvt Ltd', brn: 'PV99887', contact: 'Kavinda Silva', phone: '0312255888', email: 'ops@logitrans.lk', city: 'Gampaha', status: 'approved', date: new Date().toISOString() },
        { id: 'C-8004', name: 'CleanTech Commercial Services', brn: 'PV44332', contact: 'Nirmala Jayasinghe', phone: '0117766554', email: 'contact@cleantech.lk', city: 'Colombo', status: 'approved', date: new Date().toISOString() },
        { id: 'C-8005', name: 'Gagana Construction', brn: 'PV88441', contact: 'Gagana Ranasinghe', phone: '0769447538', email: 'gagana@gmail.com', city: 'Colombo', status: 'approved', date: new Date().toISOString() }
    ];
    var ec = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    if (ec.length < 3) localStorage.setItem('workbee_companies', JSON.stringify(sc));

    var sr = [
        { id: 'JOB-4821', company: 'ABC Construction Ltd', phone: '0112345678', industry: 'Construction', skills: ['Masonry', 'Construction Helper'], workersReq: 2, district: 'Colombo', town: 'Colombo 03', fromDate: '2026-09-01', toDate: '2026-09-15', totalDays: 15, payRate: 2500, totalPay: 75000, shifts: ['Day'], meals: ['Breakfast', 'Lunch'], desc: 'Commercial site construction.', status: 'OPEN', applicants: ['WB-9001'], applicantsDetails: [{ id: 'WB-9001', name: 'Kamal Perera', phone: '0771234567', nic: '912345678V', skills: ['Masonry'] }], postedDate: new Date().toISOString().split('T')[0] },
        { id: 'JOB-9500', company: 'Gagana Construction', phone: '0769447538', industry: 'Construction', skills: ['Masonry'], workersReq: 2, district: 'Colombo', town: 'Nugegoda', fromDate: '2026-08-21', toDate: '2026-08-28', totalDays: 8, payRate: 3200, totalPay: 51200, shifts: ['Night'], meals: ['Lunch'], desc: 'Masonry work.', status: 'OPEN', applicants: ['WB-9001', 'WB-9006'], applicantsDetails: [{ id: 'WB-9001', name: 'Kamal Perera', phone: '0771234567', nic: '912345678V', skills: ['Masonry'] }, { id: 'WB-9006', name: 'Kasun Rajapaksha', phone: '0723344556', nic: '971122445V', skills: ['Masonry'] }], postedDate: new Date().toISOString().split('T')[0] },
        { id: 'JOB-2280', company: 'Grand Lanka Hotel and Resorts', phone: '0812233445', industry: 'Hospitality', skills: ['Kitchen Helper', 'Steward'], workersReq: 2, district: 'Kandy', town: 'Kandy City', fromDate: '2026-09-05', toDate: '2026-09-20', totalDays: 15, payRate: 2200, totalPay: 66000, shifts: ['Day', 'Night'], meals: ['Breakfast', 'Lunch', 'Dinner'], desc: 'Hotel banquet catering.', status: 'OPEN', applicants: ['WB-9002'], applicantsDetails: [{ id: 'WB-9002', name: 'Nimal Silva', phone: '0711234567', nic: '852345678V', skills: ['Kitchen Helper'] }], postedDate: new Date().toISOString().split('T')[0] },
        { id: 'JOB-7740', company: 'LogiTrans Logistics Pvt Ltd', phone: '0312255888', industry: 'Factory', skills: ['Packing', 'Machine Operator'], workersReq: 3, district: 'Gampaha', town: 'Ja-Ela', fromDate: '2026-09-10', toDate: '2026-09-25', totalDays: 15, payRate: 2000, totalPay: 90000, shifts: ['Day'], meals: ['Lunch', 'Tea'], desc: 'Factory packaging.', status: 'OPEN', applicants: ['WB-9003'], applicantsDetails: [{ id: 'WB-9003', name: 'Sunil Fernando', phone: '0781234567', nic: '952345678V', skills: ['Packing'] }], postedDate: new Date().toISOString().split('T')[0] }
    ];
    var er = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    if (er.length < 2) localStorage.setItem('workbee_requirements', JSON.stringify(sr));
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
                if (target === 'tab-workers') renderWorkers();
                if (target === 'tab-companies') renderCompanies();
                if (target === 'tab-requirements') renderRequirements();
                if (target === 'tab-broadcast') updateBroadcastPreview();
            });
        })(navItems[i]);
    }
    var si = document.getElementById('search-workers');
    if (si) si.addEventListener('input', function () { renderWorkers(this.value.trim().toLowerCase()); });
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
    var bcp = document.getElementById('bc-preview-btn');
    if (bcp) bcp.onclick = function () { updateBroadcastPreview(); var r = document.getElementById('bc-preview-result'); if (r) r.style.display = 'block'; };
    updateStats();
    renderWorkers();
    renderRequirements();
}

function updateStats() {
    var workers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var companies = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
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
    var workers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
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
        tr.innerHTML = '<td><strong style="color:#F59E0B;">#' + wid + '</strong></td><td>' + fn + '</td><td>' + (w.nic || 'N/A') + '</td><td>' + (w.phone || 'N/A') + '</td><td>' + (w.whatsapp || w.phone || 'N/A') + '</td><td>' + (w.age || 25) + '</td><td><small style="background:#f1f5f9;color:#334155;padding:2px 6px;border-radius:4px;">' + sk + '</small></td><td>' + lo + '</td><td>' + sh + '</td><td><span style="background:' + (ia ? '#dcfce7;color:#166534' : '#fef3c7;color:#92400e') + ';padding:2px 8px;border-radius:4px;font-weight:600;">' + (w.status || 'pending') + '</span></td><td><button style="background:#e0f2fe;color:#0369a1;border:1px solid #7dd3fc;padding:4px 8px;border-radius:4px;cursor:pointer;font-weight:bold;margin-right:4px;" onclick="window._VWD(\'' + wid + '\')">👁️ View</button><button style="background:' + (ia ? '#94a3b8' : '#10B981') + ';color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;margin-right:4px;" onclick="window._AW(\'' + wid + '\')">Approve</button> <button style="background:#ef4444;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;" onclick="window._DW(\'' + wid + '\')">Delete</button></td>';
        tbody.appendChild(tr);
    }
}

window._VWD = function (id) {
    var old = document.getElementById('wb-wmodal');
    if (old) old.parentNode.removeChild(old);

    var ws = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
    var w = null;
    for (var i = 0; i < ws.length; i++) {
        if (String(ws[i].id) === String(id)) { w = ws[i]; break; }
    }
    if (!w) { alert('Worker #' + id + ' not found!'); return; }

    var fn = ((w.firstName || '') + ' ' + (w.lastName || w.name || 'Worker')).trim();
    var sk = Array.isArray(w.skills) ? w.skills.join(', ') : (w.skills || w.category || 'N/A');
    var lo = Array.isArray(w.locations) ? w.locations.join(', ') : (w.locations || 'N/A');

    var ov = document.createElement('div');
    ov.id = 'wb-wmodal';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.88);z-index:999999;overflow-y:auto;padding:30px 20px;';
    var bx = document.createElement('div');
    bx.style.cssText = 'background:#fff;border-radius:16px;max-width:680px;width:100%;margin:0 auto;padding:28px;box-shadow:0 25px 50px rgba(0,0,0,0.4);position:relative;border:2px solid #F59E0B;';

    bx.innerHTML = '<button onclick="window._CWM()" style="position:absolute;top:14px;right:14px;background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;">&times;</button>' +
        '<div style="margin-bottom:16px;border-bottom:2px solid #f1f5f9;padding-bottom:12px;">' +
        '<span style="font-family:monospace;color:#F59E0B;font-weight:bold;">WORKER ID: #' + w.id + '</span>' +
        '<h2 style="color:#0f172a;margin:4px 0 2px;">👷 ' + fn + '</h2>' +
        '<span style="background:' + (w.status === 'approved' ? '#dcfce7;color:#166534' : '#fef3c7;color:#92400e') + ';padding:2px 10px;border-radius:12px;font-size:0.8rem;font-weight:bold;">Status: ' + (w.status || 'pending') + '</span>' +
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
        '<div style="grid-column:1/-1;">💡 <strong>Skills:</strong> ' + sk + '</div>' +
        '<div style="grid-column:1/-1;">📍 <strong>Districts:</strong> ' + lo + '</div>' +
        '</div></div>' +
        '<div style="display:flex;justify-content:flex-end;">' +
        '<button onclick="window._CWM()" style="padding:10px 20px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Close</button>' +
        '</div>';

    ov.appendChild(bx);
    document.body.appendChild(ov);
};

window._CWM = function () {
    var m = document.getElementById('wb-wmodal');
    if (m) m.parentNode.removeChild(m);
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
    ws = ws.filter(function (w) { return String(w.id) !== String(id); });
    localStorage.setItem('workbee_worker_registrations', JSON.stringify(ws));
    renderWorkers(); updateStats(); showToast('Worker deleted.', 'info');
};
window._approveWorker = window._AW;
window._deleteWorker = window._DW;

function renderCompanies() {
    var tbody = document.getElementById('companies-tbody');
    if (!tbody) return;
    var cs = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    tbody.innerHTML = '';
    if (!cs.length) { tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px;color:#64748b;">No companies yet.</td></tr>'; return; }
    for (var i = 0; i < cs.length; i++) {
        var c = cs[i]; var tr = document.createElement('tr');
        var fd = c.date ? c.date.split('T')[0] : 'Today';
        tr.innerHTML = '<td><strong>' + (c.name || 'Company') + '</strong></td><td>' + (c.brn || 'N/A') + '</td><td>' + (c.industry || 'General') + '</td><td>' + (c.contact || 'N/A') + '</td><td>' + (c.phone || 'N/A') + '</td><td>' + (c.email || 'N/A') + '</td><td>' + (c.city || 'N/A') + '</td><td><small>' + fd + '</small></td><td><span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">' + (c.status || 'approved') + '</span></td><td><button style="background:#ef4444;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;" onclick="window._DC(' + i + ')">Delete</button></td>';
        tbody.appendChild(tr);
    }
}
window._DC = function (idx) {
    if (!confirm('Delete company?')) return;
    var cs = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
    cs.splice(idx, 1);
    localStorage.setItem('workbee_companies', JSON.stringify(cs));
    renderCompanies(); updateStats(); showToast('Company deleted.', 'info');
};
window._deleteCompany = window._DC;

function renderRequirements() {
    var tbody = document.getElementById('requirements-tbody');
    if (!tbody) return;
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
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
        tr.innerHTML = '<td><strong style="color:#F59E0B;">#' + rid + '</strong></td><td><strong>' + (r.company || 'Client') + '</strong><br><small style="color:#64748b;">Ph: ' + (r.phone || 'N/A') + '</small></td><td>' + sk + '</td><td>' + (r.workersReq || 1) + '</td><td>' + (r.district || 'N/A') + '</td><td>' + sh + '</td><td>' + (r.fromDate || 'N/A') + ' - ' + (r.toDate || 'N/A') + '<br><small style="color:#059669;">LKR ' + Number(r.totalPay || 0).toLocaleString() + '</small></td><td><button onclick="event.stopPropagation();window._ODM(\'' + rid + '\')" style="background:#e0f2fe;color:#0369a1;border:1px solid #7dd3fc;padding:4px 8px;border-radius:6px;font-size:0.75rem;cursor:pointer;">View (' + ac + '/' + (r.workersReq || 1) + ')</button></td><td>' + sb + '</td><td><button onclick="event.stopPropagation();window._ODM(\'' + rid + '\')" style="background:#10B981;color:white;padding:5px 10px;border-radius:4px;border:none;cursor:pointer;font-size:0.75rem;font-weight:bold;margin-right:4px;">Dispatch</button><button onclick="event.stopPropagation();window._TJS(\'' + rid + '\')" style="background:' + (iF ? '#3B82F6' : '#EF4444') + ';color:white;padding:5px 8px;border-radius:4px;border:none;cursor:pointer;font-size:0.75rem;">' + (iF ? 'Re-Open' : 'Mark FILLED') + '</button> <button onclick="event.stopPropagation();window._DR(\'' + rid + '\')" style="background:#64748b;color:white;padding:5px 8px;border-radius:4px;border:none;cursor:pointer;font-size:0.75rem;">Del</button></td>';
        tbody.appendChild(tr);
    }
}

window._TJS = function (rid) {
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    for (var i = 0; i < reqs.length; i++) { if (String(reqs[i].id) === String(rid)) { reqs[i].status = reqs[i].status === 'FILLED' ? 'OPEN' : 'FILLED'; break; } }
    localStorage.setItem('workbee_requirements', JSON.stringify(reqs));
    renderRequirements(); showToast('Job status updated.', 'success');
};
window.toggleJobStatus = window._TJS;

window._DR = function (rid) {
    if (!confirm('Delete requirement ' + rid + '?')) return;
    var reqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
    reqs = reqs.filter(function (r) { return String(r.id) !== String(rid); });
    localStorage.setItem('workbee_requirements', JSON.stringify(reqs));
    renderRequirements(); updateStats(); showToast('Deleted.', 'info');
};
window.deleteRequirement = window._DR;

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
