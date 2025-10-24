/**
 * CTA Banner Plugin JavaScript
 * Handles initialization and animation for CTA banners
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add any CTA banner specific JavaScript functionality here
  
  // Example: Add animation classes when CTA banners come into view
  const ctaBanners = document.querySelectorAll('.cta-banner-section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cta-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  ctaBanners.forEach(banner => {
    observer.observe(banner);
  });
  
  // Add smooth scrolling for CTA buttons that link to anchors on the same page
  const ctaButtons = document.querySelectorAll('.cta-button[href^="#"]');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed headers if needed
            behavior: 'smooth'
          });
        }
      }
    });
  });
});