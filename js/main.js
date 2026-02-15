document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navMenu.classList.remove('active'); // Close menu on click

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(28, 28, 31, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(28, 28, 31, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

/* =========================================
   CINEMATIC HERO LOGIC (TRACK SLIDER)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.hero-nav-item');
    const heroTrack = document.querySelector('.hero-track'); // The sliding container

    // Map targets to indices (0, 1, 2)
    // developer -> 0
    // designer -> 1
    // creator -> 2
    const targetMap = {
        'developer': 0,
        'designer': 1,
        'creator': 2
    };

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Active State UI
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Logic: Move the track
            const targetKey = this.getAttribute('data-target');
            const index = targetMap[targetKey];

            if (index !== undefined && heroTrack) {
                // Translate X by 0%, -33.33%, -66.66%
                const percentage = index * (100 / 3);
                heroTrack.style.transform = `translateX(-${percentage}%)`;
            }

            // Logic: Switch Content
            document.querySelectorAll('.info-content').forEach(content => {
                content.classList.remove('active');
            });
            const activeContent = document.getElementById(`content-${targetKey}`);
            if (activeContent) {
                activeContent.classList.add('active');
            }

            // Logic: Switch Background Text
            const bgText = document.getElementById('hero-bg-text');
            if (bgText) {
                if (targetKey === 'developer') bgText.innerText = 'WEB DEV';
                if (targetKey === 'designer') bgText.innerText = 'DESIGN';
                if (targetKey === 'creator') bgText.innerText = 'CREATE';
            }

            // Logic: Switch Background Theme (Red vs Green)
            const heroSection = document.querySelector('.cinematic-hero');
            if (heroSection) {
                console.log('Switching theme to:', targetKey); // Debug
                heroSection.setAttribute('data-active', targetKey);
            }
        });
    });
});

/* =========================================
   ABOUT ME SLIDESHOW LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const aboutImages = document.querySelectorAll('.about-img');
    const aboutTexts = document.querySelectorAll('.about-text-slide');
    let currentAboutIndex = 0;

    if (aboutImages.length > 0) {
        setInterval(() => {
            // Remove active from current
            aboutImages[currentAboutIndex].classList.remove('active');
            if (aboutTexts[currentAboutIndex]) aboutTexts[currentAboutIndex].classList.remove('active');

            // Move to next
            currentAboutIndex = (currentAboutIndex + 1) % aboutImages.length;

            // Add active to next
            aboutImages[currentAboutIndex].classList.add('active');
            if (aboutTexts[currentAboutIndex]) aboutTexts[currentAboutIndex].classList.add('active');
        }, 10000); // Switch every 10 seconds
    }
});

/* =========================================
   MOBILE HERO AUTO-ROTATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.hero-nav-item');
    let currentHeroIndex = 0;
    let heroInterval;

    function startHeroRotation() {
        // specific check for mobile devices
        if (window.innerWidth <= 768) {
            heroInterval = setInterval(() => {
                // Calculate next index
                currentHeroIndex = (currentHeroIndex + 1) % navItems.length;

                // Trigger click on the next item to use existing transition logic
                if (navItems[currentHeroIndex]) {
                    navItems[currentHeroIndex].click();
                }
            }, 5000); // 5 seconds
        }
    }

    function stopHeroRotation() {
        if (heroInterval) {
            clearInterval(heroInterval);
            heroInterval = null;
        }
    }

    // Start on load if mobile
    if (window.innerWidth <= 768) {
        startHeroRotation();
    }

    // Handle resize events to start/stop rotation
    window.addEventListener('resize', () => {
        stopHeroRotation();
        if (window.innerWidth <= 768) {
            startHeroRotation();
        }
    });

    // Optional: Stop rotation if user manually interacts (clicks)
    navItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            // If the click was triggered by script (e.isTrusted is false), don't stop
            // But item.click() events are not trusted, so we need a way to distinguish
            // Actually, for simplicity, we might just let it run or reset interval.
            // Let's reset the interval on manual interaction to avoid immediate jump
            if (e.isTrusted) {
                stopHeroRotation();
                currentHeroIndex = index; // Update index to clicked item
                // Restart only if still mobile
                if (window.innerWidth <= 768) {
                    startHeroRotation();
                }
            }
        });
    });
});
