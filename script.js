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

/* Navbar ao rolar */
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* Menu mobile (hamburger) */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', String(mobileMenu.classList.contains('active')));
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('ri-menu-3-line');
        icon.classList.toggle('ri-close-line');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('ri-menu-3-line');
            icon.classList.remove('ri-close-line');
        });
    });
}

