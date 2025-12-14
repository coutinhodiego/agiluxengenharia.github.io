// ===== NAVIGATION MENU =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== HEADER SHADOW ON SCROLL =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== SCROLL TO TOP BUTTON =====
const scrollTop = document.getElementById('scroll-top');

function toggleScrollTop() {
    if (scrollTop) {
        if (window.scrollY >= 400) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    }
}

window.addEventListener('scroll', toggleScrollTop);

// Adicionar evento de click para o botão
if (scrollTop) {
    scrollTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL FOR ALL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showMessage('Orçamento solicitado com sucesso! Nossa equipe entrará em contato em breve.', 'success');
            contactForm.reset();
        }, 1000);
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form__message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form__message';
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll(
    '.service__card, .portfolio__card, .testimonial__card, .about__content, .contact__content'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat__number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.getElementById('sobre');
    const statsSectionTop = statsSection.offsetTop;
    const statsSectionHeight = statsSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    if (scrollPosition > statsSectionTop + (statsSectionHeight / 2)) {
        statsAnimated = true;

        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = stat.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    stat.textContent = stat.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        });
    }
}

window.addEventListener('scroll', animateStats);

// ===== PRELOADER (OPTIONAL) =====
window.addEventListener('load', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== TESTIMONIALS ROTATION (OPTIONAL) =====
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial__card');

function rotateTestimonials() {
    // This is a placeholder for auto-rotating testimonials
    // Can be implemented with a carousel library or custom code
}

// ===== DYNAMIC YEAR IN FOOTER =====
const footerCopy = document.querySelector('.footer__copy');
if (footerCopy) {
    const currentYear = new Date().getFullYear();
    footerCopy.textContent = footerCopy.textContent.replace('2024', currentYear);
}

// ===== MOUSE PARALLAX EFFECT (OPTIONAL) =====
const heroImage = document.querySelector('.hero__svg');

if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// ===== LAZY LOADING IMAGES (OPTIONAL) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== TYPING EFFECT FOR HERO TITLE (OPTIONAL) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero__title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText);
// }

// ===== HOW WE WORK TIMELINE ANIMATION =====
function animateTimeline() {
    const howWeWorkSection = document.querySelector('.howwework');
    if (!howWeWorkSection) return;

    const timelineProgress = document.querySelector('.timeline__progress');
    const dots = document.querySelectorAll('.timeline__dot');
    const steps = document.querySelectorAll('.step');

    if (!timelineProgress || dots.length === 0 || steps.length === 0) return;

    function updateTimeline() {
        const sectionTop = howWeWorkSection.offsetTop;
        const sectionHeight = howWeWorkSection.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Posições dos dots em relação ao topo da seção
        const firstDotPosition = steps[0].offsetTop;
        const lastDotPosition = steps[steps.length - 1].offsetTop;
        const totalDistance = lastDotPosition - firstDotPosition;

        // Calcula o progresso baseado na posição do scroll
        const triggerPoint = scrollY + windowHeight * 0.7;
        const sectionStart = sectionTop + firstDotPosition;
        
        // Progresso de 0 a 1 entre o primeiro e o último dot
        const progress = Math.max(0, Math.min(1, (triggerPoint - sectionStart) / totalDistance));

        // Atualiza a altura da linha de progresso
        timelineProgress.style.height = `${progress * 100}%`;

        // Ativa os dots e steps progressivamente
        steps.forEach((step, index) => {
            const stepProgress = index / (steps.length - 1);
            const dot = dots[index];
            
            if (progress >= stepProgress) {
                dot.classList.add('active');
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            } else {
                dot.classList.remove('active');
                step.style.opacity = '0';
                step.style.transform = 'translateY(30px)';
            }
        });
    }

    // Inicializa os steps com opacidade 0
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Atualiza no scroll
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    updateTimeline(); // Executa uma vez no carregamento
}

// Inicializa a animação da timeline
animateTimeline();

console.log('☀️ Agilux Energia Solar - Website carregado com sucesso!');
