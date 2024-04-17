from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect

import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY  # Set your Stripe secret key here

            price_id = request.data.get('price_id')  
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': price_id,
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card',],
                mode='subscription',
                success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                # create
                cancel_url=settings.SITE_URL + '/?canceled=true',
            )
             
            """ create table transaction details here and store CHECKOUT_SESSION_ID, user_id and status pending in table 
            with redirecting stripe payment page, and then in response success or failed save in table with status success or failed for user
            information """
            return Response({'url': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)