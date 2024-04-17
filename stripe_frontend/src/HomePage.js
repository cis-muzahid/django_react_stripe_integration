
  import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';
import { API_URL } from './config/index';
import axios from 'axios'; 

import './HomePage.css';

const HomePage = () => {
	const location = useLocation();

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		// const query = new URLSearchParams(window.location.search);
		const values = QueryString.parse(location.search);

		if (values.success) {
			console.log(
				'Order placed! You will receive an email confirmation.'
			);
		}

		if (values.canceled) {
			console.log(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);
	
	const handleCheckout = async (priceId) => {
		try {
			const response = await axios.post(
				`${API_URL}/api/stripe/create-checkout-session`,
				{ price_id: priceId }, // Include price_id in the request body
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

	return (
		<section>
			<div className='product'>
				<div className='card'>
					<img
						src='https://i.imgur.com/EHyR2nP.png'
						alt='Subscription details'
					/>
					<div className='description'>
						<h3>Gold plan</h3>
						<h5>$100.00</h5>
					</div>
					<button className='button' onClick={() => handleCheckout('product_id_xxx')}>
						Checkout
					</button>
				</div>
				<div className='card'>
					<img
						src='https://i.imgur.com/EHyR2nP.png'
						alt='The cover of Another Book'
					/>
					<div className='description'>
						<h3>silver plan</h3>
						<h5>$450.00</h5>
					</div>
					<button className='button' onClick={() => handleCheckout('product_id_xxx')}>
						Checkout
					</button>
				</div>
				<div className='card'>
					<img
						src='https://i.imgur.com/EHyR2nP.png'
						alt='The cover of Third Book'
					/>
					<div className='description'>
						<h3>Pro max</h3>
						<h5>$345.00</h5>
					</div>
					{/* price_1P66hBSDSeRAhUKgfBt4SqRb */}
					<button className='button' onClick={() => handleCheckout('product_id_xxx')}>
						Checkout
					</button>
				</div>
			</div>
		</section>
	);
};

export default HomePage;
