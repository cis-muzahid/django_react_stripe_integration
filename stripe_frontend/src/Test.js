
  
  import React from 'react';
  import { useNavigate } from 'react-router-dom';

  
  const Test = () =>  {
    const navigate = useNavigate();
    const handleNavigate=()=>{
      navigate('/')
    }
	return (
	  <div>
        <h1>SUBMITTED - THANK YOU</h1>

      <section>
			<div className='product'>
				<button className='button bg-color-red' onClick={() => handleNavigate()}>BACK TO HOME</button>
			</div>
		</section>
	  </div>
	);
  }
  
  export default Test;
  