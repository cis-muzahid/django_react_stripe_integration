from django.contrib import admin

# Register your models here.
from payments.models import SubscriptionPlan

class SubscriptionPlanAdmin(admin.ModelAdmin):
    """Create CustomUser admin for display on admin panel"""

    list_display = ('stripe_price_id','plan_name','plan_type', 'plan_monthly_cost')


admin.site.register(SubscriptionPlan, SubscriptionPlanAdmin)
