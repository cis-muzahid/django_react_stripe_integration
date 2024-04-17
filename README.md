# stripe_integration
Payment gatway integration in frontend (React JS) and backend (Django DRF)

# Django & React Stripe Checkout
This is a simple app showing you how to setup Stripe Checkout on a Django and React project in order to accept payments.

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
-   Copy the price ID, go into frontend/src/HomePage.js and paste it where you see "product_id_xxx"


### Setup

- The first thing to do is to clone the repository:
- $ git clone https://github.com/

###   Create a virtual environment with: python3 -m venv venv
-   Activate the virtual environment: source venv/bin/activate (linux/ubuntoo) or .\venv\Scripts\activate (Windows)
###   Run: pip install -r requirements.txt
###  Run: python manage.py migrate
### Run: python manage.py runserver
-   This will now set up your backend, next you need to get the frontend set up using node version- 18 
-   To do this, navigate into frontend/
###   Then run: npm install
###   Then run: npm run start
-   You should now have your React app running on localhost:3000 and can test out a payment

