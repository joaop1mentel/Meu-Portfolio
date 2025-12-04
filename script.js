function mostrarConteudo() {
    const conteudo = document.getElementById('conteudo');
    const avatar = document.getElementById('avatar');

    avatar.classList.remove('floating');
    avatar.classList.add('animate-pulse');
}

/* ---------------------------------------------------
    SISTEMA DE SLIDES DAS SECTIONS
---------------------------------------------------- */

window.onload = function () {
    const sheets = document.querySelectorAll(".sheet");
    const prevBtn = document.getElementById("btn-prev");
    const nextBtn = document.getElementById("btn-next");
    let currentIndex = 0;

    function showSheet(index) {
        sheets.forEach((sheet, i) => {
            sheet.classList.toggle("active", i === index);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + sheets.length) % sheets.length;
        showSheet(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % sheets.length;
        showSheet(currentIndex);
    });

    showSheet(currentIndex);
};

/* Rolagem suave ao clicar em âncora */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

/* ---------------------------------------------------
    SLIDER DOS PROJETOS
---------------------------------------------------- */

const slides = document.querySelectorAll('.slide');
let currentSlideIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('hidden', i !== index);
    });
}

document.getElementById('btn-prev').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
});

document.getElementById('btn-next').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
});

showSlide(currentSlideIndex);

/* ---------------------------------------------------
    ANIMAÇÃO DAS BARRAS DE HABILIDADES
---------------------------------------------------- */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }
    });
}, { threshold: 0.5 });

const habilidadesSection = document.getElementById('habilidades');
if (habilidadesSection) observer.observe(habilidadesSection);

/* Navbar ao rolar */
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-lg', 'bg-blue-950/90');
    } else {
        navbar.classList.remove('shadow-lg', 'bg-blue-950/90');
    }
});

/* ---------------------------------------------------
    SWIPER
---------------------------------------------------- */

const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 3 },
    },
    grabCursor: true,
});

/* ---------------------------------------------------
      CARROSSEL 3D DE HABILIDADES
---------------------------------------------------- */

const ring = document.getElementById("ring");
const cards3D = document.querySelectorAll(".skill-card-3d");

const total = cards3D.length;
const angleStep = 360 / total;
const radius = window.innerWidth < 600 ? 180 : 270;

cards3D.forEach((card, i) => {
    const angle = i * angleStep;
    const rad = angle * (Math.PI / 180);

    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad) * radius;

    card.style.transform = `
        translate(-50%, -50%)
        translateX(${x}px)
        translateZ(${z}px)
        rotateY(${angle}deg)
    `;
});

/* Controle do giro */
let rotation = 0;
let isDragging = false;
let startX = 0;
let autoRotate = true;

/* -----------------------------
      SUPORTE PARA MOUSE
------------------------------ */

ring.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    autoRotate = false;
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        setTimeout(() => autoRotate = true, 800);
    }
    isDragging = false;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;
    startX = e.clientX;

    rotation += delta * 0.6;

    ring.style.transform = `
        translate(-50%, -50%)
        rotateY(${rotation}deg)
    `;

    updateDepth();
});

/* ----------------------------------------
      SUPORTE PARA CELULAR / TOUCH
----------------------------------------- */

ring.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    autoRotate = false;
});

ring.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const delta = currentX - startX;
    startX = currentX;

    rotation += delta * 0.6;

    ring.style.transform = `
        translate(-50%, -50%)
        rotateY(${rotation}deg)
    `;

    updateDepth();
});

ring.addEventListener("touchend", () => {
    isDragging = false;
    setTimeout(() => autoRotate = true, 800);
});

/* ----------------------------------------
      ANIMAÇÃO AUTOMÁTICA DO CARROSSEL
----------------------------------------- */

function animate() {
    if (autoRotate && !isDragging) {
        rotation += 0.25;
        ring.style.transform = `
            translate(-50%, -50%)
            rotateY(${rotation}deg)
        `;
        updateDepth();
    }

    requestAnimationFrame(animate);
}

animate();

/* Atualiza card da frente / trás */
function updateDepth() {
    const center = ring.getBoundingClientRect().left + ring.offsetWidth / 2;

    cards3D.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - center);

        card.classList.remove("front", "back");

        if (distance < 110) card.classList.add("front");
        else if (distance > 240) card.classList.add("back");
    });
}

updateDepth();
