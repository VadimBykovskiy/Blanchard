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
    prevEl: ".section-gallery__prev",
    disabledClass: "nav-btn-disabled"
  },

  breakpoints: {
    441: {
      slidesPerView: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 30
    },

    1280: {
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

/*tooltip*/

tippy('.js-tooltip', {
  theme: 'purple'
});

/* partners */

var publicationSwiper = new Swiper(".js-projects-slider", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },

  spaceBetween: 20,
  pagination: {
    el: ".section-projects .section-projects__test-pagination",
    type: "fraction"
  },

  navigation: {
    nextEl: '.section-projects__nav-btn-next',
    prevEl: '.section-projects__nav-btn-prev',
    disabledClass: "nav-btn-disabled"
  },

  breakpoints: {
    611: {
      slidesPerView: 2,
      spaceBetween: 34
    },

    971: {
      slidesPerView: 2,
      spaceBetween: 50
    },

    1281: {
      slidesPerView: 3,
      spaceBetween: 50
    }
  }
})

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


