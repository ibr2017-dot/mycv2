// =============================================
// 1. التبديل بين الوضع الداكن والفاتح
// =============================================
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// =============================================
// 2. قائمة التنقل (للشاشات الصغيرة)
// =============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.querySelector('#menuToggle i').className = 'fas fa-bars';
    });
});

// =============================================
// 3. تأثير الكتابة التلقائي (Typing)
// =============================================
const typedText = document.getElementById('typed-text');
const phrases = [
    'معلم حاسب آلي وتكنولوجيا التعليم',
    'أخصائي دعم فني (كمبيوتر وشبكات)',
    'مدرب معتمد ICDL',
    'مصمم مناهج تعليمية',
    'خبير في تكنولوجيا التعليم',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 200;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, typeSpeed);
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
            return;
        }
        setTimeout(typeEffect, typeSpeed / 2);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 400);
});

// =============================================
// 4. إحصائيات متحركة (عدادات)
// =============================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current >= target) {
                stat.textContent = target + '+';
                return;
            }
            stat.textContent = current;
            requestAnimationFrame(updateCounter);
        };
        updateCounter();
    });
}

const aboutSection = document.querySelector('.about');
let statsAnimated = false;

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    },
    { threshold: 0.3 }
);

if (aboutSection) observer.observe(aboutSection);

// =============================================
// 5. أشرطة المهارات (تظهر بالتمرير)
// =============================================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                });
            }
        });
    },
    { threshold: 0.2 }
);

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// =============================================
// 6. نموذج التواصل (إرسال)
// =============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = '❌ الرجاء تعبئة جميع الحقول المطلوبة.';
        formStatus.className = 'form-status error';
        return;
    }

    formStatus.textContent = '⏳ جاري الإرسال...';
    formStatus.className = 'form-status';

    setTimeout(() => {
        formStatus.textContent = '✅ تم إرسال رسالتك بنجاح! سأتواصل معك قريبًا.';
        formStatus.className = 'form-status success';
        contactForm.reset();

        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    }, 1800);
});

// =============================================
// 7. إبراز الرابط النشط في التنقل (أثناء التمرير)
// =============================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function highlightNav() {
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === '#' + current) {
            anchor.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);

// =============================================
// 8. زر العودة للأعلى
// =============================================
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.setAttribute('aria-label', 'العودة للأعلى');
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary);
    color: #fff;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(108, 99, 255, 0.35);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    z-index: 999;
`;
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
        backToTop.style.transform = 'translateY(0)';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
        backToTop.style.transform = 'translateY(20px)';
    }
});

console.log('🚀 موقع إبراهيم الشيخ الديناميكي جاهز!');