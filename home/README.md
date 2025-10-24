# Global Ace Technology Inc - Homepage Implementation

This directory contains the implementation for the interactive homepage features.

## Files

- `static/js/main.js` - Main JavaScript file with all interactive features
- `static/js/main.min.js` - Minified version of main.js
- `templates/home/home_page_interactive.html` - Example template demonstrating all features

## Features Implemented

### JavaScript Features (main.js)

1. **Smooth Scroll Navigation**
   - Smooth scrolling to anchor links
   - Offset for fixed headers

2. **Scroll-triggered Animations**
   - Fade-in effects
   - Slide-up animations
   - Performance optimized with Intersection Observer

3. **Animated Counters**
   - Incrementing numbers on viewport enter
   - Customizable duration and symbols

4. **Carousel Initialization**
   - Swiper.js implementation for testimonials
   - Swiper.js implementation for partners
   - jQuery fallback if Swiper is not available

5. **Responsive Mobile Menu**
   - Toggle functionality
   - Accessibility features (ARIA attributes)
   - Click outside to close

6. **AJAX Form Submission**
   - Newsletter signup form
   - Contact inquiry form
   - Form validation
   - Error handling

## Usage

### Including in Templates

Add these includes to your base template:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script type="text/javascript" src="{% static 'js/main.js' %}"></script>
```

### HTML Structure

See `home_page_interactive.html` for complete examples of:

- Hero section with smooth scroll links
- Navigation with mobile menu
- Animated content sections
- Stats counters with data attributes
- Swiper carousels with proper structure
- AJAX forms with proper IDs

## Data Attributes

### Counters
```html
<span class="counter" data-target="500" data-symbol="+" data-duration="2000">0+</span>
```

- `data-target`: Final number to count to
- `data-symbol`: Symbol to append (e.g., "+")
- `data-suffix`: Text to append (e.g., "+")
- `data-duration`: Animation duration in milliseconds

### Animations
```html
<div class="fade-in">Content</div>
<div class="slide-up">Content</div>
```

## Performance Features

- Throttled scroll events
- Intersection Observer for better performance
- RequestAnimationFrame for smooth animations
- Efficient DOM queries
- Event delegation where appropriate

## Accessibility

- Proper ARIA attributes for mobile menu
- Focus management
- Reduced motion support
- Semantic HTML structure

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- jQuery 3.6.0
- Swiper.js 8.x
- Vanilla JavaScript features (Intersection Observer, etc.)