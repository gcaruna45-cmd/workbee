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

        saveAssignedJob: async function (job) {
            if (!job) return;
            const key = sanitizeKey(job.id);
            return await apiRequest('assigned_jobs/' + key, 'PUT', job);
        },

        saveUser: async function (user) {
            if (!user) return;
            const key = sanitizeKey(user.username || user.id);
            return await apiRequest('users/' + key, 'PUT', user);
        },

        // ---- DELETE HELPERS (INSTANT CLOUD DELETE) ----
        deleteWorker: async function (id, username) {
            const promises = [];
            if (id) promises.push(apiRequest('workers/' + sanitizeKey(id), 'DELETE'));
            if (username && username !== id) promises.push(apiRequest('workers/' + sanitizeKey(username), 'DELETE'));
            if (username) promises.push(apiRequest('users/' + sanitizeKey(username), 'DELETE'));
            if (id) promises.push(apiRequest('users/' + sanitizeKey(id), 'DELETE'));
            try {
                await Promise.all(promises);
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteWorker Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteCompany: async function (id, name, username) {
            const promises = [];
            if (id) promises.push(apiRequest('companies/' + sanitizeKey(id), 'DELETE'));
            if (name && name !== id) promises.push(apiRequest('companies/' + sanitizeKey(name), 'DELETE'));
            if (username && username !== id && username !== name) promises.push(apiRequest('companies/' + sanitizeKey(username), 'DELETE'));
            if (username) promises.push(apiRequest('users/' + sanitizeKey(username), 'DELETE'));
            if (id) promises.push(apiRequest('users/' + sanitizeKey(id), 'DELETE'));
            if (name) promises.push(apiRequest('users/' + sanitizeKey(name), 'DELETE'));
            try {
                await Promise.all(promises);
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteCompany Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteRequirement: async function (id) {
            if (!id) return;
            try {
                await apiRequest('requirements/' + sanitizeKey(id), 'DELETE');
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteRequirement Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteAssignedJob: async function (id) {
            if (!id) return;
            try {
                await apiRequest('assigned_jobs/' + sanitizeKey(id), 'DELETE');
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteAssignedJob Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteUser: async function (usernameOrId) {
            if (!usernameOrId) return;
            try {
                await apiRequest('users/' + sanitizeKey(usernameOrId), 'DELETE');
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteUser Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteAllWorkers: async function () {
            try {
                await apiRequest('workers', 'DELETE');
                // Remove worker users
                const users = await this.getAllUsers();
                const workerUsers = users.filter(u => u && u.role === 'worker');
                await Promise.all(workerUsers.map(u => this.deleteUser(u.username || u.id)));
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteAllWorkers Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteAllCompanies: async function () {
            try {
                await apiRequest('companies', 'DELETE');
                // Remove company users
                const users = await this.getAllUsers();
                const compUsers = users.filter(u => u && u.role === 'company');
                await Promise.all(compUsers.map(u => this.deleteUser(u.username || u.id)));
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteAllCompanies Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteAllRequirements: async function () {
            try {
                await apiRequest('requirements', 'DELETE');
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteAllRequirements Error]:', err);
                return { success: false, error: err };
            }
        },

        deleteAllAssignedJobs: async function () {
            try {
                await apiRequest('assigned_jobs', 'DELETE');
                return { success: true };
            } catch (err) {
                console.warn('[Firebase deleteAllAssignedJobs Error]:', err);
                return { success: false, error: err };
            }
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

        getAllAssignedJobs: async function () {
            const data = await apiRequest('assigned_jobs');
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
                const [cloudWorkers, cloudCompanies, cloudReqs, cloudUsers, cloudAssignedJobs] = await Promise.all([
                    this.getAllWorkers(),
                    this.getAllCompanies(),
                    this.getAllRequirements(),
                    this.getAllUsers(),
                    this.getAllAssignedJobs()
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

                // Sync Assigned Jobs
                if (cloudAssignedJobs && cloudAssignedJobs.length > 0) {
                    let localJobs = JSON.parse(localStorage.getItem('workbee_assigned_jobs') || '[]');
                    cloudAssignedJobs.forEach(cj => {
                        const idx = localJobs.findIndex(lj => String(lj.id) === String(cj.id));
                        if (idx !== -1) {
                            localJobs[idx] = Object.assign({}, localJobs[idx], cj);
                        } else {
                            localJobs.unshift(cj);
                        }
                    });
                    localStorage.setItem('workbee_assigned_jobs', JSON.stringify(localJobs));
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
                const localAssignedJobs = JSON.parse(localStorage.getItem('workbee_assigned_jobs') || '[]');

                const promises = [];
                localWorkers.forEach(w => promises.push(this.saveWorker(w)));
                localCompanies.forEach(c => promises.push(this.saveCompany(c)));
                localReqs.forEach(r => promises.push(this.saveRequirement(r)));
                localUsers.forEach(u => promises.push(this.saveUser(u)));
                localAssignedJobs.forEach(j => promises.push(this.saveAssignedJob(j)));

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
