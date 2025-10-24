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


# New StructBlocks for the requested sections
class IndustryBlock(blocks.StructBlock):
    """Block for industries served with logo or icon"""
    name = blocks.CharBlock(
        required=True,
        max_length=100,
        help_text=_("Name of the industry")
    )
    logo_or_icon = ImageChooserBlock(
        required=False,
        help_text=_("Logo or icon representing the industry")
    )
    description = blocks.TextBlock(
        required=False,
        max_length=200,
        help_text=_("Brief description of our work in this industry")
    )


class CaseStudyBlock(blocks.StructBlock):
    """Block for case studies or project highlights"""
    project_title = blocks.CharBlock(
        required=True,
        max_length=100,
        help_text=_("Title of the project")
    )
    short_description = blocks.TextBlock(
        required=True,
        max_length=300,
        help_text=_("Brief description of the project")
    )
    project_image = ImageChooserBlock(
        required=False,
        help_text=_("Featured image of the project")
    )
    project_link = blocks.PageChooserBlock(
        required=False,
        help_text=_("Link to detailed project page")
    )
    client_name = blocks.CharBlock(
        required=False,
        max_length=100,
        help_text=_("Name of the client")
    )


class HomePage(Page):
    # Hero section
    hero_section = StreamField([
        ('hero', HeroBlock()),
    ], use_json_field=True, blank=True)

    # About preview
    about_summary = StreamField([
        ('about', AboutPreviewBlock()),
    ], use_json_field=True, blank=True)

    # Services overview
    services_overview = StreamField([
        ('service', ServiceBlock()),
    ], use_json_field=True, blank=True)

    # Industries served
    industries_served = StreamField([
        ('industry', IndustryBlock()),
    ], use_json_field=True, blank=True)

    # Case studies / projects highlight
    case_studies = StreamField([
        ('case_study', CaseStudyBlock()),
    ], use_json_field=True, blank=True)

    # Testimonials slider
    testimonials_slider = StreamField([
        ('testimonial', TestimonialBlock()),
    ], use_json_field=True, blank=True)

    # Call-to-action section
    call_to_action = StreamField([
        ('cta', CTABlock()),
    ], use_json_field=True, blank=True)

    # Latest news or insights
    latest_news = StreamField([
        ('blog_highlight', BlogHighlightBlock()),
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

    def get_latest_blog_posts(self, num_posts=3):
        """
        Get the latest blog posts for the homepage.
        """
        from home.blog_models import BlogPage
        return BlogPage.objects.live().order_by('-date')[:num_posts]

    # Search index configuration
    search_fields = Page.search_fields + [
        index.SearchField('hero_section'),
        index.SearchField('about_summary'),
        index.SearchField('services_overview'),
        index.SearchField('industries_served'),
        index.SearchField('case_studies'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('hero_section'),
        FieldPanel('about_summary'),
        FieldPanel('services_overview'),
        FieldPanel('industries_served'),
        FieldPanel('case_studies'),
        FieldPanel('testimonials_slider'),
        FieldPanel('call_to_action'),
        FieldPanel('latest_news'),
    ]

    promote_panels = [
        FieldPanel('seo_title'),
        FieldPanel('search_description'),
        FieldPanel('og_image'),
        FieldPanel('twitter_card_type'),
        FieldPanel('slug'),
    ]