// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile nav toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const i18n = {
        EN: {
            'nav.home': 'Home',
            'nav.workers': 'Workers',
            'nav.employers': 'Employers',
            'nav.about': 'About Us',
            'hero.title': 'Find Reliable Workers in Sri Lanka',
            'hero.subtitle': 'Verified and skilled workers for your next project.'
        },
        SI: {
            'nav.home': 'මුල් පිටුව',
            'nav.workers': 'සේවකයින්',
            'nav.employers': 'සේවා යෝජකයින්',
            'nav.about': 'අප ගැන',
            'hero.title': 'ශ්‍රී ලංකාවේ විශ්වාසදායක සේවකයින් සොයන්න',
            'hero.subtitle': 'ඔබේ මීළඟ ව්‍යාපෘතිය සඳහා කුසලතා පිරි සේවකයින්.'
        },
        TA: {
            'nav.home': 'முகப்பு',
            'nav.workers': 'தொழிலாளர்கள்',
            'nav.employers': 'முதலாளிகள்',
            'nav.about': 'எங்களை பற்றி',
            'hero.title': 'இலங்கையில் நம்பகமான தொழிலாளர்களைக் கண்டறியுங்கள்',
            'hero.subtitle': 'உங்கள் அடுத்த திட்டத்திற்கான திறமையான தொழிலாளர்கள்.'
        }
    };

    let currentLang = localStorage.getItem('workbee_lang') || 'EN';
    
    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                el.textContent = i18n[lang][key];
            }
        });
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('workbee_lang', lang);
        
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        applyTranslations(lang);
        window.dispatchEvent(new Event('langChange'));
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    setLanguage(currentLang);

    // Animated counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                let current = 0;
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Easing out function
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    current = Math.floor(target * easeOut);
                    entry.target.textContent = current + '+';

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target + '+';
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => counterObserver.observe(num));

    // Scroll animations
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => scrollObserver.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
});
