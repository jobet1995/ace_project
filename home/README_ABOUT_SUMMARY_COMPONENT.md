# About Summary Component

This directory contains multiple implementations of an About Summary component for the Global Ace Technology Inc website.

## Component Files

1. `about_summary_component.html` - Standalone component with placeholder data
2. `about_summary_streamfield.html` - Dynamic component for Wagtail StreamField integration
3. `about_summary_reusable.html` - Reusable Django template component

## Features

- Two-column layout (text on left, image/pattern on right)
- Subtle scroll animation when entering the viewport
- Minimalistic and corporate design
- Responsive layout (columns stack on mobile)
- Support for both images and background patterns

## Usage

### 1. Standalone Component (`about_summary_component.html`)

Simply include this template in your HTML. It includes placeholder data for demonstration purposes.

### 2. Wagtail StreamField Integration (`about_summary_streamfield.html`)

Include this template in your Wagtail page templates. It expects a `page.about_summary` StreamField with the following structure:

```python
class AboutPreviewBlock(blocks.StructBlock):
    summary_text = blocks.RichTextBlock(required=True)
    image = ImageChooserBlock(required=False)
```

### 3. Reusable Django Template (`about_summary_reusable.html`)

Include this template with context data:

```django
{% include "home/about_summary_reusable.html" with 
   section_title="About Our Company"
   summary_text_plain="We are a leading technology solutions provider..."
   button_text="Learn More About Us"
   button_link="/about/"
   about_image=about_image_object
%}
```

Context variables:
- `section_title`: Optional title for the section (defaults to "About Us")
- `summary_text`: Rich text content (takes precedence over plain text)
- `summary_text_plain`: Plain text summary content
- `additional_text`: Additional paragraph text (used with plain text)
- `button_text`: Text for the "Know More" button (defaults to "Know More")
- `button_link`: URL for the button (defaults to "/about/")
- `about_image`: Wagtail image object for the right column
- `company_name`: Company name for the pattern placeholder
- `tagline`: Tagline for the pattern placeholder

## Scroll Animation

All components include a subtle scroll animation that triggers when the element enters the viewport:
- Elements start with 30px downward offset and 0 opacity
- When scrolled into view, they smoothly transition to their final position
- Animation uses CSS transitions for smooth performance

## Customization

All components use Bootstrap 5 classes and include embedded CSS. You can customize the styling by modifying the CSS in the `<style>` tags or by overriding classes in your main stylesheet.

## Responsive Behavior

- On desktop (lg screens): Two-column layout with text on left and image on right
- On tablet (md screens): Two-column layout with text on left and image on right
- On mobile (sm screens): Single column layout with text on top and image below

The button is centered on mobile devices for better UX.