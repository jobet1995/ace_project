# Testimonials Component

This component displays client testimonials in a responsive horizontal slider with fade transitions.

## Features

- Horizontal slider with client photo, feedback text, and name/company
- Previous/next navigation arrows
- Autoplay every 5 seconds with pause on hover
- Subtle fade transitions between testimonials
- Fully accessible with proper ARIA attributes
- Mobile responsive design
- Works with Wagtail StreamField and static data

## Files

1. `templates/home/testimonials_component.html` - Static component implementation
2. `templates/home/testimonials_reusable.html` - Dynamic component that works with Wagtail data
3. `templates/home/testimonials_streamfield.html` - StreamField integration for Wagtail pages

## Usage

### Static Implementation

Include the component in your template:

```django
{% include "home/testimonials_component.html" %}
```

### Dynamic Implementation (with Wagtail data)

Pass the testimonials data to the template context:

```python
# In your view or page model
context['testimonials_data'] = [
    {
        'quote': 'This is an amazing service!',
        'name': 'John Doe',
        'role': 'CEO',
        'company': 'Company Inc.',
        'image': testimonial_image  # Wagtail image object
    },
    # ... more testimonials
]
```

Then include the reusable component:

```django
{% include "home/testimonials_reusable.html" with 
    testimonials_data=testimonials_data 
    section_title="Client Testimonials" 
    section_description="Hear what our clients have to say"
%}
```

### StreamField Implementation

In your Wagtail page model, ensure you have a testimonials_slider StreamField:

```python
# In your HomePage model
testimonials_slider = StreamField([
    ('testimonial', TestimonialBlock()),
], use_json_field=True, blank=True)
```

Then in your page template:

```django
{% include "home/testimonials_streamfield.html" %}
```

## Customization

### Changing Testimonials

Modify the Swiper slides in the template to add/remove testimonials.

### Styling

The component uses the project's SCSS variables:
- Primary color: `$primary-color` (#0B3D91)
- Background: `$background-color` (#F5F7FA)
- Text colors: `$text-color`, `$light-text`

### Slider Settings

Adjust the Swiper configuration in the script section:
- `autoplay.delay`: Rotation delay in milliseconds (default: 5000)
- `slidesPerView`: Number of visible slides
- `breakpoints`: Responsive settings

## Dependencies

- Bootstrap 5 (for grid and utility classes)
- Swiper.js (for carousel functionality)
- Font Awesome (for placeholder icons)

## Responsive Behavior

- Mobile (≤576px): 1 slide, no navigation arrows
- Tablet (576px-768px): 1 slide
- Desktop (768px-992px): 2 slides
- Large Desktop (≥992px): 3 slides

## Accessibility

- Proper contrast ratios for text
- Focus states for interactive elements
- Semantic HTML structure
- ARIA attributes for carousel navigation
- Keyboard navigation support