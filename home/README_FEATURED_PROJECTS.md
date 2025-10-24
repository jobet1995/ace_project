# Featured Projects Component

This component displays featured projects or case studies in a responsive grid layout with hover effects and animations.

## Features

- Responsive grid layout (2 columns on desktop, 1 column on mobile)
- Project cards with image thumbnails, titles, and descriptions
- Hover overlay effect with "View Case Study" button
- Fade-in animations when scrolling into view
- Works with Wagtail StreamField and static data
- Accessible design with proper contrast and focus states

## Files

1. `templates/home/featured_projects_component.html` - Static component implementation
2. `templates/home/featured_projects_reusable.html` - Dynamic component that works with Wagtail data
3. `templates/home/featured_projects_streamfield.html` - StreamField integration for Wagtail pages

## Usage

### Static Implementation

Include the component in your template:

```django
{% include "home/featured_projects_component.html" %}
```

### Dynamic Implementation (with Wagtail data)

Pass the projects data to the template context:

```python
# In your view or page model
context['projects_data'] = [
    {
        'title': 'Enterprise Cloud Migration',
        'description': 'Successfully migrated a Fortune 500 company\'s infrastructure to AWS, reducing costs by 40%.',
        'image': project_image,  # Wagtail image object
        'link': '/case-studies/cloud-migration/'
    },
    # ... more projects
]
```

Then include the reusable component:

```django
{% include "home/featured_projects_reusable.html" with 
    projects_data=projects_data 
    section_title="Our Featured Projects" 
    section_description="Discover our latest success stories"
%}
```

### StreamField Implementation

In your Wagtail page model, ensure you have a case_studies StreamField:

```python
# In your HomePage model
case_studies = StreamField([
    ('case_study', CaseStudyBlock()),
], use_json_field=True, blank=True)
```

Then in your page template:

```django
{% include "home/featured_projects_streamfield.html" %}
```

## Customization

### Changing Projects

Modify the project cards in the template to add/remove projects.

### Styling

The component uses the project's SCSS variables:
- Primary color: `$primary-color` (#0B3D91)
- Background: `$background-color` (#F5F7FA)
- Text colors: `$text-color`, `$light-text`

### Animation Settings

Adjust the fade-in animation in the CSS:
- `transition`: Animation timing
- `transform`: Initial position

## Dependencies

- Bootstrap 5 (for grid and utility classes)
- Bootstrap Icons (for placeholder icons)
- jQuery (for scroll animations)

## Responsive Behavior

- Mobile (≤768px): 1 column
- Tablet/Desktop (≥768px): 2 columns

## Accessibility

- Proper contrast ratios for text
- Focus states for interactive elements
- Semantic HTML structure
- Hover effects work on both mouse and keyboard navigation