import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryString from 'query-string';
import { API_URL } from './config/index';
import axios from 'axios';

import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const handleCheckout = async (price_id) => {
	console.log("price_id",price_id)
    try {
      const response = await axios.post(
        `${API_URL}/api/stripe/create-checkout-session`,
        { price_id: price_id }, // Include price_id in the request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const session = response.data;
      window.location = session.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const handleNavigate = () => {
    navigate('/createproduct');
  };

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/stripe/subscription-plans`
      );
      setPlans(response.data.data);
	  console.log('plans data here======',plans);
      console.log('response data here======',response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      throw error;
    }
  };
console.log(plans,"plans data===========")
  return (
    <div>
      <section>
        <div >
          <button
            className='button bg-color-red'
            onClick={() => handleNavigate()}
          >
            Create New Product
          </button>
        </div>
      </section>
	  <section>
  <div className='subscription-plans-container'>
    {plans?.map((plan, index) => (
        <div className='product' key={plan.id}>
          <div className='card'>
            <img
              src='https://i.imgur.com/EHyR2nP.png'
              alt='Subscription details'
            />
            <div>
              <h3>Name: {plan.plan_name}</h3>
              <h3>Cost: {plan.plan_monthly_cost}</h3>
              <p>Description: {plan.plan_description}</p>
            </div>
            <button
              className='button'
            //   onClick={() => handleCheckout(plan.stripe_price_id)}
			onClick={() => handleCheckout(plan.stripe_price_id)}

            >
              Checkout
            </button>
          </div>
        </div>
      ))}
  </div>
</section>

    </div>
  );
};

export default HomePage;
