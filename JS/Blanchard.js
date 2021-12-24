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
  btnClassName: "main__item-btn",
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

setMenuListener();

const element = document.querySelector('select');
const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: ''
});



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



tippy('.js-tooltip', {
  theme: 'purple'
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
