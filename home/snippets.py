from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.snippets.models import register_snippet
from wagtail.images.models import Image
from wagtail.admin.panels import FieldPanel


@register_snippet
class Testimonial(models.Model):
    """A testimonial from a client or customer."""
    name = models.CharField(max_length=100, help_text="Name of the person giving the testimonial")
    role = models.CharField(max_length=100, blank=True, help_text="Role/position of the person")
    company = models.CharField(max_length=100, blank=True, help_text="Company of the person")
    quote = models.TextField(help_text="The testimonial quote")
    image = models.ForeignKey(
        Image,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Profile image of the person"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('role'),
        FieldPanel('company'),
        FieldPanel('quote'),
        FieldPanel('image'),
    ]

    def __str__(self):
        return f"{self.name} - {self.company}" if self.company else str(self.name)

    class Meta:
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"
        ordering = ['-created_at']


@register_snippet
class Partner(models.Model):
    """A business partner or client."""
    name = models.CharField(max_length=100, help_text="Name of the partner")
    logo = models.ForeignKey(
        Image,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Logo of the partner"
    )
    website = models.URLField(blank=True, help_text="Website of the partner")
    featured = models.BooleanField(default=False, help_text="Feature this partner prominently")  # type: ignore
    created_at = models.DateTimeField(auto_now_add=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('logo'),
        FieldPanel('website'),
        FieldPanel('featured'),
    ]

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Partner"
        verbose_name_plural = "Partners"
        ordering = ['-featured', '-created_at']