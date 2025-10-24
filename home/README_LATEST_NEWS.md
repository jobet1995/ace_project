# Latest News Component

This component displays the latest blog posts in a responsive grid layout with equal-height cards and hover animations.

## Features

- Dynamically pulls the latest 3 blog posts using Wagtail's PageQuerySet
- Each card includes blog image, title, excerpt, and 'Read More' button
- Equal-height cards using flexbox
- Hover animations with subtle scaling and shadow effects
- Consistent spacing and responsive design
- Works with Wagtail StreamField and static data
- Accessible design with proper contrast and focus states

## Files

1. `templates/home/latest_news_component.html` - Static component implementation
2. `templates/home/latest_news_reusable.html` - Dynamic component that works with Wagtail data
3. `templates/home/latest_news_streamfield.html` - StreamField integration for Wagtail pages

## Usage

### Static Implementation

Include the component in your template:

```django
{% include "home/latest_news_component.html" %}
```

### Dynamic Implementation (with Wagtail data)

Pass the latest posts data to the template context:

```python
# In your view or page model
from home.blog_models import BlogPage

context['latest_posts'] = BlogPage.objects.live().order_by('-date')[:3]
```

Then include the reusable component:

```django
{% include "home/latest_news_reusable.html" with 
    latest_posts=latest_posts 
    section_title="Our Latest News" 
    section_description="Stay up to date with our latest thoughts"
%}
```

### StreamField Implementation

In your Wagtail page model, ensure you have a latest_news StreamField:

```python
# In your HomePage model
latest_news = StreamField([
    ('blog_highlight', BlogHighlightBlock()),
], use_json_field=True, blank=True)
```

Then in your page template:

```django
{% include "home/latest_news_streamfield.html" %}
```

## Customization

### Changing Blog Posts

The component automatically fetches the latest 3 blog posts. To change the number of posts, modify the `get_latest_blog_posts` method in the HomePage model.

### Styling

The component uses the project's SCSS variables:
- Primary color: `$primary-color` (#0B3D91)
- Background: `$background-color` (#F5F7FA)
- Text colors: `$text-color`, `$light-text`

### Animation Settings

Adjust the hover animations in the CSS:
- `transition`: Animation timing
- `transform`: Scale and position effects

## Dependencies

- Bootstrap 5 (for grid and utility classes)
- Bootstrap Icons (for placeholder icons)
- Wagtail CMS (for blog post integration)

## Responsive Behavior

- Mobile (≤768px): 1 column
- Tablet (768px-992px): 2 columns
- Desktop (≥992px): 3 columns

## Accessibility

- Proper contrast ratios for text
- Focus states for interactive elements
- Semantic HTML structure
- Alt text for images