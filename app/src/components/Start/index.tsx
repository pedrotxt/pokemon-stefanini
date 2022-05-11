
import {  useState } from 'react';

import Logo from '../../assets/logo.png'
import './style.css';


const Start = () => {

  const [start, setStart] = useState(false);


  function togglePostModal(){
    setStart(true);
  }

  return (

    <>
    {!start &&
    
      <div className='backgroud'>  
        <div className='fundo'>
          <img src={Logo} />
            <button className='btn-start' onClick={ ()=> togglePostModal() }>
              Start
            </button>
        </div>
      </div>
    }
    </>
      
  
  )
}

export default Start;