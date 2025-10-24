# Services Overview Component

This directory contains multiple implementations of a responsive Services Overview component for the Global Ace Technology Inc website.

## Component Files

1. `services_overview_component.html` - Standalone component with placeholder data
2. `services_overview_streamfield.html` - Dynamic component for Wagtail StreamField integration
3. `services_overview_reusable.html` - Reusable Django template component

## Features

- Responsive grid layout (3-column on desktop, 2-column on tablet, 1-column on mobile)
- Hover effects (shadow + slight lift animation)
- Support for both image and SVG icons
- Compatible with Bootstrap 5
- Accessible and semantic HTML

## Usage

### 1. Standalone Component (`services_overview_component.html`)

Simply include this template in your HTML. It includes placeholder data for demonstration purposes.

### 2. Wagtail StreamField Integration (`services_overview_streamfield.html`)

Include this template in your Wagtail page templates. It expects a `page.services_overview` StreamField with the following structure:

```python
class ServiceBlock(blocks.StructBlock):
    icon = ImageChooserBlock(required=False)
    title = blocks.CharBlock(required=True, max_length=50)
    description = blocks.TextBlock(required=True, max_length=200)
    link = blocks.PageChooserBlock(required=False)
```

### 3. Reusable Django Template (`services_overview_reusable.html`)

Include this template with context data:

```django
{% include "home/services_overview_reusable.html" with 
   services_data=services_list 
   section_title="Our Services" 
   section_description="Discover our solutions"
   show_view_all_button=True
   view_all_link="/services/"
   view_all_text="View All Services"
%}
```

Context variables:
- `services_data`: List of service objects with `title`, `description`, `link`, and optional `icon` or `icon_svg`
- `section_title`: Optional title for the section (defaults to "Our Services")
- `section_description`: Optional description (defaults to standard text)
- `show_view_all_button`: Boolean to show/hide the "View All" button
- `view_all_link`: URL for the "View All" button
- `view_all_text`: Text for the "View All" button

## Customization

All components use Bootstrap 5 classes and include embedded CSS. You can customize the styling by modifying the CSS in the `<style>` tags or by overriding classes in your main stylesheet.

## Hover Effects

The components include the following hover effects:
1. Cards lift up by 10px
2. Cards gain a deeper shadow
3. Icons scale up slightly
4. Buttons lift up and gain shadow

These effects are implemented with CSS transitions for smooth animations.