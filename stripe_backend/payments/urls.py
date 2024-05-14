from django.urls import path
from .views import *


urlpatterns = [
    
    path('create-checkout-session', StripeCheckoutView.as_view()),
    path('subscription-plans', CreateSubscriptionSessionView.as_view()),

]
