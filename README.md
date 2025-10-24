# Global Ace Technology Inc. - Wagtail CMS

This is a Wagtail CMS project for Global Ace Technology Inc. that includes a comprehensive HomePage model with modular StreamFields.

## Features

### HomePage Model
The HomePage model includes the following sections as StreamFields:

1. **Hero Section** - With headline, subheadline, background image, and CTA
2. **Services Overview** - Display of services with icons, titles, descriptions, and links
3. **About Preview** - Summary text and image preview
4. **Key Stats/Counters** - Display of important statistics
5. **Testimonials Slider** - Linked to Testimonial snippets
6. **Partners Carousel** - Linked to Partner snippets
7. **Blog Highlights** - Shows latest 3 blog posts
8. **Final Call-to-Action Section** - Closing CTA for the page

### Snippet Models
- **Testimonial** - For client testimonials with name, role, company, quote, and image
- **Partner** - For business partners with name, logo, website, and featured status

### Blog Model
- **BlogPage** - For blog posts with introduction, body, date, and author

## Technical Implementation

- Built with Wagtail 7.1+ and Django 5.2
- Uses StructBlocks, ListBlocks, and StreamFields for flexible content
- SEO-optimized with search fields and metadata
- Responsive CSS styling
- Properly structured migrations

## Installation

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Create a superuser: `python manage.py createsuperuser`
5. Run the development server: `python manage.py runserver`

## Usage

After installation, you can:
1. Access the admin interface at `/admin/`
2. Create Testimonial and Partner snippets
3. Edit the HomePage content through the StreamField interface
4. Create BlogPage instances as child pages

## Customization

The templates and CSS can be customized to match your brand guidelines. The modular structure of the HomePage allows for easy addition or removal of sections.