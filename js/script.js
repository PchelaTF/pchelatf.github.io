"use strict";

const menuLink = document.querySelectorAll('.header__menu-link[data-goto]'),
    menuLinkFooter = document.querySelectorAll('.footer__nav-item[data-goto]'),
    mainBtn = document.querySelector('.main__screen-button'),
    insertBtn = document.querySelector('.insert__button'),
    slidersHelp = document.querySelectorAll('.help__body-slider'),
    date = document.querySelectorAll('.slider__column-date'),
    sliderReport = document.querySelector('.slider__body'),
    blockHelp = document.querySelectorAll('.help__body-item'),
    btnMore = document.querySelector('.btn-more'),
    btnLess = document.querySelector('.btn-less');
let currIndex = 0;

// плавный скролл к блокам
function onMenuClick(e) {
    const menuLink = e.target;

    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto),
            gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

        window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
        });

        e.preventDefault();
    }
}

menuLink.forEach(link => link.addEventListener('click', onMenuClick));
menuLinkFooter.forEach(link => link.addEventListener('click', onMenuClick));
mainBtn.addEventListener('click', onMenuClick);
insertBtn.addEventListener('click', onMenuClick);

// Слайдерs блока help
initSlider(slidersHelp);

function initSlider(arr) {
    arr.forEach(slider => {
        new Swiper(slider, {
            // Optional parameters
            // loop: true,

            // If we need pagination
            pagination: {
                // el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev'),
            },

            // And if we need scrollbar
            scrollbar: {
                // el: '.swiper-scrollbar',
            },

            spaceBetween: 10,
        });
    });
}

// slider block repost
function initSliderReportz(el) {

    new Swiper(el, {
        // Optional parameters
        // loop: true,
        slidesPerView: 3,
        slidesPerGroup: 1,

        // If we need pagination
        pagination: {
            // el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            // el: '.swiper-scrollbar',
        },

        spaceBetween: 60,
        // centeredSlides: true
        // setWrapperSize: 1756,
        centerInsufficientSlides: true,
        slidesOffsetBefore: 46,
    });

}

initSliderReportz(sliderReport);

// добавление декора
function addDecor(arr) {
    arr.forEach((item, i) => {
        if (i % 2) {
            item.classList.add('decor-text-yellow');
        } else {
            item.classList.add('decor-text-blue');
        }
    });
}

addDecor(date);

// hide content in section.help and addEvent on button More and Less
function hide() {
    for (let i = 3; i < blockHelp.length; i++) {
        blockHelp[i].style.display = 'none';
        blockHelp[i].classList.add('hide');
    }

    btnLess.style.display = 'none';
}

hide();

btnMore.addEventListener('click', () => {
    const block = [...document.querySelectorAll('.hide')];

    for (let i = currIndex; i < currIndex + 3; i++) {
        if (block[i]) {
            block[i].style.display = 'flex';
            block[i].classList.remove('hide');
        }
    }

    currIndex = 0;

    btnLess.style.display = 'block';
});

btnLess.addEventListener('click', () => {
    const block = [...document.querySelectorAll('.help__body-item')];

    let allIndex = block.length;

    for (let i = allIndex; i >= allIndex - (allIndex - 3); i--) {
        if (block[i]) {
            block[i].style.display = 'none';
            block[i].classList.add('hide');
        }
    }

    btnLess.style.display = 'none';
});


const menu = document.querySelector('.menu');

menu.addEventListener('click', (e) => {
    const menuList = document.querySelector('.header__menu-list'),
        body = document.querySelector('body');

    menuList.classList.toggle('menu-open');
    menu.classList.toggle('menu-open');
    body.classList.toggle('_lock');
    document.querySelectorAll('.header__menu-item').forEach(item => item.classList.toggle('menu-open'));
});

document.querySelectorAll('.header__menu-link').forEach(item => item.addEventListener('click', () => {
    const menuList = document.querySelector('.header__menu-list'),
        body = document.querySelector('body');

    menuList.classList.remove('menu-open');
    body.classList.remove('_lock');
    document.querySelectorAll('.header__menu-item').forEach(item => item.classList.remove('menu-open'));
}));


// для разворота блоков. пусть полежит
// reverse
// const helpBodyItem = document.querySelectorAll('.help__body-item');

// helpBodyItem.forEach((item, i) => {
//     if (i % 2) {
//         item.classList.add('reverse')
//     }
// });


// ===========================================================================================================
// для определения это тачскрин или пк
/*
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    ios: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};
*/