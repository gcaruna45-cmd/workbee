/**
 * WorkBee.lk - Cloud Realtime Synchronization Engine
 * Powered by Firebase Realtime Database REST API
 * Enables cross-device sync: Mobile registrations instantly appear on Admin Laptop
 */

const WB_FIREBASE = (function () {
    // Default Firebase database URL or custom admin-configured URL
    const DEFAULT_DB_URL = 'https://workbee-lk-default-rtdb.asia-southeast1.firebasedatabase.app';

    function getDbUrl() {
        let customUrl = localStorage.getItem('workbee_firebase_url');
        if (customUrl && customUrl.trim()) {
            return customUrl.trim().replace(/\/+$/, '');
        }
        return DEFAULT_DB_URL;
    }

    function sanitizeKey(k) {
        if (!k) return 'item_' + Date.now();
        return String(k).replace(/[.#$[\]/]/g, '_');
    }

    // Helper: generic fetch with timeout
    async function apiRequest(endpoint, method = 'GET', data = null) {
        const url = getDbUrl() + '/' + endpoint + '.json';
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        try {
            const options = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal
            };
            if (data !== null) {
                options.body = JSON.stringify(data);
            }
            const res = await fetch(url, options);
            clearTimeout(timeoutId);
            if (!res.ok) return null;
            return await res.json();
        } catch (err) {
            clearTimeout(timeoutId);
            return null;
        }
    }

    return {
        getDbUrl: getDbUrl,
        setDbUrl: function (newUrl) {
            if (newUrl) localStorage.setItem('workbee_firebase_url', newUrl.trim());
            else localStorage.removeItem('workbee_firebase_url');
        },

        // ---- WRITE HELPERS ----
        saveWorker: async function (worker) {
            if (!worker) return;
            const key = sanitizeKey(worker.id || worker.username);
            return await apiRequest('workers/' + key, 'PUT', worker);
        },

        saveCompany: async function (company) {
            if (!company) return;
            const key = sanitizeKey(company.id || company.username || company.name);
            return await apiRequest('companies/' + key, 'PUT', company);
        },

        saveRequirement: async function (req) {
            if (!req) return;
            const key = sanitizeKey(req.id);
            return await apiRequest('requirements/' + key, 'PUT', req);
        },

        saveUser: async function (user) {
            if (!user) return;
            const key = sanitizeKey(user.username || user.id);
            return await apiRequest('users/' + key, 'PUT', user);
        },

        deleteWorker: async function (id) {
            const key = sanitizeKey(id);
            return await apiRequest('workers/' + key, 'DELETE');
        },

        deleteCompany: async function (id) {
            const key = sanitizeKey(id);
            return await apiRequest('companies/' + key, 'DELETE');
        },

        deleteRequirement: async function (id) {
            const key = sanitizeKey(id);
            return await apiRequest('requirements/' + key, 'DELETE');
        },

        // ---- READ ALL FROM CLOUD ----
        getAllWorkers: async function () {
            const data = await apiRequest('workers');
            if (!data) return [];
            return Object.values(data).filter(Boolean);
        },

        getAllCompanies: async function () {
            const data = await apiRequest('companies');
            if (!data) return [];
            return Object.values(data).filter(Boolean);
        },

        getAllRequirements: async function () {
            const data = await apiRequest('requirements');
            if (!data) return [];
            return Object.values(data).filter(Boolean);
        },

        getAllUsers: async function () {
            const data = await apiRequest('users');
            if (!data) return [];
            return Object.values(data).filter(Boolean);
        },

        // ---- SYNC CLOUD -> LOCAL STORAGE (Crucial for Admin Dashboard) ----
        syncFromCloud: async function () {
            try {
                const [cloudWorkers, cloudCompanies, cloudReqs, cloudUsers] = await Promise.all([
                    this.getAllWorkers(),
                    this.getAllCompanies(),
                    this.getAllRequirements(),
                    this.getAllUsers()
                ]);

                let localUpdated = false;

                // Sync Workers
                if (cloudWorkers && cloudWorkers.length > 0) {
                    let localWorkers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
                    cloudWorkers.forEach(cw => {
                        const idx = localWorkers.findIndex(lw => String(lw.id) === String(cw.id) || (lw.username && cw.username && lw.username === cw.username));
                        if (idx !== -1) {
                            localWorkers[idx] = Object.assign({}, localWorkers[idx], cw);
                        } else {
                            localWorkers.unshift(cw);
                        }
                    });
                    localStorage.setItem('workbee_worker_registrations', JSON.stringify(localWorkers));
                    localUpdated = true;
                }

                // Sync Companies
                if (cloudCompanies && cloudCompanies.length > 0) {
                    let localCompanies = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
                    cloudCompanies.forEach(cc => {
                        const idx = localCompanies.findIndex(lc => String(lc.id) === String(cc.id) || (lc.name && cc.name && lc.name.toLowerCase() === cc.name.toLowerCase()));
                        if (idx !== -1) {
                            localCompanies[idx] = Object.assign({}, localCompanies[idx], cc);
                        } else {
                            localCompanies.unshift(cc);
                        }
                    });
                    localStorage.setItem('workbee_companies', JSON.stringify(localCompanies));
                    localUpdated = true;
                }

                // Sync Requirements
                if (cloudReqs && cloudReqs.length > 0) {
                    let localReqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
                    cloudReqs.forEach(cr => {
                        const idx = localReqs.findIndex(lr => String(lr.id) === String(cr.id));
                        if (idx !== -1) {
                            localReqs[idx] = Object.assign({}, localReqs[idx], cr);
                        } else {
                            localReqs.unshift(cr);
                        }
                    });
                    localStorage.setItem('workbee_requirements', JSON.stringify(localReqs));
                    localUpdated = true;
                }

                // Sync Users
                if (cloudUsers && cloudUsers.length > 0) {
                    let localUsers = JSON.parse(localStorage.getItem('workbee_users') || '[]');
                    cloudUsers.forEach(cu => {
                        const idx = localUsers.findIndex(lu => String(lu.username).toLowerCase() === String(cu.username).toLowerCase());
                        if (idx !== -1) {
                            localUsers[idx] = Object.assign({}, localUsers[idx], cu);
                        } else {
                            localUsers.push(cu);
                        }
                    });
                    localStorage.setItem('workbee_users', JSON.stringify(localUsers));
                    localUpdated = true;
                }

                return { success: true, updated: localUpdated };
            } catch (err) {
                console.warn('[Firebase Sync Error]:', err);
                return { success: false, error: err };
            }
        },

        // ---- SYNC LOCAL STORAGE -> CLOUD ----
        syncToCloud: async function () {
            try {
                const localWorkers = JSON.parse(localStorage.getItem('workbee_worker_registrations') || '[]');
                const localCompanies = JSON.parse(localStorage.getItem('workbee_companies') || '[]');
                const localReqs = JSON.parse(localStorage.getItem('workbee_requirements') || '[]');
                const localUsers = JSON.parse(localStorage.getItem('workbee_users') || '[]');

                const promises = [];
                localWorkers.forEach(w => promises.push(this.saveWorker(w)));
                localCompanies.forEach(c => promises.push(this.saveCompany(c)));
                localReqs.forEach(r => promises.push(this.saveRequirement(r)));
                localUsers.forEach(u => promises.push(this.saveUser(u)));

                await Promise.all(promises);
                return { success: true };
            } catch (err) {
                console.warn('[Firebase Push Error]:', err);
                return { success: false, error: err };
            }
        }
    };
})();

window.WB_FIREBASE = WB_FIREBASE;
