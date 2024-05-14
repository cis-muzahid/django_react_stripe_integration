from django.db import models
from django.contrib.auth.models import User
# Create your models here.
import uuid
from django.conf import settings
import stripe


class TimeStampedModel(models.Model):
    """ TimeStampedModel model for created and modified date."""

    created_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        """Meta class."""
        abstract = True

class SubscriptionPlan(TimeStampedModel):
    """SubscriptionPlan model for creation of subscription plan"""

    id = models.UUIDField(primary_key=True, verbose_name='ID',
                          default=uuid.uuid4)
    plan_name = models.CharField(max_length=255)
    plan_type = models.CharField(max_length=100)
    plan_description = models.CharField(max_length=255)
    plan_monthly_cost = models.DecimalField(max_digits=10, decimal_places=2)
    plan_max_signals_monthly = models.IntegerField()
    plan_unlimited_trade_parameters = models.BooleanField(default=False)
    plan_unlimited_features = models.BooleanField(default=False)
    plan_max_brokers = models.IntegerField()
    plan_currency = models.CharField(max_length=3)
    stripe_price_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.plan_name}"

    def create_or_retrieve_stripe_product(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            product = stripe.Product.retrieve(self.plan_name)
        except stripe.error.InvalidRequestError:
            product = stripe.Product.create(name=self.plan_name)
        return product

    def create_stripe_price(self, product_id, currency):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        price = stripe.Price.create(
            product=product_id,
            unit_amount=int(self.plan_monthly_cost * 100), 
            currency=currency,
            recurring={"interval": "month"},
        )

        return price

