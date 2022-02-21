var developmentsSwiper = new Swiper(".js-developments-slider", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },

  spaceBetween:20,
  pagination: {
    el: ".section-developments .section-developments__test-pagination",
    type: "fraction"
  },

  navigation: {
    nextEl: '.section-developments__nav-btn-next',
    prevEl: '.section-developments__nav-btn-prev'
  },
  611: {
    slidesPerView: 2,
    spaceBetween: 34
  },

  breakpoints: {
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
