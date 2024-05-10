from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from rest_framework import generics
from .serializers import *
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateSubscriptionSessionView(generics.ListCreateAPIView):
    """
    Creation and list of subscription plan and products
    """
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer 

    def get(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()  # Retrieve the queryset
            serializer = self.get_serializer(queryset, many=True)
            # return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, *args, **kwargs):
        
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            print("request.data",request.data)
            # Assuming you have a serializer to handle incoming data for creating a new plan
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            # Create a new subscription plan based on the validated serializer data
            subscription = serializer.save()

            # Retrieve account details from Stripe
            account = stripe.Account.retrieve()

            # Determine currency based on account country
            currency = 'inr' if account.country == 'IN' else 'usd'

            # Create or retrieve the Stripe product for the subscription
            product = subscription.create_or_retrieve_stripe_product()

            # Create the Stripe price for the subscription plan
            price = subscription.create_stripe_price(product.id, currency)
            subscription.stripe_price_id = price.id
            subscription.save()

            # Create a checkout session for the new subscription plan
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price": subscription.stripe_price_id,
                        "quantity": 1,
                    }
                ],
                mode="subscription",
                success_url=settings.PAYMENT_SUCCESS_URL,
                cancel_url=settings.PAYMENT_CANCEL_URL,
            )

            # Return the checkout session ID in the response
            return Response({'success': True, 'checkout_session_id': checkout_session.id}, status=status.HTTP_201_CREATED)
        except stripe.error.StripeError as e:
            # Handle Stripe errors
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

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