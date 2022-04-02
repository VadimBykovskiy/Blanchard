var eventsSwiper = new Swiper(".js-events-slider", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },

  spaceBetween:20,
  pagination: {
    el: ".section-events .section-events__test-pagination",
    clickable: true
  },

  navigation: {
    nextEl: '.section-events__nav-btn-next',
    prevEl: '.section-events__nav-btn-prev',
    disabledClass: "nav-btn-disabled"
  },
  breakpoints: {
  611: {
    slidesPerView: 2,
    spaceBetween: 34
  },
    971: {
      slidesPerView: 3,
      spaceBetween: 27
    },

    1281: {
      slidesPerView: 3,
      spaceBetween: 50
    },
  },
});
