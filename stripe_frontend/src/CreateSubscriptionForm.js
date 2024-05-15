import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_URL } from './config/index';
import axios from 'axios';


const CreateSubscriptionPlanForm = () => {
  const [formData, setFormData] = useState({
    plan_name: '',
    plan_type: '',
    plan_description: '',
    plan_monthly_cost: '',
    plan_max_signals_monthly: '',
    plan_unlimited_trade_parameters: '',
    plan_unlimited_features: '',
    plan_max_brokers: '',
    plan_currency: '',
  });
  const navigate= useNavigate()

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/stripe/subscription-plans`, formData);
      console.log(response.data); 
      navigate('/success')
    } catch (error) {
      console.error(error);
      alert('Error occurred. Please try again.');
    }
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.plan_name) {
      newErrors.plan_name = 'Plan Name is required';
      valid = false;
    }
    // Add similar validations for other fields

    setErrors(newErrors);
    return valid;
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Create Subscription plan for product</h3>
    <div>
      <label>Plan Name</label>
      <input type="text" name="plan_name" value={formData.plan_name}  required={true} onChange={handleChange} />
      {errors.plan_name && <span>{errors.plan_name}</span>}
    </div>
    <div>
      <label>Plan Type</label>
      <input type="text" name="plan_type" value={formData.plan_type} required={true} onChange={handleChange} />
      {errors.plan_type && <span>{errors.plan_type}</span>}
    </div>
    <div>
      <label>plan_description</label>
      <input type="text" name="plan_description" value={formData.plan_description} required={true} onChange={handleChange} />
      {errors.plan_description && <span>{errors.plan_description}</span>}
    </div>
    <div>
      <label>plan_monthly_cost</label>
      <input type="number" name="plan_monthly_cost" value={formData.plan_monthly_cost} required={true} onChange={handleChange} />
      {errors.plan_monthly_cost && <span>{errors.plan_monthly_cost}</span>}
    </div>
    <div>
      <label>plan_max_signals_monthly</label>
      <input type="number" name="plan_max_signals_monthly" value={formData.plan_max_signals_monthly} required={true} onChange={handleChange} />
      {errors.plan_max_signals_monthly && <span>{errors.plan_max_signals_monthly}</span>}
    </div>

    <div>
    <label>
    <input
      type="checkbox"
      name="plan_unlimited_trade_parameters"
      checked={formData.plan_unlimited_trade_parameters}
      onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          plan_unlimited_trade_parameters: e.target.checked,
        }))
      }
    />
    Plan Unlimited Trade Parameters
    </label>
    {errors.plan_unlimited_trade_parameters && (
      <span>{errors.plan_unlimited_trade_parameters}</span>
    )}

</div>
    
     <div>
    <label>
    <input
      type="checkbox"
      name="plan_unlimited_features"
      checked={formData.plan_unlimited_features}
      onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          plan_unlimited_features: e.target.checked,
        }))
      }
    />
    Plan Unlimited Trade Parameters
    </label>
    {errors.plan_unlimited_features && (
      <span>{errors.plan_unlimited_features}</span>
    )}

</div>

    <div>
      <label>plan_max_brokers</label>
      <input type="text" name="plan_max_brokers" value={formData.plan_max_brokers} required={true} onChange={handleChange} />
      {errors.plan_max_brokers && <span>{errors.plan_max_brokers}</span>}
    </div>
    <div>
      <label>plan_currency</label>
      <input type="text" name="plan_currency" value={formData.plan_currency} required={true}  onChange={handleChange} />
      {errors.plan_currency && <span>{errors.plan_currency}</span>}
    </div>
   
    <button type="submit">Create Plan</button>
  </form>
  );
};

export default CreateSubscriptionPlanForm;
