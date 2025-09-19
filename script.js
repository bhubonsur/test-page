// Wait for the entire HTML document to be fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTORS ---
    // Selects all necessary elements from the DOM to avoid repeated queries.
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const html = document.documentElement;

    // --- STATE MANAGEMENT ---
    // Sets the initial state for language and theme from localStorage or defaults.
    let currentLang = localStorage.getItem('lang') || 'bn';
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // --- THEME TOGGLE FUNCTIONALITY ---
    const applyTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --- LANGUAGE TOGGLE FUNCTIONALITY ---
    const applyLanguage = (lang) => {
        html.setAttribute('lang', lang);
        langToggle.textContent = lang === 'bn' ? 'EN' : 'BN';
        
        document.querySelectorAll('[data-lang-bn], [data-lang-en]').forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                el.innerHTML = text; 
            }
        });
        
        localStorage.setItem('lang', lang);
        currentLang = lang;
    };

    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'bn' ? 'en' : 'bn';
        applyLanguage(newLang);
    });

    // --- MOBILE MENU FUNCTIONALITY ---
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuIcon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
    });
    
    // --- COMBINED SCROLL EVENT LISTENER ---
    // This single listener handles both auto-hiding the mobile menu and showing the scroll-to-top button.
    window.addEventListener('scroll', () => {
        // Logic to hide mobile menu on scroll
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIcon.className = 'fas fa-bars';
        }

        // Logic for the scroll-to-top button
        if (window.innerWidth < 768) {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        } else {
             scrollToTopBtn.classList.remove('show');
        }
    });

    // --- TESTIMONIAL SLIDER (SWIPERJS) ---
    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // --- SCROLL TO TOP BUTTON CLICK ---
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- INITIALIZATION ---
    // Apply the saved or default theme and language when the page loads.
    applyTheme(currentTheme);
    applyLanguage(currentLang);
});

