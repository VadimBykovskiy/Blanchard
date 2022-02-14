const swiper = new Swiper('.swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  }
});

const params = {
  btnClassName: "header-bottom__item-btn",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

/* choices */

setMenuListener();

const element = document.querySelector('select');
const choices = new Choices(element, {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: '',
      position: 'bottom',


  classNames: {
    containerOuter: 'filter-choices gallery__choices',
    containerInner: 'filter-choices__inner',
    input: 'filter-choices__input',
    inputCloned: 'filter-choices__input--cloned',
    list: 'filter-choices__list',
    listItems: 'filter-choices__list--multiple',
    listSingle: 'filter-choices__list--single',
    listDropdown: 'filter-choices__list--dropdown',
    item: 'filter-choices__item',
    itemSelectable: 'filter-choices__item--selectable',
    itemDisabled: 'filter-choices__item--disabled',
    itemChoice: 'filter-choices__item--choice',
    placeholder: 'filter-choices__placeholder',
    group: 'filter-choices__group',
    groupHeading: 'filter-choices__heading',
    button: 'filter-choices__button',
    activeState: 'is-active',
    focusState: 'is-focused',
    openState: 'is-open',
    disabledState: 'is-disabled',
    highlightedState: 'is-highlighted',
    selectedState: 'is-selected',
    flippedState: 'is-flipped',
    loadingState: 'is-loading',
    noResults: 'has-no-results',
    noChoices: 'has-no-choices'
  },
});


 /*gallery*/


let gallerySlider = new Swiper(".slides-container", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },
  spaceBetween: 20,
  pagination: {
    el: ".section-gallery .section-gallery__pagination",
    type: "fraction"
  },
  navigation: {
    nextEl: ".section-gallery__next",
    prevEl: ".section-gallery__prev"
  },

  breakpoints: {
    441: {
      slidesPerView: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 30
    },

    1200: {
      slidesPerView: 3,
      grid: {
        rows: 2
      },
      spaceBetween: 50
    }
  },

  a11y: false,
  keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

  // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
  watchSlidesProgress: true,
  slideVisibleClass: 'slide-visible',

  on: {
    init: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    },
    slideChange: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    }
  }

  // on: {
  //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
  //   beforeResize: function () {
  //     this.slides.forEach((el) => {
  //       el.style.marginTop = "";
  //     });
  //   }
  // }
});

/* catalog */

document.addEventListener('DOMContentLoaded', function () {
  $( ".section-catalog__js-accordion" ).accordion({
      collapsible: true,
      active: 0,
      icons: false,
      heightStyle: 'section-catalog__content'
    });
});


/*developments*/


(() => {
  const MOBILE_WIDTH = 580;
  const DESKTOP_WIDTH = 961;
  const btn = document.querySelector(".section-developments__btn");

  const sliderMobileParams = {
    paginationClassName: "events-pagination",
    cardsContainerName: "section-development__js-slider",
    cardsWrapName: "js-slides-wrap",
    card: "section-developments__item",
    hiddenClass: "is-hidden"
  };

  function getWindowWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function activateMobileSlider(params) {
    const pagination = document.createElement("div");
    pagination.classList.add(params.paginationClassName);
    params.cardsContainer.append(pagination);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: `.${params.cardsContainerName} .${params.paginationClassName}`
      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
        }
      }
    });
  }

  function destroyMobileSlider(params) {
    params.cardsSlider.destroy();
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function setHiddenCards(params, windowWidth) {
    const cards = document.querySelectorAll(`.${params.card}`);
    let quantity = cards.length;

    if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
      quantity = 2;
    }

    if (windowWidth >= DESKTOP_WIDTH) {
      quantity = 3;
    }

    cards.forEach((card, i) => {
      card.classList.remove(params.hiddenClass);
      if (i >= quantity) {
        card.classList.add(params.hiddenClass);
      }
    });
  }

  function showCards(e) {
    const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

    e.target.style = "display: none";

    cards.forEach((card) => {
      card.classList.remove(sliderMobileParams.hiddenClass);
    });
  }

  function checkWindowWidthMobile(params) {
    const currentWidth = getWindowWidth();
    btn.style = "";
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth <= MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
      activateMobileSlider(params);
    } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
      destroyMobileSlider(params);
    }

    setHiddenCards(params, currentWidth);
  }

  checkWindowWidthMobile(sliderMobileParams);
  btn.addEventListener("click", showCards);

  window.addEventListener("resize", function () {
    checkWindowWidthMobile(sliderMobileParams);
  });
})();

