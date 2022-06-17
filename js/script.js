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
    menu.classList.remove('menu-open');
}));


// Спойлеры 

const spollersArray = document.querySelectorAll('[data-spollers]');

// Получение обычных слойлеров
const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(",")[0];
});
// Инициализация обычных слойлеров
if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
}


const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(",")[0];
});

// Инициализация слойлеров с медиа запросами
if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
        const params = item.dataset.spollers;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    let mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);

        // Объекты с нужными условиями
        const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
                return true;
            }
        });
        // Событие
        matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia);
    });
}

// Инициализация
function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener("click", setSpollerAction);
        } else {
            spollersBlock.classList.remove('_init');
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
        }
    });
}
// Работа с контентом
function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
        spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
                spollerTitle.removeAttribute('tabindex');
                if (!spollerTitle.classList.contains('_active')) {
                    spollerTitle.nextElementSibling.hidden = true;
                }
            } else {
                spollerTitle.setAttribute('tabindex', '-1');
                spollerTitle.nextElementSibling.hidden = false;
            }
        });
    }
}
function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
        const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
        if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, 500);

            const arrows = el.querySelectorAll('.arrow');
            arrows.forEach(arrow => arrow.classList.toggle('_active'));
        }
        e.preventDefault();
    }
}
function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active');
        _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
}

const arrows = document.querySelectorAll('.arrow');
for (const arrow of arrows) {
    arrow.addEventListener('click', setSpollerAction);
}
// =========================================================================

//SlideToggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}

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