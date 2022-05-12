import firebase from 'firebase';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../../contexts/PokemonContext';
import { useModal } from '../../hooks/useModal';
import { useModalCapture } from '../../hooks/useModalCapture';
import { useModalStats } from '../../hooks/useModalStats';
import Modal from '../Modal';
import ModalCapture from '../Modal/ModalCapture';
import ModalStats from '../Modal/ModalStats';
import './style.css';

const ImagemItem = () => {

  const { setPokemons, setFotoEnviada, fotoEnviada, setModalFechado } = useContext(PokemonContext);

  const [ showModal, viewModal, closeModal ] = useModal();

  const [ showModalStats, viewModalStats, closeModalStats ] = useModalStats();

  const [ showModalCapture, viewModalCapture, closeModalCapture ] = useModalCapture();

  const [pokes, setPokes] = useState<any>([]);

  const listRef = firebase.firestore().collection('pokes').orderBy('created', 'desc');

  useEffect(()=>{
    setFotoEnviada(false);
    
    async function loadPokes(){
    await listRef.limit(6)
    .get()
    .then((snapshot)=>{
      loadPokemons(snapshot);
    })
    }
    loadPokes();
    
},[pokes]);

// pegar todos os chamados da nossa collection chamados do firestore
async function loadPokemons(snapshot:any){
  
  let lista: any = [];
    snapshot.forEach((doc : any) =>{
        lista.push({
        id: doc.id,
        nome: doc.data().nome,
        hp: doc.data().hp,
        peso: doc.data().peso,
        altura: doc.data().altura,
        tipo: doc.data().tipo,
        habilidade1: doc.data().habilidade1,
        habilidade2: doc.data().habilidade2,
        habilidade3: doc.data().habilidade3,
        habilidade4: doc.data().habilidade4,
        defesa: doc.data().defesa,
        ataque: doc.data().ataque,
        defesaEspecial: doc.data().defesaEspecial,
        ataqueEspecial: doc.data().ataqueEspecial,
        velocidade: doc.data().velocidade,
        fotoUrl: doc.data().fotoUrl
    })
    setPokes(lista);
  })
}

  function togglePostModal(item: FormEvent<HTMLSelectElement>){
    setPokemons(item);

    viewModal();
  }

  return (

      <div className='container-menu'>
        {pokes.map((item: any, index: any)=>{
          return(
            <>
            <li key={index}>
              <>
              <div className='fundo-btn2'>
                <button className='btn2' onClick={ ()=> togglePostModal(item) }>
                <img src={item.fotoUrl} />
                </button>
              </div>
              </>
            </li>
          </>
        )})}
        {pokes.length === 0 &&
          <>
          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div> 

          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>  
          
          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
            </div> 
            
          </>
        }
        {pokes.length === 5 &&
          <>
          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>
          </>
        }
        {pokes.length === 4 &&
          <>
          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>
          </>
        }
        {pokes.length === 3 &&
          <>
          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>
            
          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>
          </>
        }
        {pokes.length === 2 &&
          <>
          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'> 
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>
          </>
        }
        {pokes.length === 1 &&
          <>
          <div className='fundo-btn'>
            <button className='btn'>
            <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>

          <div className='fundo-btn'> 
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>    

          <div className='fundo-btn'>
            <button className='btn'>
              <h1>?</h1>
            </button> <br/>
          </div>
          </>
        }

        <div className='fundo-modal' onClick={viewModalStats}>
        <button className='modal-btn' >
          <h1>+</h1>
        </button>
      </div>

      <Modal isShowing={showModal} closeModal={closeModal} />
      <ModalStats isShowingStats={showModalStats} closeModalStats={closeModalStats} />
      
      </div>
      
  
  )
}

export default ImagemItem;