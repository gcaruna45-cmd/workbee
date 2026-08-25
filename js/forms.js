// WorkBee.lk - Form Handling & Auth Integration

document.addEventListener('DOMContentLoaded', () => {
    initWorkerForm();
    initCompanyForm();
});

// Worker Form Logic
let currentStep = 1;
const totalSteps = 4;

function initWorkerForm() {
    const workerForm = document.getElementById('workerForm') || document.getElementById('worker-registration-form');
    if (!workerForm) return;

    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep === totalSteps - 1) {
                    populateSummary();
                }
                changeStep(currentStep + 1);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => changeStep(currentStep - 1));
    });

    workerForm.addEventListener('submit', handleWorkerSubmit);
}

function changeStep(newStep) {
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepEl) currentStepEl.classList.remove('active');
    currentStep = newStep;
    const nextStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (nextStepEl) nextStepEl.classList.add('active');
}

function validateStep(step) {
    let isValid = true;
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (!currentStepEl) return true;
    
    currentStepEl.querySelectorAll('input[required], select[required]').forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error-shake');
            setTimeout(() => input.classList.remove('error-shake'), 400);
        } else {
            input.classList.remove('error-shake');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields marked with *');
    }
    return isValid;
}

function populateSummary() {
    const summaryDiv = document.getElementById('form-summary');
    if (!summaryDiv) return;

    const getVal = id => document.getElementById(id) ? document.getElementById(id).value : '';
    const firstName = getVal('firstName');
    const phone = getVal('phone');
    const username = getVal('regUsername');
    const category = getVal('worker-category') || 'Worker';

    summaryDiv.innerHTML = `
        <h4>Account & Profile Summary</h4>
        <p><strong>Username:</strong> ${username || phone}</p>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Primary Category:</strong> ${category}</p>
    `;
}

function handleWorkerSubmit(e) {
    if (e) e.preventDefault();
    
    const getVal = id => document.getElementById(id) ? document.getElementById(id).value : '';
    const getSelectedTags = selector => Array.from(document.querySelectorAll(`${selector} .tag-chip.selected, ${selector} .chip.selected`)).map(el => el.textContent.replace('×', '').trim());

    const username = getVal('regUsername') || getVal('phone') || ('worker_' + Date.now());
    const password = getVal('regPassword') || '123456';

    const profileData = {
        fullName: (getVal('firstName') + ' ' + getVal('lastName')).trim() || username,
        nic: getVal('nic'),
        phone: getVal('phone'),
        whatsapp: getVal('whatsapp'),
        district: getVal('district') || getVal('policeStation') || 'Western',
        primarySkill: getVal('worker-category') || 'General Worker',
        skills: getSelectedTags('#skills-container'),
        dailyRate: getVal('dailyRate') || getVal('expectedRate') || '',
        availability: 'available'
    };

    if (window.Auth) {
        const res = Auth.register(username, password, 'worker', profileData);
        if (!res.success) {
            alert(res.message);
            return;
        }
        Auth.login(username, password);
    }

    const card = document.querySelector('.form-card') || document.querySelector('.container');
    if (card) {
        card.innerHTML = `
            <div style="text-align:center;padding:40px 20px;color:#0f172a;">
                <h3 style="color:#10B981;font-size:1.8rem;margin-bottom:12px;">🎉 Registration Successful!</h3>
                <p style="color:#475569;font-size:1rem;margin-bottom:20px;">Your login username is: <strong>${username}</strong></p>
                <a href="worker-dashboard.html" style="background:#F59E0B;color:#0f172a;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:700;display:inline-block;font-size:1rem;">Go to Worker Dashboard →</a>
            </div>
        `;
    }
}

// Company Form Logic
function initCompanyForm() {
    const companyForm = document.getElementById('formRegister') || document.getElementById('company-registration-form');
    if (companyForm) {
        companyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const getVal = id => document.getElementById(id) ? document.getElementById(id).value : '';

            const username = getVal('compUsername') || getVal('comp-contact') || getVal('companyName') || ('comp_' + Date.now());
            const password = getVal('compPassword') || '123456';

            const profileData = {
                companyName: getVal('companyName') || getVal('comp-name'),
                regNumber: getVal('brNumber') || getVal('comp-brn'),
                contactPerson: getVal('contactPerson') || getVal('comp-contact'),
                phone: getVal('companyPhone') || getVal('comp-contact'),
                email: getVal('companyEmail') || getVal('comp-email'),
                district: getVal('companyDistrict') || 'Colombo'
            };

            if (window.Auth) {
                const res = Auth.register(username, password, 'company', profileData);
                if (!res.success) {
                    alert(res.message);
                    return;
                }
                Auth.login(username, password);
            }

            alert('Company Registered Successfully! Redirecting to Company Dashboard...');
            window.location.href = 'company-dashboard.html';
        });
    }
}