/*tooltip*/

tippy('.js-tooltip', {
  theme: 'purple'
});

/*section-projects*/

/* (() => {
  const MOBILE_WIDTH = 580;

  const sliderParamsNotMobile = {
    sliderWrap: "section-projects__js-slider-main",
    cardsContainerName: "section-projects__js-slider",
    cardsWrapName: "section-projects__js-slides-wrap",
    card: "section-projects__slide",
    paginationClassName: "section-projects__test-pagination",
    navClassName: "section-projects__test-navigation",
    navBtnClassName: "section-projects__nav-btn",
    navPrev: "section-projects__test-prev",
    navNext: "section-projects__test-next"
  };

  function getWindowWidth() {
    console.log(document.body.scrollWidth);
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function activateSlider(params) {
    const navigation = document.createElement("div");
    const pagination = document.createElement("div");
    const navBtnPrev = document.createElement("button");
    const navBtnNext = document.createElement("button");

    navigation.classList.add(params.navClassName);

    navBtnPrev.classList.add(params.navBtnClassName);
    navBtnPrev.classList.add(params.navPrev);
    navigation.prepend(navBtnPrev);

    pagination.classList.add(params.paginationClassName);
    navigation.append(pagination);

    navBtnNext.classList.add(params.navBtnClassName);
    navBtnNext.classList.add(params.navNext);
    navigation.append(navBtnNext);

    params.sliderWrapElem.prepend(navigation);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
       breakpoints: {
         581: {
           slidesPerView: 2,
           spaceBetween: 20,
         },
         1200: {
           slidesPerView: 3,
           spaceBetween: 50
         },
       },

      pagination: {
        el: `.${params.sliderWrap} .${params.paginationClassName}`,
        type: "fraction"
      },

      navigation: {
        nextEl: `.${params.navNext}`,
        prevEl: `.${params.navPrev}`
      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
          navigation.remove();
        }
      }
    });
  }

  function destroySlider(params) {
    params.cardsSlider.destroy();
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function checkWindowWidth(params) {
    const currentWidth = getWindowWidth();
    params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth > MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
      activateSlider(params);
    } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
      destroySlider(params);
    }
  }

  checkWindowWidth(sliderParamsNotMobile);

  window.addEventListener("resize", function () {
    checkWindowWidth(sliderParamsNotMobile);
  });
})(); */


var publicationSwiper = new Swiper(".section-projects__js-slider", {
  slidesPerView: 3,
  spaceBetween: 30,

  navigation: {
    nextEl: '.section-projects__nav-btn-next',
    prevEl: '.section-projects__nav-btn-prev',
  }
});

/* form */

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");

im.mask(selector);

new JustValidate('.section-contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 10
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number (phone) && phone.length === 10
      }
    },
  },
  messages: {
    name: {
      required: 'Недопустимый формат'
    },
    tel: {
      required: 'Недопустимый формат'
    },
  },
});


/* map */

ymaps.ready(init);
function init() {
  const mapElem = document.querySelector('#map');
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "200px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" }
    }
  );

  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/mapsbingo.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-20, -40],
    }
  );

  myMap.geoObjects.add(myPlacemark);

  setTimeout(() => {
    myMap.container.fitToViewport();
  }, 5000);
}


/* tabs */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.section-catalog__link').forEach(function(tabslink) {
    tabslink.addEventListener('click', function(event) {
      event.preventDefault();
      const path = event.currentTarget.dataset.path
      console.log(path)
      document.querySelectorAll('.section-catalog__link').forEach(function(tabContent) {
        tabContent.classList.remove('section-catalog__link_active')
       })
      event.target.classList.add('section-catalog__link_active')

      document.querySelectorAll('.section-catalog__card').forEach(function(tabContent) {
        tabContent.classList.remove('section-catalog__card_active')
       })
     document.querySelector(`.section-catalog__card[data-target="${path}"]`).classList.add('section-catalog__card_active')
    })
  })
})


