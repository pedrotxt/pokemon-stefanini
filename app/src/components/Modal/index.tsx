import {FormEvent, useContext, useEffect, useState} from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import Planta from '../../assets/planta.png';
import Eletrico from '../../assets/eletrico.png';
import Fantasma from '../../assets/fantasma.png';
import Fogo from '../../assets/fogo.png';
import Lapis from '../../assets/lapis.png';
import firebase from "../../services/firebaseConnection";

import './style.css';

type ModalProps = {
  isShowing: boolean,
  closeModal: () => void
}

const Modal = ({ isShowing, closeModal }: ModalProps) => {

  const [types, setTypes] = useState<any>([]);
  const [loadTypes, setLoadTypes] = useState(true);
  const [editarNome, setEditarNome] = useState(false);

  const {  pokemons, nome, setNome, imagePoke, setModalFechado } = useContext(PokemonContext);

  useEffect(() =>{
   async function loadTypes() {
     await firebase.firestore().collection('types')
     .get()
     .then((snapshot)=> {
       let lista: any = [];

       snapshot.forEach((doc) =>{
         lista.push({
          id: doc.id,
          tipo: doc.data().tipo
         })
       })

       setTypes(lista);
       setLoadTypes(false);
       
     })
     .catch((error) => {
       console.log('Deu algum erro.');
       setLoadTypes(false);
     })
   }
   loadTypes();
  }, []);

async function excluirPokemon(pokemons : any){

  await firebase.firestore().collection('pokes').doc(pokemons.id)
  .delete()
  .then(()=>{
    closeModal();
  })

  await firebase.storage().ref(`images/${pokemons.id}/${imagePoke.name}`)
  .delete();
}

async function handleSave(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if(nome !== ''){
    await firebase.firestore().collection('pokes')
    .doc(pokemons.id)
    .update({
      nome: nome
    })
    .then(()=>{
      alert('Nome alterado!')
      closeModal();
      setEditarNome(false)
      setNome('');
    })
  }
}

useEffect(() => {
  document.body.style.overflowY = 'hidden';
  
return () =>{
  document.body.style.overflowY = 'auto';
}
}, []);


  return(
    <>
    {isShowing && 
    <div className="overlay">
      <div className="modal-content">
      <div className="modal-container">
          <button onClick={closeModal}>X</button>
        </div>

        <div className="overview-container">
              <>
              <div className="fotoFundo">
              <div className="fundoFoto">
                <label className="label-avatar">
                  <img src={pokemons.fotoUrl} alt="foto do pokemon" />
                </label> 
              </div>
              </div>
              

              <div className="modal-container-2">
              <div className="div-title">
              <h2 className="info-title">{pokemons.nome}</h2> <button className="btn-lapis" onClick={()=> setEditarNome(true)}><img className="img-lapis" src={Lapis}/></button> 
              </div>
              {editarNome && 
              <form onSubmit={handleSave}>
              <input type="text" placeholder={pokemons.nome} value={nome} onChange={ (e) => setNome(e.target.value) } /><br/>
              <button className="btn-Ok" type="submit">Ok</button>
              <button className="btn-X" onClick={()=> setEditarNome(false)}>X</button>
              </form>
              }
              <br/>
              
              <div className="infos-div">
                <div className="label-infos">
                  <label className="info-label">HP</label>
                  <label className="info-label">ALTURA</label>
                  <label className="info-label">PESO</label>
                </div>
              <div className="h2-infos">
                <h2 className="info-title">{pokemons.hp}</h2>
                <h2 className="info-title">{pokemons.altura}</h2>
                <h2 className="info-title">{pokemons.peso}</h2>
              </div>
              
              </div>

              <div className="div-separacao">
                <sub className="sub">TIPO</sub>
              </div>
              <div className="div-imagem-tipo">
                {pokemons.tipo === 'planta' &&
                  <img className="img-tipo" src={Planta} />
                }
                {pokemons.tipo === 'eletrico' &&
                  <img className="img-tipo" src={Eletrico} />
                }
                {pokemons.tipo === 'fantasma' &&
                  <img className="img-tipo" src={Fantasma} />
                }
                {pokemons.tipo === 'fogo' &&
                  <img className="img-tipo" src={Fogo} />
                }
                </div>
              
              <div className="div-separacao">
                <sub className="sub">HABILIDADES</sub> <br/>
              </div>

              <div className="habilidades">
                <label className="info-label">{pokemons.habilidade1} </label>
                <label className="info-label">{pokemons.habilidade2} </label>
                <label className="info-label">{pokemons.habilidade3} </label>
                <label className="info-label">{pokemons.habilidade4}</label>
              </div>

              <div className="div-separacao">
                <sub className="sub">ESTATÍSTICAS</sub> <br/>
              </div>

              <div className="estatisticas">
                
                <div className="div-labels">
                <label className="info-label">DEFESA</label> 

                <label className="info-label">ATAQUE</label>

                <label className="info-label">DEFESA ESPECIAL</label>

                <label className="info-label">ALTURA ESPECIAL</label>

                <label className="info-label">VELOCIDADE</label>
                </div>

                <div className="div-subs">
                <sub className="sub">{pokemons.defesa}</sub>
                <sub className="sub">{pokemons.ataque}</sub>
                <sub className="sub">{pokemons.defesaEspecial}</sub>
                <sub className="sub">{pokemons.ataqueEspecial}</sub>
                <sub className="sub">{pokemons.velocidade}</sub>
                </div>
                
              </div>
              
      
              </div>

              <div className="btnCriar">
                <button onClick={ ()=> excluirPokemon(pokemons)}>LIBERAR POKEMON</button>
              </div>
              </>
          
        </div>
        </div>
      </div>
      }
      </>
  )
  

}

export default Modal;