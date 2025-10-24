# CTA Banner Plugin for Global Ace Technology Inc

This plugin provides a reusable Wagtail block for creating full-width call-to-action banners that can be used on both the homepage and internal pages.

## Features

- **Full-width Design**: Spans the entire width of the page for maximum impact
- **Background Image Support**: Upload custom background images for visual appeal
- **Overlay Color Customization**: Add colored overlays to improve text readability
- **Theme Variants**: Choose between light and dark themes for text and buttons
- **Responsive Design**: Works on all device sizes
- **Reusable Component**: Can be used on homepage and internal pages
- **Wagtail Integration**: Fully integrated with Wagtail's StreamField system

## Installation

The plugin is already integrated into the project. No additional installation is required.

## Usage

### 1. Adding CTA Banner to Pages

1. Edit any page in Wagtail admin that supports StreamField content
2. In the content section where you want to add the CTA, click "Add block"
3. Select "Full Width CTA Banner" from the available block types
4. Configure the CTA banner with the following fields:
   - **Heading**: Main headline text (required)
   - **Subheading**: Supporting text (optional)
   - **Button Text**: Text for the call-to-action button (required)
   - **Button Link**: URL for the button (required)
   - **Background Image**: Upload an image for the background (optional)
   - **Overlay Color**: Add a color overlay (default: rgba(0, 0, 0, 0.7))
   - **Theme Variant**: Choose between Light Theme or Dark Theme

### 2. Theme Variants

- **Dark Theme** (default): White text with dark overlay, blue button
- **Light Theme**: Dark text with light overlay, blue button

### 3. Technical Implementation

The CTA banner is implemented as a reusable component:
- Template: `home/templates/home/cta_banner.html`
- CSS: `home/static/css/cta-banner.css`
- JavaScript: `home/static/js/cta-banner.js`

## Customization

### CSS Styling

Customize the appearance by modifying:
- `home/static/css/cta-banner.css`

### JavaScript Behavior

Modify the behavior in:
- `home/static/js/cta-banner.js`

### Template Structure

The HTML structure can be customized in:
- `home/templates/home/cta_banner.html`

## Technical Details

### Block Definition

The plugin uses the `FullWidthCTABlock` StructBlock defined in `home/models.py`:

```python
class FullWidthCTABlock(blocks.StructBlock):
    heading = blocks.CharBlock(
        required=True,
        max_length=100,
        help_text=_("Main heading for the CTA banner")
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=200,
        help_text=_("Subheading for the CTA banner")
    )
    button_text = blocks.CharBlock(
        required=True,
        max_length=50,
        help_text=_("Text for the CTA button")
    )
    button_link = blocks.URLBlock(
        required=True,
        help_text=_("URL for the CTA button")
    )
    background_image = ImageChooserBlock(
        required=False,
        help_text=_("Background image for the CTA banner")
    )
    overlay_color = blocks.CharBlock(
        required=False,
        max_length=7,
        help_text=_("Overlay color in hex format (e.g., #000000). Leave empty for default."),
        default="rgba(0, 0, 0, 0.7)"
    )
    theme_variant = blocks.ChoiceBlock(
        choices=[
            ('light', 'Light Theme'),
            ('dark', 'Dark Theme')
        ],
        default='dark',
        help_text=_("Select the theme variant for text and button styling")
    )
```

### Template Tags

The plugin uses standard Wagtail template tags:
- `{% load wagtailcore_tags wagtailimages_tags %}`
- `{% image %}` for responsive image handling
- `{% include %}` for reusable components

## Best Practices

1. **Image Optimization**: Use high-quality images optimized for web (1920px wide recommended)
2. **Contrast**: Ensure text is readable against the background with proper overlay colors
3. **Button Text**: Use action-oriented text like "Get Started", "Learn More", "Contact Us"
4. **Links**: Use descriptive URLs that match the button text for better UX

## Troubleshooting

### CTA Banner Not Displaying

1. Check that all required fields are filled (heading, button text, button link)
2. Verify the page has been published
3. Check browser console for CSS/JavaScript errors

### Background Image Issues

1. Check that images are properly uploaded in Wagtail admin
2. Verify the background image field is filled
3. Check browser console for image loading errors

### Theme Styling Problems

1. Ensure the theme variant is correctly selected
2. Check that the overlay color is properly formatted (rgba or hex)
3. Verify CSS files are properly loaded

## Support

For issues with the CTA banner plugin, contact the development team.