import firebase from 'firebase';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../../contexts/PokemonContext';
import { useModal } from '../../hooks/useModal';
import { useModalCapture } from '../../hooks/useModalCapture';
import { useModalStats } from '../../hooks/useModalStats';
import AshImg from '../../assets/ash.png';
import Loading from '../../assets/loading.png';
import Base from '../../assets/base-icon.png'
import Modal from '../Modal';
import ModalCapture from '../Modal/ModalCapture';
import ModalStats from '../Modal/ModalStats';
import './style.css';


const Ash = () => {

  const { loading } = useContext(PokemonContext);

  const [start, setStart] = useState(false);

  return (

    <div className='container-ash'>
    {!loading &&
      <img className='base' src={Base} />
    }
    {loading &&
      <img src={Loading} />
    }

    <img src={AshImg} />
 
    </div>
      
  
  )
}

export default Ash;