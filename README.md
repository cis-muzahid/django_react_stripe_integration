# stripe_integration
This is a simple app showing you how to setup Stripe Checkout on a Django and React project in order to accept payments.

-   The first thing to do is to clone the repository:
-   git clone https://github.com/cis-muzahid/stripe_integration.git

### stripe_integration setup

- Go to - https://dashboard.stripe.com/

The steps involved to get this to work are:

-   Log into your Stripe account (create one first if you don't have one)
-   Enable test mode
-   Click the gear icon in the top right
-   Then under the "Business settings" click on "Account details"
-   Fill in a "Public business name", "Support phone number", and "Statement descriptor"
-   Click on "Developers" and then "API keys"
-   Copy your secret key
-   Open backend/core/settings.py
-   Find the STRIPE_SECRET_KEY setting and paste your key in here
-   Click on "Products" and create a product
-   create a subscription plan from frontend/src/HomePage.js and then checkout product to add payments

### For backend Setup 
- follow stripe_backend/README.md file for setup - 

### For frontend Setup 
- follow stripe_frontend/README.md file for setup - 


