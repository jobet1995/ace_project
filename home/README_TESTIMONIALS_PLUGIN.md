# Testimonials Plugin for Global Ace Technology Inc

This plugin provides a complete solution for managing and displaying client testimonials on the homepage using Wagtail CMS.

## Features

- **Client Testimonials Management**: Create and manage testimonials with client name, company, photo, quote, and star rating (1-5 stars)
- **Visibility Control**: Toggle testimonials on/off for display on the website
- **Ordering System**: Arrange testimonials with a custom sort order
- **Carousel Display**: Display testimonials in an attractive carousel with navigation controls
- **Responsive Design**: Works on all device sizes
- **Wagtail Integration**: Fully integrated with Wagtail's admin interface

## Installation

The plugin is already integrated into the project. No additional installation is required.

## Usage

### 1. Managing Testimonials

1. Go to the Wagtail admin panel
2. Navigate to "Snippets" → "Testimonials"
3. Click "Add testimonial" to create a new testimonial
4. Fill in the following fields:
   - **Name**: Client's name
   - **Role**: Client's position/title (optional)
   - **Company**: Client's company (optional)
   - **Quote**: The testimonial text
   - **Image**: Client's photo (optional)
   - **Star rating**: Rating from 1-5 stars
   - **Is visible**: Toggle to show/hide the testimonial
   - **Sort order**: Lower numbers appear first

### 2. Creating Testimonial Carousels

1. Go to "Snippets" → "Testimonial Carousels"
2. Click "Add testimonial carousel"
3. Configure the carousel settings:
   - **Title**: Carousel section title
   - **Subtitle**: Carousel section subtitle (optional)
   - **Autoplay**: Enable/disable automatic rotation
   - **Autoplay delay**: Time between slides in milliseconds
   - **Loop**: Enable/disable looping
   - **Show navigation**: Show/hide navigation arrows
   - **Show pagination**: Show/hide pagination dots
   - **Testimonials per view**: Number of testimonials to show on mobile/tablet/desktop

### 3. Adding to Homepage

1. Edit the homepage in Wagtail admin
2. In the "Testimonials slider" section, add a new block
3. Choose "Testimonial carousel" from the block types
4. Select the carousel configuration you created
5. Select the testimonials to include in the carousel
6. Publish the page

### 4. Displaying on Frontend

The testimonials will automatically display using the carousel template. The plugin includes:

- Responsive design that works on mobile, tablet, and desktop
- Smooth animations and transitions
- Navigation controls (arrows and pagination dots)
- Star rating display
- Hover effects and visual feedback

## Customization

### CSS Styling

Customize the appearance by modifying:
- `home/static/css/testimonials-plugin.css`

### JavaScript Behavior

Modify the carousel behavior in:
- `home/static/js/testimonials-plugin.js`

### Template

The HTML structure can be customized in:
- `home/templates/home/testimonials_carousel_plugin.html`

## Technical Details

### Models

- `Testimonial`: Individual testimonial with all required fields
- `TestimonialCarousel`: Carousel configuration settings

### Template Tags

The plugin uses standard Wagtail template tags:
- `{% load wagtailcore_tags wagtailimages_tags %}`
- `{% image %}` for responsive image handling
- `{% if %}` and `{% for %}` for conditional rendering and loops

### JavaScript Dependencies

- Swiper.js for carousel functionality
- Font Awesome for star icons

## Troubleshooting

### Testimonials Not Displaying

1. Check that the testimonial is marked as "visible"
2. Verify the carousel configuration is correctly linked
3. Ensure the homepage has the testimonial carousel block added

### Carousel Not Working

1. Verify Swiper.js is loaded on the page
2. Check browser console for JavaScript errors
3. Ensure the testimonials-plugin.js file is included

### Images Not Loading

1. Check that images are properly uploaded in Wagtail admin
2. Verify the image field is filled in the testimonial
3. Check browser console for image loading errors

## Support

For issues with the testimonials plugin, contact the development team.