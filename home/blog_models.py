from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index


class BlogPage(Page):
    """A blog page model for Global Ace Technology Inc."""
    
    introduction = models.CharField(
        max_length=255,
        help_text=_("Short introduction for the blog post")
    )
    body = RichTextField(
        blank=True,
        help_text=_("Main content of the blog post")
    )
    date = models.DateField(
        _("Post date"),
        help_text=_("Date of the blog post")
    )
    author = models.CharField(
        max_length=100,
        blank=True,
        help_text=_("Author of the blog post")
    )
    
    search_fields = Page.search_fields + [
        index.SearchField('introduction'),
        index.SearchField('body'),
        index.FilterField('date'),
    ]
    
    content_panels = Page.content_panels + [
        FieldPanel('introduction'),
        FieldPanel('body'),
        FieldPanel('date'),
        FieldPanel('author'),
    ]