'use strict';

/* ===================== */
/*       STICKY NAV      */
/* ===================== */

const sectionHeroEl = document.querySelector('.hero');
const navEl = document.querySelector('.nav');

const observer = new IntersectionObserver(
    function (entries) {
        const entry = entries[0];

        if (!entry.isIntersecting) {
            navEl.classList.add('sticky');
        }
        if (entry.isIntersecting) {
            navEl.classList.remove('sticky');
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: '-700px',
    }
);

observer.observe(sectionHeroEl);

/* ==================== */
/*       ARROW UP       */
/* ==================== */

const arrowUp = document.querySelector('.arrow');

const observeArrow = new IntersectionObserver(
    function (entries) {
        const entry = entries[0];

        if (!entry.isIntersecting) {
            arrowUp.classList.add('arrow-active');
        }
        if (entry.isIntersecting) {
            arrowUp.classList.remove('arrow-active');
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: '-600px',
    }
);

observeArrow.observe(sectionHeroEl);

/* ==================== */
/*       CALL BTN       */
/* ==================== */

const callBtn = document.querySelector('.call');

const observeCallBtn = new IntersectionObserver(
    function (entries) {
        const entry = entries[0];

        if (!entry.isIntersecting) {
            callBtn.classList.add('call-active');
        }
        if (entry.isIntersecting) {
            callBtn.classList.remove('call-active');
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: '-400px',
    }
);

observeCallBtn.observe(sectionHeroEl);

/* ==================== */
/*       LIGHTBOX       */
/* ==================== */

let slideIndex = 1;
showSlide(slideIndex);
const lightbox = document.getElementById('Lightbox');

function openLightbox() {
    lightbox.classList.add('modal-active');
}

function closeLightbox() {
    lightbox.classList.remove('modal-active');
}

window.onkeydown = function (e) {
    if (lightbox.classList.contains('modal-active')) {
        // handling esc button press
        if (e.keyCode === 27) {
            lightbox.classList.remove('modal-active');
        }
        // handling arrow keyboard button press
        if (e.keyCode === 37) {
            changeSlide(-1);
        }
        if (e.keyCode === 39) {
            changeSlide(1);
        }
    }
};

// handling mouse click exit event (when click happens outside slide container)

const modalSlide = document.querySelectorAll('.modal__image-box');
const modalDots = document.querySelector('.modal__previews');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.previous');

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('modal-active');
});

modalSlide.forEach((slide) => {
    slide.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

modalDots.addEventListener('click', (e) => {
    e.stopPropagation();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
});

previousBtn.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 'previous' and 'next' buttons use this function to change slides
// we use showSlide to display the previous or next image by calculating current slideIndex to be 1 step lower or higher
function changeSlide(n) {
    showSlide((slideIndex += n));
    // if current slideIndex is 5, and we click 'next' button, calculation will go as following: showSlide((5 = 5 + 1)) which will result in showSlide(6)

    // if we click 'previous' button, calculation will be: showSlide((5 = 5 + (-1))) which will result in showSlide(4)
}

// when image in gallery is clicked, modal will be opened and will display the higher resolution image of image that was clicked
// we use showSlide to display the clicked image by setting current slideIndex to n of the clicked image
function toSlide(n) {
    showSlide((slideIndex = n));
}

function showSlide(n) {
    const slides = document.getElementsByClassName('modal__image-box');
    let modalImages = document.getElementsByClassName('modal__image');

    let modalPreviews = document.getElementsByClassName('modal__preview');

    // if current slide n(umber) is greater than slide array length (9), set slide index back to 1
    if (n > slides.length) {
        slideIndex = 1;
    }

    // if current slide n(umber) is lesser than 1, set slide index to slide array length (in this case 9, so on the end of the array)
    if (n < 1) {
        slideIndex = slides.length;
    }

    // making all slides dissapear
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    // setting current modal image as 'active'
    for (let i = 0; i < modalImages.length; i++) {
        modalImages[i].className = modalImages[i].className.replace(
            ' active',
            ''
        );
    }

    // display the current image
    slides[slideIndex - 1].style.display = 'block';
    // adding 'active' class to the current image
    modalImages[slideIndex - 1].className += ' active';

    // setting current preview opacity to 1
    for (let i = 0; i < modalPreviews.length; i++) {
        modalPreviews[i].className = modalPreviews[i].className.replace(
            ' active-preview',
            ''
        );
    }

    // adding 'active-preview' class to current preview
    modalPreviews[slideIndex - 1].className += ' active-preview';
}

/* =============== */
/*       FAQ       */
/* =============== */

document.querySelectorAll('.accordion__item').forEach((acc, index) => {
    acc.addEventListener('click', () => {
        acc.classList.toggle('acc-open');
    });
});

/* ====================== */
/*       MOBILE NAV       */
/* ====================== */

const headerEl = document.querySelector('.header');
const mobileBtn = document.querySelector('.mobile__btn');
const navLogo = document.querySelector('.logo-img');
const navItems = document.querySelectorAll('.nav__item');

mobileBtn.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
});

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        headerEl.classList.remove('nav-open');
    });
});

navLogo.addEventListener('click', () => {
    headerEl.classList.remove('nav-open');
});
