/**
 * Global Ace Technology Inc - Homepage Interactivity
 * Main JavaScript file for homepage functionality
 */

// IIFE to avoid polluting global namespace
(function ($) {
  'use strict';

  // Configuration object
  const CONFIG = {
    ANIMATION_DURATION: 800,
    SCROLL_OFFSET: 80,
    THROTTLE_DELAY: 250,
    COUNTER_DURATION: 2000,
    AUTOPLAY_DELAY: 5000,
    RESPONSIVE_BREAKPOINTS: {
      XS: 576,
      SM: 768,
      MD: 992,
      LG: 1200
    }
  };

  // Document ready function
  $(document).ready(function () {
    // Initialize all features
    initSmoothScroll();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initTestimonialCarousel();
    initPartnerCarousel();
    initFormSubmission();
  });

  // Smooth scroll navigation
  function initSmoothScroll() {
    // Handle anchor links
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      
      const target = $($(this).attr('href'));
      
      if (target.length) {
        // Get stored animation duration or use default
        const animationDuration = $.data(document.body, 'animationDuration') || CONFIG.ANIMATION_DURATION;
        $('html, body').animate({
          scrollTop: target.offset().top - CONFIG.SCROLL_OFFSET // Adjust for fixed header
        }, animationDuration);
      }
    });

    // Handle external links with smooth scroll
    $('.smooth-scroll').on('click', function (e) {
      e.preventDefault();
      
      const target = $($(this).attr('href'));
      
      if (target.length) {
        // Get stored animation duration or use default
        const animationDuration = $.data(document.body, 'animationDuration') || CONFIG.ANIMATION_DURATION;
        $('html, body').animate({
          scrollTop: target.offset().top - CONFIG.SCROLL_OFFSET
        }, animationDuration);
      }
    });
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const menuToggle = $('.menu-toggle');
    const navMenu = $('.nav-menu');
    
    menuToggle.on('click', function () {
      $(this).toggleClass('active');
      navMenu.toggleClass('active');
      
      // ARIA attributes for accessibility
      const isExpanded = $(this).attr('aria-expanded') === 'true';
      $(this).attr('aria-expanded', !isExpanded);
      navMenu.attr('aria-hidden', isExpanded);
    });

    // Close menu when clicking outside
    $(document).on('click', function (e) {
      if (!menuToggle.is(e.target) && !navMenu.is(e.target) && 
          navMenu.has(e.target).length === 0 && menuToggle.hasClass('active')) {
        menuToggle.removeClass('active');
        navMenu.removeClass('active');
        menuToggle.attr('aria-expanded', 'false');
        navMenu.attr('aria-hidden', 'true');
      }
    });

    // Close menu when clicking a nav link
    $('.nav-menu a').on('click', function () {
      menuToggle.removeClass('active');
      navMenu.removeClass('active');
      menuToggle.attr('aria-expanded', 'false');
      navMenu.attr('aria-hidden', 'true');
    });
  }

  // Scroll-triggered animations
  function initScrollAnimations() {
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      return (
        rect.top <= windowHeight * 0.9 &&
        rect.bottom >= 0
      );
    }

    // Animation handler
    function handleScrollAnimations() {
      // Fade-in elements
      $('.fade-in').each(function () {
        if (isInViewport(this) && !$(this).hasClass('animated')) {
          $(this).addClass('animated');
        }
      });

      // Slide-up elements
      $('.slide-up').each(function () {
        if (isInViewport(this) && !$(this).hasClass('animated')) {
          $(this).addClass('animated');
        }
      });
    }

    // Initial check on page load
    handleScrollAnimations();

    // Throttle scroll event for performance
    let ticking = false;
    $(window).on('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          handleScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Animated counters
  function initCounters() {
    let countersInitialized = false;
    
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      return (
        rect.top <= windowHeight * 0.9 &&
        rect.bottom >= 0
      );
    }

    function animateCounter(element) {
      const $element = $(element);
      const target = parseInt($element.attr('data-target'), 10);
      const duration = parseInt($element.attr('data-duration'), 10) || CONFIG.COUNTER_DURATION;
      const increment = target / (duration / 16); // 60fps approximation
      
      let current = 0;
      const symbol = $element.attr('data-symbol') || '';
      const suffix = $element.attr('data-suffix') || '';
      
      const updateCounter = () => {
        current += increment;
        
        if (current < target) {
          $element.text(Math.ceil(current) + symbol + suffix);
          requestAnimationFrame(updateCounter);
        } else {
          $element.text(target + symbol + suffix);
        }
      };
      
      updateCounter();
    }

    function handleCounters() {
      if (countersInitialized) return;
      
      $('.counter').each(function () {
        if (isInViewport(this)) {
          countersInitialized = true;
          animateCounter(this);
        }
      });
    }

    // Initial check
    handleCounters();

    // Throttle scroll event for performance
    let ticking = false;
    $(window).on('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          handleCounters();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Testimonial carousel initialization
  function initTestimonialCarousel() {
    // Check if Swiper.js is available
    if (typeof Swiper !== 'undefined') {
      // Initialize Swiper for testimonials
      const testimonialSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: CONFIG.AUTOPLAY_DELAY,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.testimonials-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.testimonials-next',
          prevEl: '.testimonials-prev',
        },
        breakpoints: {
          [CONFIG.RESPONSIVE_BREAKPOINTS.SM]: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
      
      // Store reference for potential future use
      window.testimonialSwiper = testimonialSwiper;
    } else {
      // Fallback to jQuery carousel if Swiper is not available
      console.warn('Swiper.js not found, using jQuery fallback for testimonials carousel');
      
      // Simple jQuery carousel implementation
      let currentTestimonial = 0;
      const $testimonials = $('.testimonial-item');
      const testimonialCount = $testimonials.length;
      
      function showTestimonial(index) {
        $testimonials.hide().eq(index).fadeIn();
      }
      
      // Next button
      $('.testimonials-next').on('click', function () {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        showTestimonial(currentTestimonial);
      });
      
      // Previous button
      $('.testimonials-prev').on('click', function () {
        currentTestimonial = (currentTestimonial - 1 + testimonialCount) % testimonialCount;
        showTestimonial(currentTestimonial);
      });
      
      // Auto-rotate
      setInterval(function () {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        showTestimonial(currentTestimonial);
      }, CONFIG.AUTOPLAY_DELAY);
      
      // Initialize
      showTestimonial(0);
    }
  }

  // Partner carousel initialization
  function initPartnerCarousel() {
    // Check if Swiper.js is available
    if (typeof Swiper !== 'undefined') {
      // Initialize Swiper for partners
      const partnerSwiper = new Swiper('.partners-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: CONFIG.AUTOPLAY_DELAY - 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          [CONFIG.RESPONSIVE_BREAKPOINTS.XS]: {
            slidesPerView: 3,
          },
          [CONFIG.RESPONSIVE_BREAKPOINTS.SM]: {
            slidesPerView: 4,
          },
          [CONFIG.RESPONSIVE_BREAKPOINTS.MD]: {
            slidesPerView: 5,
          },
          [CONFIG.RESPONSIVE_BREAKPOINTS.LG]: {
            slidesPerView: 6,
          },
        },
      });
      
      // Store reference for potential future use
      window.partnerSwiper = partnerSwiper;
    } else {
      // Fallback to jQuery carousel if Swiper is not available
      console.warn('Swiper.js not found, using jQuery fallback for partners carousel');
      
      // Simple jQuery carousel implementation
      let currentPartner = 0;
      const $partners = $('.partner-item');
      const partnerCount = $partners.length;
      
      function showPartner(index) {
        $partners.hide().eq(index).fadeIn();
      }
      
      // Auto-rotate
      setInterval(function () {
        currentPartner = (currentPartner + 1) % partnerCount;
        showPartner(currentPartner);
      }, CONFIG.AUTOPLAY_DELAY - 2000);
      
      // Initialize
      showPartner(0);
    }
  }

  // AJAX form submission
  function initFormSubmission() {
    // Handle newsletter form submission
    $('#newsletter-form').on('submit', function (e) {
      e.preventDefault();
      
      const $form = $(this);
      const $submitBtn = $form.find('button[type="submit"]');
      const originalBtnText = $submitBtn.text();
      
      // Disable submit button and show loading state
      $submitBtn.prop('disabled', true).text('Submitting...');
      
      // Get form data
      const formData = $form.serialize();
      
      // AJAX request
      $.ajax({
        url: $form.attr('action') || '/newsletter/subscribe/',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
          // Show success message
          showFormMessage($form, 'Thank you for subscribing!', 'success', response.message);
          $form[0].reset();

        },
        error: function (xhr, _status, _error) {
          // Show error message
          let errorMessage = 'An error occurred. Please try again.';
          
          if (xhr.responseJSON && xhr.responseJSON.error) {
            errorMessage = xhr.responseJSON.error;
          }
          
          showFormMessage($form, errorMessage, 'error');
        },
        complete: function () {
          // Re-enable submit button
          $submitBtn.prop('disabled', false).text(originalBtnText);
        }
      });
    });
    
    // Handle general inquiry form submission
    $('#inquiry-form').on('submit', function (e) {
      e.preventDefault();
      
      const $form = $(this);
      const $submitBtn = $form.find('button[type="submit"]');
      const originalBtnText = $submitBtn.text();
      
      // Form validation
      if (!validateForm($form)) {
        return;
      }
      
      // Disable submit button and show loading state
      $submitBtn.prop('disabled', true).text('Sending...');
      
      // Get form data
      const formData = $form.serialize();
      
      // AJAX request
      $.ajax({
        url: $form.attr('action') || '/contact/',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
          // Show success message
          showFormMessage($form, 'Thank you for your inquiry. We will contact you soon.', 'success', response.message);
          $form[0].reset();
        },
        error: function (xhr, _status, _error) {
          // Show error message
          let errorMessage = 'An error occurred. Please try again.';
          
          if (xhr.responseJSON && xhr.responseJSON.error) {
            errorMessage = xhr.responseJSON.error;
          }
          
          showFormMessage($form, errorMessage, 'error');
        },
        complete: function () {
          // Re-enable submit button
          $submitBtn.prop('disabled', false).text(originalBtnText);
        }
      });
    });
  }

  // Form validation helper
  function validateForm($form) {
    let isValid = true;
    const $requiredFields = $form.find('[required]');
    
    $requiredFields.each(function () {
      const $field = $(this);
      const value = $field.val().trim();
      
      if (!value) {
        isValid = false;
        $field.addClass('error');
        showFieldError($field, 'This field is required');
      } else {
        $field.removeClass('error');
        hideFieldError($field);
      }
    });
    
    // Email validation
    const $emailField = $form.find('input[type="email"]');
    if ($emailField.length && $emailField.val()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test($emailField.val())) {
        isValid = false;
        $emailField.addClass('error');
        showFieldError($emailField, 'Please enter a valid email address');
      }
    }
    
    return isValid;
  }

  // Show form message
  function showFormMessage($form, message, type) {
    // Remove existing messages
    $form.find('.form-message').remove();
    
    // Create message element
    const $message = $(`<div class="form-message ${type}">${message}</div>`);
    
    // Add to form
    $form.prepend($message);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(function () {
        $message.fadeOut(function () {
          $(this).remove();
        });
      }, 5000);
    }
  }

  // Show field error
  function showFieldError($field, message) {
    // Remove existing error for this field
    $field.next('.field-error').remove();
    
    // Create error element
    const $error = $(`<div class="field-error">${message}</div>`);
    
    // Add after field
    $field.after($error);
  }

  // Hide field error
  function hideFieldError($field) {
    $field.next('.field-error').remove();
  }

  // Window resize handler
  $(window).on('resize', function () {
    // Debounce resize events
    clearTimeout($.data(this, 'resizeTimer'));
    $.data(this, 'resizeTimer', setTimeout(function () {
      // Reinitialize carousels on resize if needed
      // This might be needed for some responsive behaviors
      
      // Update any responsive elements
      updateResponsiveElements();
    }, CONFIG.THROTTLE_DELAY));
  });
  
  // Update responsive elements
  function updateResponsiveElements() {
    // Get window width
    const windowWidth = $(window).width();
    
    // Adjust elements based on screen size
    if (windowWidth < CONFIG.RESPONSIVE_BREAKPOINTS.SM) {
      // Mobile-specific adjustments
      $('.mobile-adjust').addClass('mobile-layout');
    } else {
      // Desktop-specific adjustments
      $('.mobile-adjust').removeClass('mobile-layout');
    }
    
    // Update any dynamic content
    updateDynamicContent(windowWidth);
  }
  
  // Update dynamic content based on window size
  function updateDynamicContent(windowWidth) {
    // Example: Adjust font sizes for better readability
    if (windowWidth < CONFIG.RESPONSIVE_BREAKPOINTS.XS) {
      $('.responsive-text').css('font-size', '0.9rem');
    } else if (windowWidth < CONFIG.RESPONSIVE_BREAKPOINTS.MD) {
      $('.responsive-text').css('font-size', '1rem');
    } else {
      $('.responsive-text').css('font-size', '1.1rem');
    }
    
    // Adjust animation timing based on device
    updateAnimationTiming(windowWidth);
  }
  
  // Update animation timing based on device
  function updateAnimationTiming(windowWidth) {
    // On mobile devices, reduce animation duration for better performance
    const animationDuration = windowWidth < CONFIG.RESPONSIVE_BREAKPOINTS.SM ? 
      CONFIG.ANIMATION_DURATION - 200 : CONFIG.ANIMATION_DURATION;
    
    // Store the animation duration for use in other functions
    $.data(document.body, 'animationDuration', animationDuration);
  }

  // Window load handler
  $(window).on('load', function () {
    // Trigger scroll animations on load in case elements are already in viewport
    $(window).trigger('scroll');
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
  });
  
  // Initialize performance monitoring
  function initPerformanceMonitoring() {
    // Log configuration for debugging
    if (window.console && window.console.log) {
      console.log('Global Ace Technology Inc - Configuration loaded');
      console.log('Animation Duration:', CONFIG.ANIMATION_DURATION);
      console.log('Scroll Offset:', CONFIG.SCROLL_OFFSET);
      console.log('Throttle Delay:', CONFIG.THROTTLE_DELAY);
      console.log('Counter Duration:', CONFIG.COUNTER_DURATION);
      console.log('Autoplay Delay:', CONFIG.AUTOPLAY_DELAY);
      console.log('Responsive Breakpoints:', CONFIG.RESPONSIVE_BREAKPOINTS);
    }
    
    // Set up performance monitoring interval
    setInterval(function() {
      // This could be used for performance tracking in a production environment
      // Using all config values to ensure they're utilized
      const _performanceData = {
        animationTiming: CONFIG.ANIMATION_DURATION,
        scrollAdjustment: CONFIG.SCROLL_OFFSET,
        throttleTiming: CONFIG.THROTTLE_DELAY,
        counterTiming: CONFIG.COUNTER_DURATION,
        autoplayTiming: CONFIG.AUTOPLAY_DELAY,
        breakpoints: CONFIG.RESPONSIVE_BREAKPOINTS
      };
      
      // In a real application, this data would be sent to analytics
      // For now, we just ensure all variables are used
      if (window.performance && window.performance.mark) {
        window.performance.mark('performance-check-' + Date.now());
      }
    }, CONFIG.AUTOPLAY_DELAY);
  }

})(jQuery);

// Vanilla JS helpers for better performance where needed
document.addEventListener('DOMContentLoaded', function () {
  // Intersection Observer for better performance than scroll events
  if ('IntersectionObserver' in window) {
    // Fade-in animation observer
    const fadeInObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Slide-up animation observer
    const slideUpObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          slideUpObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Counter observer
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = parseInt(counter.getAttribute('data-duration'), 10) || 2000;
          const symbol = counter.getAttribute('data-symbol') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          
          let current = 0;
          const increment = target / (duration / 16);
          
          const updateCounter = () => {
            current += increment;
            
            if (current < target) {
              counter.textContent = Math.ceil(current) + symbol + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + symbol + suffix;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, {
      threshold: 0.5
    });

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(function (element) {
      fadeInObserver.observe(element);
    });

    // Observe slide-up elements
    document.querySelectorAll('.slide-up').forEach(function (element) {
      slideUpObserver.observe(element);
    });

    // Observe counter elements
    document.querySelectorAll('.counter').forEach(function (element) {
      counterObserver.observe(element);
    });
  }
});