/**
 * Testimonials Carousel Plugin JavaScript
 * Handles initialization and configuration of Swiper.js for testimonials
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all testimonials swipers
  const testimonialSwipers = document.querySelectorAll('.testimonials-swiper');
  
  testimonialSwipers.forEach(function(swiperElement) {
    // Get configuration from data attributes
    const config = {
      loop: swiperElement.dataset.loop === 'true',
      autoplay: swiperElement.dataset.autoplay === 'true',
      autoplayDelay: parseInt(swiperElement.dataset.autoplayDelay) || 5000,
      showNavigation: swiperElement.dataset.showNavigation === 'true',
      showPagination: swiperElement.dataset.showPagination === 'true',
      mobileView: parseInt(swiperElement.dataset.mobileView) || 1,
      tabletView: parseInt(swiperElement.dataset.tabletView) || 2,
      desktopView: parseInt(swiperElement.dataset.desktopView) || 3
    };
    
    // Initialize Swiper with configuration
    const _swiper = new Swiper(swiperElement, {
      loop: config.loop,
      autoplay: config.autoplay ? {
        delay: config.autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      } : false,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: config.showNavigation ? {
        nextEl: '.testimonials-next',
        prevEl: '.testimonials-prev',
      } : false,
      pagination: config.showPagination ? {
        el: '.testimonials-pagination',
        clickable: true,
      } : false,
      breakpoints: {
        576: {
          slidesPerView: config.mobileView,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: config.tabletView,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: config.desktopView,
          spaceBetween: 30,
        }
      },
      // Fade effect for slides
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
    });
  });
});

