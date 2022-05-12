import {FormEvent, useContext, useEffect, useState} from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import cameraIcon from '../../../assets/camera-icon.png';
import { useModalCapture } from "../../../hooks/useModalCapture";
import ModalCapture from '../ModalCapture';

import firebase from "../../../services/firebaseConnection";

import '../style.css';


type ModalProps = {
  isShowingStats: boolean,
  closeModalStats: () => void
}

const ModalStats = ({ isShowingStats, closeModalStats }: ModalProps) => {

  const [ showModalCapture, viewModalCapture, closeModalCapture ] = useModalCapture();

  const [types, setTypes] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState(0);
  const [loadTypes, setLoadTypes] = useState(true);


  const { criarPokemon, handleUpload, pokemons, setPokemons ,uuid, setUuid, deletarPokemon, nome, setNome, hp, setHp, peso, setPeso, altura, setAltura, tipo, setTipo, habilidade1, setHabilidade1, habilidade2, setHabilidade2, habilidade3, setHabilidade3, habilidade4, setHabilidade4, defesa, setDefesa, ataque, setAtaque, defesaEspecial, setDefesaEspecial, ataqueEspecial, setAtaqueEspecial, velocidade, setVelocidade, fotoUrl, setFotoUrl,  imagePoke, setImagePoke, modalFechado } = useContext(PokemonContext);

  useEffect(()=> {
    closeModalStats();
  },[modalFechado]);

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

async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  
    if(nome !== '' && hp !== '' && peso !== '' && altura !=='' && tipo !== '' && habilidade1 !== '' && habilidade2 !== '' &&habilidade3 !== '' && habilidade4 !== '' && defesa !== '' && ataque !== '' && defesaEspecial !== '' && ataqueEspecial !== '' && velocidade !== '' && fotoUrl !== ''){
      viewModalCapture();
    }
}

function handleChangeTypes(e: FormEvent<HTMLSelectElement>) {
  console.log('INDEX SELECIONADO: ', e.currentTarget.value);
  console.log('Tipo selecionado: ', types[e.currentTarget.value]);
  setTypeSelected(e.currentTarget.value as any);
  setTipo(types[e.currentTarget.value].tipo);
}

