// WorkBee.lk - Authentication & Session Management System

const AUTH_KEYS = {
    USERS: 'workbee_users',
    SESSION: 'workbee_session',
    WORKERS: 'workbee_worker_registrations',
    COMPANIES: 'workbee_companies',
    JOB_POSTINGS: 'workbee_job_postings',
    APPLICATIONS: 'workbee_job_applications'
};

// Initialize auth storage if empty
(function initAuthStorage() {
    if (!localStorage.getItem(AUTH_KEYS.USERS)) {
        localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(AUTH_KEYS.JOB_POSTINGS)) {
        localStorage.setItem(AUTH_KEYS.JOB_POSTINGS, JSON.stringify([]));
    }
    if (!localStorage.getItem(AUTH_KEYS.APPLICATIONS)) {
        localStorage.setItem(AUTH_KEYS.APPLICATIONS, JSON.stringify([]));
    }
})();

const Auth = {
    // Register User (Worker or Company or Admin)
    register: function (username, password, role, profileData) {
        username = username.trim().toLowerCase();
        let users = JSON.parse(localStorage.getItem(AUTH_KEYS.USERS) || '[]');
        
        if (users.some(u => u.username === username)) {
            return { success: false, message: 'Username already exists! Please choose another.' };
        }

        const userId = 'usr_' + Date.now();
        const newUser = {
            id: userId,
            username: username,
            password: password, // client-side demo app
            role: role, // 'worker', 'company', 'admin'
            profileData: profileData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));

        // Save to respective lists for compatibility with Admin panel
        if (role === 'worker') {
            let workers = JSON.parse(localStorage.getItem(AUTH_KEYS.WORKERS) || '[]');
            profileData.userId = userId;
            profileData.username = username;
            profileData.status = profileData.status || 'pending';
            profileData.registeredAt = profileData.registeredAt || new Date().toISOString();
            if (profileData.id) {
                workers = workers.filter(w => w.id !== profileData.id);
                workers.unshift(profileData);
                localStorage.setItem(AUTH_KEYS.WORKERS, JSON.stringify(workers));
            }
            // Save to Firebase cloud (cross-device visibility)
            if (typeof WB_FIREBASE !== 'undefined') {
                WB_FIREBASE.saveWorker(profileData).catch(function(){});
                WB_FIREBASE.saveUser(newUser).catch(function(){});
            }
        } else if (role === 'company') {
            let companies = JSON.parse(localStorage.getItem(AUTH_KEYS.COMPANIES) || '[]');
            profileData.userId = userId;
            profileData.username = username;
            profileData.status = profileData.status || 'approved';
            profileData.registeredAt = profileData.registeredAt || new Date().toISOString();
            if (profileData.id) {
                companies = companies.filter(c => c.id !== profileData.id);
                companies.unshift(profileData);
                localStorage.setItem(AUTH_KEYS.COMPANIES, JSON.stringify(companies));
            }
            // Save to Firebase cloud (cross-device visibility)
            if (typeof WB_FIREBASE !== 'undefined') {
                WB_FIREBASE.saveCompany(profileData).catch(function(){});
                WB_FIREBASE.saveUser(newUser).catch(function(){});
            }
        }

        return { success: true, user: newUser };
    },


    // Login User
    login: function (username, password) {
        username = username.trim().toLowerCase();
        let users = JSON.parse(localStorage.getItem(AUTH_KEYS.USERS) || '[]');
        
        // Special check for default Admin login
        if (username === 'admin' && (password === 'admin123' || password === 'workbee2024')) {
            const adminSession = {
                id: 'admin_root',
                username: 'admin',
                role: 'admin',
                name: 'Administrator'
            };
            localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify(adminSession));
            localStorage.setItem('wb_admin_auth', 'true');
            return { success: true, user: adminSession, redirect: 'admin.html' };
        }

        let user = users.find(u => u.username === username && u.password === password);
        
        // Also check if username matches phone number, NIC, or email of any registered user
        if (!user) {
            user = users.find(u => {
                if (u.password !== password) return false;
                const p = u.profileData || {};
                const ph = (p.phone || '').replace(/[^0-9]/g, '');
                const qPh = username.replace(/[^0-9]/g, '');
                if (qPh && ph && (ph === qPh || ph.endsWith(qPh) || qPh.endsWith(ph))) return true;
                if (p.nic && p.nic.toLowerCase() === username) return true;
                if (p.email && p.email.toLowerCase() === username) return true;
                return false;
            });
        }

        if (!user) {
            return { success: false, message: 'Invalid Username or Password!' };
        }

        const sessionData = {
            id: user.id,
            username: user.username,
            role: user.role,
            profileData: user.profileData
        };

        localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify(sessionData));

        let redirect = 'index.html';
        if (user.role === 'worker') redirect = 'worker-dashboard.html';
        if (user.role === 'company') redirect = 'company-dashboard.html';
        if (user.role === 'admin') redirect = 'admin.html';

        return { success: true, user: sessionData, redirect: redirect };
    },

    // Get current logged-in user
    getCurrentUser: function () {
        const session = localStorage.getItem(AUTH_KEYS.SESSION);
        return session ? JSON.parse(session) : null;
    },

    // Logout User
    logout: function () {
        localStorage.removeItem(AUTH_KEYS.SESSION);
        window.location.href = 'login.html';
    },

    // Require Auth Check for protected pages
    requireAuth: function (allowedRoles = []) {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return null;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            alert('Access Denied: You do not have permission to view this page.');
            if (user.role === 'worker') window.location.href = 'worker-dashboard.html';
            else if (user.role === 'company') window.location.href = 'company-dashboard.html';
            else window.location.href = 'index.html';
            return null;
        }

        return user;
    },

    // Update UI headers / navbar with user state
    updateNavUI: function () {
        const user = this.getCurrentUser();
        const navAuthContainer = document.getElementById('nav-auth-container');
        if (!navAuthContainer) return;

        if (user) {
            let dashUrl = 'index.html';
            if (user.role === 'worker') dashUrl = 'worker-dashboard.html';
            if (user.role === 'company') dashUrl = 'company-dashboard.html';
            if (user.role === 'admin') dashUrl = 'admin.html';

            const displayName = (user.profileData && (user.profileData.fullName || user.profileData.companyName)) || user.username;

            navAuthContainer.innerHTML = `
                <div style="display:flex;align-items:center;gap:10px;">
                    <a href="${dashUrl}" style="background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid #F59E0B;padding:6px 14px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.85rem;display:flex;align-items:center;gap:6px;">
                        👤 ${displayName} (${user.role.toUpperCase()})
                    </a>
                    <button onclick="Auth.logout()" style="background:#ef4444;color:white;border:none;padding:6px 12px;border-radius:8px;font-weight:600;font-size:0.85rem;cursor:pointer;">
                        🚪 Logout
                    </button>
                </div>
            `;
        } else {
            navAuthContainer.innerHTML = `
                <a href="login.html" style="background:#F59E0B;color:#0f172a;padding:8px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">
                    🔑 Login
                </a>
            `;
        }
    }
};

window.Auth = Auth;
document.addEventListener('DOMContentLoaded', function() {
    Auth.updateNavUI();
});
