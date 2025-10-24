# Industries Served Component

This directory contains multiple implementations of an Industries Served component for the Global Ace Technology Inc website.

## Component Files

1. `industries_served_component.html` - Standalone component with placeholder data
2. `industries_served_streamfield.html` - Dynamic component for Wagtail StreamField integration
3. `industries_served_reusable.html` - Reusable Django template component

## Features

- Responsive grid layout (2 columns on mobile, 3 on tablet, 4 on medium desktop, 6 on large desktop)
- Industry logos displayed in grayscale by default
- Color effect on hover (grayscale to full color transition)
- Support for both image logos and Bootstrap icons
- Hover effects on cards (lift and shadow)
- Clean, minimalistic design

## Usage

### 1. Standalone Component (`industries_served_component.html`)

Simply include this template in your HTML. It includes placeholder data for demonstration purposes with 6 common industries:
- Technology
- Finance
- Healthcare
- Education
- Retail
- Manufacturing

### 2. Wagtail StreamField Integration (`industries_served_streamfield.html`)

Include this template in your Wagtail page templates. It expects a `page.industries_served` StreamField with the following structure:

```python
class IndustryBlock(blocks.StructBlock):
    name = blocks.CharBlock(required=True, max_length=100)
    logo_or_icon = ImageChooserBlock(required=False)
    description = blocks.TextBlock(required=False, max_length=200)
```

### 3. Reusable Django Template (`industries_served_reusable.html`)

Include this template with context data:

```django
{% include "home/industries_served_reusable.html" with 
   industries_data=industries_list 
   section_title="Industries We Serve" 
   section_description="Our expertise spans across multiple sectors"
%}
```

Context variables:
- `industries_data`: List of industry objects with `name`, `description`, and optional `logo_or_icon` or `icon_svg`
- `section_title`: Optional title for the section (defaults to "Industries We Serve")
- `section_description`: Optional description (defaults to standard text)

## Grayscale-to-Color Effect

All components implement the requested grayscale-to-color hover effect:
- Logos are displayed in grayscale by default using CSS `filter: grayscale(100%)`
- On hover, the filter transitions to `grayscale(0%)` over 0.3 seconds
- The effect works with both image logos and icon fonts

## Responsive Grid

The component uses a responsive grid system:
- Mobile (≤576px): 2 columns
- Tablet (577px-768px): 3 columns
- Medium Desktop (769px-992px): 4 columns
- Large Desktop (≥993px): 6 columns

Each grid item has appropriate spacing and padding that adjusts for different screen sizes.

## Hover Effects

Industry cards have the following hover effects:
1. Card lifts up by 5px
2. Card gains a subtle shadow
3. Background changes to light gray
4. Logo transitions from grayscale to full color

All transitions use CSS easing for smooth animations.