function handleFile(e: FormEvent<HTMLInputElement>) {

  let image = e.currentTarget.files![0];

  if(image.type === 'image/jpeg' || image.type === 'image/png'){
    setImagePoke(image);
    setFotoUrl( URL.createObjectURL(e.currentTarget.files![0]) )
  }else{
    alert('Envie uma imagem do tipo PNG ou JPEG')
    setImagePoke(null);
    return null;
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
    {isShowingStats &&
    <div className="overlay">
      <div className="modal-content">
      <div className="modal-container">
          <button onClick={closeModalStats}>X</button>
        </div>

        <div className="overview-container">
        
        
        <form onSubmit={handleFormSubmit}>
        <div className="fotoFundo">
              <div className="fundoFoto">
                <label className="label-avatar">
                  
                  <input type="file" name="image" onChange={handleFile} />
                  
                  {fotoUrl === null ?
                    <img src={cameraIcon} alt="foto do pokemon" /> 
                    :
                    <img src={fotoUrl} alt="foto do pokemon" />
                    
                  }
                  
                  <span> + </span>

                </label>
              
              </div>
              </div>
            <div className="modal-container-2">
              <label>Nome</label>
              <input type="text" placeholder="Nome" value={nome} onChange={ (e) => setNome(e.target.value) } /><br/>
              <label>HP</label>
              <input type="number" placeholder="HP" value={hp} onChange={ (e) => setHp(e.target.value) } /><br/>
              <label>Peso</label>
              <input type="number" placeholder="Peso" value={peso} onChange={ (e) => setPeso(e.target.value) } /><br/> 
              <label>Altura</label>
              <input type="number" placeholder="Altura" value={altura} onChange={ (e) => setAltura(e.target.value) } /><br/> <br/>

              <sub>Tipo</sub>
              {loadTypes ? (
                <input type="text" disabled={true} value="Carregando tipos..." />
              ) : (
                <select value={typeSelected} onChange={handleChangeTypes}>
                {types.map((item : any, index : any) => {
                  return(
                    <option key={item.id} value={index}>
                      {item.tipo}
                    </option>
                  )
                })}
              </select>
              )}
             <br/> <br/>

              <sub>Habilidades</sub><br/>
              <input type="text" placeholder="Habilidade 1" value={habilidade1} onChange={ (e) => setHabilidade1(e.target.value) } />
              <input type="text" placeholder="Habilidade 2" value={habilidade2} onChange={ (e) => setHabilidade2(e.target.value) } />
              <input type="text" placeholder="Habilidade 3" value={habilidade3} onChange={ (e) => setHabilidade3(e.target.value) } />
              <input type="text" placeholder="Habilidade 4" value={habilidade4} onChange={ (e) => setHabilidade4(e.target.value) } /> <br/> <br/>
              
              <sub>Estatísticas</sub><br/>
              <label>Defesa</label>
              <input type="number" placeholder="00" value={defesa} onChange={ (e) => setDefesa(e.target.value) } />
              <label>Ataque</label>
              <input type="number" placeholder="00" value={ataque} onChange={ (e) => setAtaque(e.target.value) } />
              <label>Defesa Especial</label>
              <input type="number" placeholder="00" value={defesaEspecial} onChange={ (e) => setDefesaEspecial(e.target.value) } />
              <label>Ataque Especial</label>
              <input type="number" placeholder="00" value={ataqueEspecial} onChange={ (e) => setAtaqueEspecial(e.target.value) } />
              <label>Velocidade</label>
              <input type="number" placeholder="00" value={velocidade} onChange={ (e) => setVelocidade(e.target.value) } />

              <div className="btnCriar">
                <button type="submit">CRIAR POKEMON</button>
              </div>
            
            </div>
            <br/>
        </form>
        </div>
        </div>

        <ModalCapture isShowingCapture={showModalCapture} closeModalCapture={closeModalCapture} />
      </div>
      }
      </>
  )
}

export default ModalStats;

