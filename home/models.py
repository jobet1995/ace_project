from django.db import models
from django.utils.translation import gettext_lazy as _

from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock
from wagtail.admin.panels import FieldPanel
from wagtail.search import index


# StructBlocks for modular content
class HeroBlock(blocks.StructBlock):
    headline = blocks.CharBlock(
        required=True,
        max_length=100,
        help_text=_("Main headline for the hero section")
    )
    subheadline = blocks.CharBlock(
        required=False,
        max_length=200,
        help_text=_("Subheadline for the hero section")
    )
    background_image = ImageChooserBlock(required=True)
    cta_text = blocks.CharBlock(
        required=False,
        max_length=50,
        help_text=_("Call to action button text")
    )
    cta_link = blocks.URLBlock(
        required=False,
        help_text=_("Call to action button link")
    )


class ServiceBlock(blocks.StructBlock):
    icon = ImageChooserBlock(required=False)
    title = blocks.CharBlock(
        required=True,
        max_length=50,
        help_text=_("Service title")
    )
    description = blocks.TextBlock(
        required=True,
        max_length=200,
        help_text=_("Short description of the service")
    )
    link = blocks.PageChooserBlock(
        required=False,
        help_text=_("Link to service detail page")
    )


class AboutPreviewBlock(blocks.StructBlock):
    summary_text = blocks.RichTextBlock(
        required=True,
        features=['bold', 'italic', 'link'],
        help_text=_("Summary text for the about section")
    )
    image = ImageChooserBlock(required=False)


class StatBlock(blocks.StructBlock):
    number = blocks.IntegerBlock(
        required=True,
        help_text=_("The statistic number")
    )
    label = blocks.CharBlock(
        required=True,
        max_length=50,
        help_text=_("Label for the statistic")
    )


class StatsCounterBlock(blocks.StructBlock):
    # Icon options - either FontAwesome class name or SVG choice
    icon_choice = blocks.ChoiceBlock(
        choices=[
            ('fontawesome', 'Font Awesome'),
            ('svg', 'SVG Image')
        ],
        default='fontawesome',
        help_text=_("Choose icon type")
    )
    fontawesome_class = blocks.CharBlock(
        required=False,
        max_length=100,
        help_text=_("Font Awesome class name (e.g., fas fa-project-diagram). Required if Font Awesome is selected.")
    )
    svg_icon = ImageChooserBlock(
        required=False,
        help_text=_("SVG icon image. Required if SVG is selected.")
    )
    label = blocks.CharBlock(
        required=True,
        max_length=50,
        help_text=_("Label for the statistic (e.g., Projects, Clients, Awards)")
    )
    value = blocks.CharBlock(
        required=True,
        max_length=20,
        help_text=_("Value for the statistic (integer or text)")
    )
    custom_class = blocks.CharBlock(
        required=False,
        max_length=100,
        help_text=_("Custom CSS class name for animation triggers")
    )

    icon = "tasks"
    label = "Stats Counter"


class TestimonialBlock(blocks.StructBlock):
    testimonial = SnippetChooserBlock('home.Testimonial', required=True)


class PartnerBlock(blocks.StructBlock):
    partner = SnippetChooserBlock('home.Partner', required=True)


class BlogHighlightBlock(blocks.StructBlock):
    # This block will automatically fetch the latest 3 blog posts
    title = blocks.CharBlock(
        required=False,
        default="Latest from our Blog",
        max_length=100
    )


class CTABlock(blocks.StructBlock):
    headline = blocks.CharBlock(
        required=True,
        max_length=100,
        help_text=_("Headline for the CTA section")
    )
    subheadline = blocks.CharBlock(
        required=False,
        max_length=200,
        help_text=_("Subheadline for the CTA section")
    )
    cta_text = blocks.CharBlock(
        required=True,
        max_length=50,
        help_text=_("Call to action button text")
    )
    cta_link = blocks.URLBlock(
        required=True,
        help_text=_("Call to action button link")
    )


class CallToActionBlock(blocks.StructBlock):
    title = blocks.CharBlock(
        required=True,
        max_length=100,
        help_text=_("Title for the call to action section")
    )
    description = blocks.RichTextBlock(
        required=False,
        help_text=_("Description for the call to action section")
    )
    button_label = blocks.CharBlock(
        required=True,
        max_length=50,
        help_text=_("Text for the call to action button")
    )
    button_link = blocks.URLBlock(
        required=True,
        help_text=_("URL for the call to action button")
    )
    background_color = blocks.CharBlock(
        required=False,
        max_length=7,
        help_text=_("Background color in hex format (e.g., #FFFFFF). Leave empty to use image or default.")
    )
    background_image = ImageChooserBlock(
        required=False,
        help_text=_("Background image for the call to action section. If both color and image are provided, image takes precedence.")
    )  # type: ignore

    icon = "placeholder"
    label = "Call to Action"


class HomePage(Page):
    # Hero section
    hero_section = StreamField([
        ('hero', HeroBlock()),
    ], use_json_field=True, blank=True)

    # Services overview
    services_overview = StreamField([
        ('service', ServiceBlock()),
    ], use_json_field=True, blank=True)

    # About preview
    about_preview = StreamField([
        ('about', AboutPreviewBlock()),
    ], use_json_field=True, blank=True)

    # Key stats
    key_stats = StreamField([
        ('stat', StatBlock()),
    ], use_json_field=True, blank=True)

    # Testimonials slider
    testimonials_slider = StreamField([
        ('testimonial', TestimonialBlock()),
    ], use_json_field=True, blank=True)

    # Partners carousel
    partners_carousel = StreamField([
        ('partner', PartnerBlock()),
    ], use_json_field=True, blank=True)

    # Blog highlights
    blog_highlights = StreamField([
        ('blog_highlight', BlogHighlightBlock()),
    ], use_json_field=True, blank=True)

    # Final CTA
    final_cta = StreamField([
        ('cta', CTABlock()),
    ], use_json_field=True, blank=True)

    # SEO fields
    og_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text=_('Image to be used for social media sharing (Open Graph and Twitter cards)')
    )
    twitter_card_type = models.CharField(
        max_length=50,
        blank=True,
        choices=[
            ('summary', 'Summary'),
            ('summary_large_image', 'Summary with Large Image'),
        ],
        default='summary_large_image',
        help_text=_('Type of Twitter card to use')
    )

    # SEO methods
    def get_seo_title(self):
        return self.seo_title or self.title

    def get_seo_description(self):
        return self.search_description

    def get_og_image(self):
        return self.og_image

    def get_twitter_card_type(self):
        return self.twitter_card_type or 'summary_large_image'

    # Search index configuration
    search_fields = Page.search_fields + [
        index.SearchField('hero_section'),
        index.SearchField('services_overview'),
        index.SearchField('about_preview'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('hero_section'),
        FieldPanel('services_overview'),
        FieldPanel('about_preview'),
        FieldPanel('key_stats'),
        FieldPanel('testimonials_slider'),
        FieldPanel('partners_carousel'),
        FieldPanel('blog_highlights'),
        FieldPanel('final_cta'),
    ]

    promote_panels = [
        FieldPanel('seo_title'),
        FieldPanel('search_description'),
        FieldPanel('og_image'),
        FieldPanel('twitter_card_type'),
        FieldPanel('slug'),
    ]