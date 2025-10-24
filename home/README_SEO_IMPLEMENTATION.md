# SEO Implementation for Global Ace Technology Inc

This document describes the SEO enhancements made to the Wagtail HomePage model for Global Ace Technology Inc.

## Features Implemented

### 1. Enhanced SEO Fields
The HomePage model has been enhanced with additional SEO fields:
- `og_image`: Image to be used for social media sharing (Open Graph and Twitter cards)
- `twitter_card_type`: Type of Twitter card to use (summary or summary with large image)

### 2. Open Graph Meta Tags
The base template now includes comprehensive Open Graph meta tags:
- `og:title`: Page title or SEO title
- `og:description`: Page description
- `og:image`: Social sharing image
- `og:type`: Set to "website"
- `og:url`: Full URL of the page

### 3. Twitter Card Meta Tags
Twitter Card meta tags have been implemented:
- `twitter:card`: Card type (summary or summary_large_image)
- `twitter:title`: Page title or SEO title
- `twitter:description`: Page description
- `twitter:image`: Social sharing image

### 4. Schema.org Markup
JSON-LD structured data has been added for:
- Organization schema with company details
- WebSite schema with site information

## Usage

### In Wagtail Admin
Content editors can now:
1. Set a custom SEO title (overrides page title in meta tags)
2. Set a custom meta description
3. Upload a social sharing image (og_image)
4. Select a Twitter card type

### In Templates
The SEO data can be accessed in templates using:
- `page.seo_title`: Custom SEO title
- `page.search_description`: Meta description
- `page.og_image`: Social sharing image
- `page.twitter_card_type`: Twitter card type

## Implementation Details

### Model Changes
The HomePage model in `home/models.py` includes:
- New fields for SEO enhancement
- Methods to retrieve SEO data
- Updated promote_panels to include new fields

### Template Changes
The base template in `ace_project/templates/base.html` includes:
- Enhanced meta tags for SEO
- Open Graph meta tags
- Twitter Card meta tags
- JSON-LD structured data

### Migration
A migration was created and applied to add the new fields to the database.

## Testing
To verify the implementation:
1. Check that the new fields appear in the Wagtail admin Promote tab
2. View page source to confirm meta tags are present
3. Use Facebook's Sharing Debugger to test Open Graph tags
4. Use Twitter's Card Validator to test Twitter cards
5. Use Google's Rich Results Test to verify schema.org markup