/*
import {FormEvent, useContext, useEffect, useState} from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import cameraIcon from '../../../assets/camera-icon.png';
import { useModalCapture } from "../../../hooks/useModalCapture";
import ModalCapture from '../ModalCapture';

import firebase from "../../../services/firebaseConnection";
import { v4 as createId } from 'uuid';

import '../style.css';


type ModalProps = {
  isShowingStats: boolean,
  closeModalStats: () => void
}

const ModalStats = ({ isShowingStats, closeModalStats }: ModalProps) => {

  const [ showModalCapture, viewModalCapture, closeModalCapture ] = useModalCapture();

  const [types, setTypes] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState(0);
  const [loadTypes, setLoadTypes] = useState(true);

  const {  nome, setNome, hp, setHp, peso, setPeso, altura, setAltura, tipo, setTipo, habilidade1, setHabilidade1, habilidade2, setHabilidade2, habilidade3, setHabilidade3, habilidade4, setHabilidade4, defesa, setDefesa, ataque, setAtaque, defesaEspecial, setDefesaEspecial, ataqueEspecial, setAtaqueEspecial, velocidade, setVelocidade, fotoUrl, setFotoUrl,  setImagePoke, criarPokemon,handleUpload, setUuid } = useContext(PokemonContext);

  useEffect(()=> {
  },[]);

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

async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if(nome !== '' && hp !== '' && peso !== '' && altura !=='' && tipo !== '' && habilidade1 !== '' && habilidade2 !== '' &&habilidade3 !== '' && habilidade4 !== '' && defesa !== '' && ataque !== '' && defesaEspecial !== '' && ataqueEspecial !== '' && velocidade !== '' && fotoUrl !== ''){
      await criarPokemon(nome, hp, peso, altura, tipo, habilidade1, habilidade2, habilidade3, habilidade4, defesa, ataque, defesaEspecial, ataqueEspecial, velocidade, fotoUrl);
      
      await handleUpload();
      
      setUuid(createId());
    }
}

function handleChangeTypes(e: FormEvent<HTMLSelectElement>) {
  console.log('INDEX SELECIONADO: ', e.currentTarget.value);
  console.log('Tipo selecionado: ', types[e.currentTarget.value]);
  setTypeSelected(e.currentTarget.value as any);
  setTipo(types[e.currentTarget.value].tipo);
}

function handleFile(e: FormEvent<HTMLInputElement>) {

  let image = e.currentTarget.files![0];

  if(image.type === 'image/jpeg' || image.type === 'image/png'){
    setImagePoke(image);
    setFotoUrl( URL.createObjectURL(e.currentTarget.files![0]) )
  }else{
    alert('Envie uma imagem do tipo PNG ou JPEG')
    setImagePoke(null);
    return null;
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
    {isShowingStats &&
    <div className="overlay">
      <div className="modal-content">
      <div className="modal-container">
          <button onClick={closeModalStats}>X</button>
        </div>

        <div className="overview-container">
        
        
        <form onSubmit={handleFormSubmit}>
        <div className="fotoFundo">
              <div className="fundoFoto">
                <label className="label-avatar">
                  
                  <input type="file" name="image" onChange={handleFile} />
                  
                  {fotoUrl === null ?
                    <img src={cameraIcon} alt="foto do pokemon" /> 
                    :
                    <img src={fotoUrl} alt="foto do pokemon" />
                  }
                  
                  <span> + </span>

                </label>
              
              </div>
              </div>
            <div className="modal-container-2">
              <label>Nome</label>
              <input type="text" placeholder="Nome" value={nome} onChange={ (e) => setNome(e.target.value) } /><br/>
              <label>HP</label>
              <input type="number" placeholder="HP" value={hp} onChange={ (e) => setHp(e.target.value) } /><br/>
              <label>Peso</label>
              <input type="number" placeholder="Peso" value={peso} onChange={ (e) => setPeso(e.target.value) } /><br/> 
              <label>Altura</label>
              <input type="number" placeholder="Altura" value={altura} onChange={ (e) => setAltura(e.target.value) } /><br/> <br/>

              <sub>Tipo</sub>
              {loadTypes ? (
                <input type="text" disabled={true} value="Carregando tipos..." />
              ) : (
                <select value={typeSelected} onChange={handleChangeTypes}>
                {types.map((item : any, index : any) => {
                  return(
                    <option key={item.id} value={index}>
                      {item.tipo}
                    </option>
                  )
                })}
              </select>
              )}
             <br/> <br/>

              <sub>Habilidades</sub><br/>
              <input type="text" placeholder="Habilidade 1" value={habilidade1} onChange={ (e) => setHabilidade1(e.target.value) } />
              <input type="text" placeholder="Habilidade 2" value={habilidade2} onChange={ (e) => setHabilidade2(e.target.value) } />
              <input type="text" placeholder="Habilidade 3" value={habilidade3} onChange={ (e) => setHabilidade3(e.target.value) } />
              <input type="text" placeholder="Habilidade 4" value={habilidade4} onChange={ (e) => setHabilidade4(e.target.value) } /> <br/> <br/>
              
              <sub>Estatísticas</sub><br/>
              <label>Defesa</label>
              <input type="number" placeholder="00" value={defesa} onChange={ (e) => setDefesa(e.target.value) } />
              <label>Ataque</label>
              <input type="number" placeholder="00" value={ataque} onChange={ (e) => setAtaque(e.target.value) } />
              <label>Defesa Especial</label>
              <input type="number" placeholder="00" value={defesaEspecial} onChange={ (e) => setDefesaEspecial(e.target.value) } />
              <label>Ataque Especial</label>
              <input type="number" placeholder="00" value={ataqueEspecial} onChange={ (e) => setAtaqueEspecial(e.target.value) } />
              <label>Velocidade</label>
              <input type="number" placeholder="00" value={velocidade} onChange={ (e) => setVelocidade(e.target.value) } />

              <div className="btnCriar">
                <button type="submit">CRIAR POKEMON</button>
              </div>
            
            </div>
            <br/>
        </form>
        </div>
        </div>

        <ModalCapture isShowingCapture={showModalCapture} closeModalCapture={closeModalCapture} />
      </div>
      }
      </>
  )
}

export default ModalStats;
*/