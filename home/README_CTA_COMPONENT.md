# Call-To-Action (CTA) Component

This component creates a visually striking call-to-action section for the homepage footer with a dark background gradient, white text, and interactive elements.

## Features

- Centered text layout with title, description, and CTA button
- Dark background gradient with white text for high contrast
- Glowing button hover effect with animated shine
- Slight upward parallax background animation
- Fully responsive design
- Accessible design with proper contrast and focus states
- Works with Wagtail StreamField and static data

## Files

1. `templates/home/cta_component.html` - Static component implementation
2. `templates/home/cta_reusable.html` - Dynamic component that works with Wagtail data
3. `templates/home/cta_streamfield.html` - StreamField integration for Wagtail pages

## Usage

### Static Implementation

Include the component in your template:

```django
{% include "home/cta_component.html" %}
```

### Dynamic Implementation (with Wagtail data)

Pass the CTA data to the template context:

```python
# In your view or page model
context['cta_title'] = "Ready to Transform Your Business?"
context['cta_description'] = "Contact us today to discover how our innovative solutions can drive your success."
context['cta_button_text'] = "Contact Us Today"
context['cta_link'] = "/contact"
```

Then include the reusable component:

```django
{% include "home/cta_reusable.html" with 
    cta_title="Ready to Transform Your Business?"
    cta_description="Contact us today to discover how our innovative solutions can drive your success."
    cta_button_text="Contact Us Today"
    cta_link="/contact"
%}
```

### StreamField Implementation

In your Wagtail page model, ensure you have a call_to_action StreamField:

```python
# In your HomePage model
call_to_action = StreamField([
    ('cta', CTABlock()),
], use_json_field=True, blank=True)
```

Then in your page template:

```django
{% include "home/cta_streamfield.html" %}
```

## Customization

### Changing Content

Modify the text content directly in the template or pass custom values to the reusable component.

### Styling

The component uses the project's SCSS variables:
- Primary color: `$primary-color` (#0B3D91)
- Background gradient: 135deg from primary to darkened primary
- Text color: White (#FFFFFF)

### Animation Settings

Adjust the parallax animation in the CSS:
- `animation`: Parallax timing and movement
- `transform`: Position effects

## Dependencies

- Bootstrap 5 (for utility classes)
- CSS3 (for animations and gradients)

## Responsive Behavior

- Mobile (≤576px): Reduced padding and font sizes
- Tablet (576px-768px): Medium padding and font sizes
- Desktop (≥768px): Full padding and font sizes

## Accessibility

- Proper contrast ratios for text (white on dark background)
- Focus states for interactive elements
- Semantic HTML structure
- Sufficient button size for touch targets