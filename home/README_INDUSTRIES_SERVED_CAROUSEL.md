# Industries Served Carousel Component

This component displays industries we serve in a responsive carousel with grayscale icons that switch to color on hover.

## Features

- Responsive carousel using Swiper.js
- Industry icons displayed in grayscale by default
- Icons switch to color on hover
- Auto-rotation with pause on hover
- Navigation arrows and pagination dots
- Responsive design for all screen sizes

## Files

1. `templates/home/industries_served_carousel.html` - Static carousel implementation
2. `templates/home/industries_served_carousel_reusable.html` - Dynamic carousel that works with Wagtail data

## Usage

### Static Implementation

Include the component in your template:

```django
{% include "home/industries_served_carousel.html" %}
```

### Dynamic Implementation (with Wagtail data)

Pass the industries data to the template context:

```python
# In your view or page model
context['industries_data'] = [
    {
        'name': 'Technology',
        'description': 'Cutting-edge solutions for the tech industry',
        'logo_or_icon': technology_image  # Wagtail image object
    },
    # ... more industries
]
```

Then include the reusable component:

```django
{% include "home/industries_served_carousel_reusable.html" with 
    industries_data=industries_data 
    section_title="Our Industries" 
    section_description="We serve clients across various sectors"
%}
```

## Customization

### Changing Industries

Modify the Swiper slides in the template to add/remove industries.

### Styling

The component uses the project's SCSS variables:
- Primary color: `$primary-color` (#0B3D91)
- Background: `$background-color` (#F5F7FA)
- Text colors: `$text-color`, `$light-text`

### Carousel Settings

Adjust the Swiper configuration in the script section:
- `slidesPerView`: Number of visible slides
- `autoplay.delay`: Rotation delay in milliseconds
- `breakpoints`: Responsive settings

## Dependencies

- Bootstrap 5 (for grid and utility classes)
- Swiper.js (for carousel functionality)
- Bootstrap Icons (for default icons)

## Responsive Behavior

- Mobile (≤576px): 2 slides, no navigation arrows
- Tablet (576px-768px): 3 slides
- Desktop (768px-992px): 4 slides
- Large Desktop (≥992px): 6 slides

## Accessibility

- Proper contrast ratios for text
- Focus states for interactive elements
- Semantic HTML structure
- ARIA attributes for carousel navigation