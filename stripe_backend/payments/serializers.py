from .models import *
from rest_framework import serializers

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    """
    Serializer for the SubscriptionPlan model.

    This serializer is used to serialize and deserialize SubscriptionPlan objects.
    It maps the SubscriptionPlan model fields to JSON fields.

    Attributes:
        model (SubscriptionPlan): The SubscriptionPlan model class.
        fields (list): A list of fields to include in the serialized representation.

    """
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'