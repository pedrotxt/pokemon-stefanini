import {FormEvent, useContext} from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import Pokebola from '../../../assets/pokebola.png';
import Planta from '../../../assets/planta.png';
import Eletrico from '../../../assets/eletrico.png';
import Fantasma from '../../../assets/fantasma.png';
import Fogo from '../../../assets/fogo.png';

import { v4 as createId } from 'uuid';

import '../style.css';
import { useModalStats } from "../../../hooks/useModalStats";

type ModalProps = {
  isShowingCapture: boolean,
  closeModalCapture: () => void
}

const ModalCapture = ({ isShowingCapture, closeModalCapture }: ModalProps) => {

  const [ showModalStats, closeModalStats ] = useModalStats();

  const { criarPokemon, handleUpload, setUuid, nome, hp, peso, altura, tipo, habilidade1, habilidade2, habilidade3, habilidade4, defesa, ataque, defesaEspecial, ataqueEspecial, velocidade, fotoUrl, setModalFechado } = useContext(PokemonContext);

async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      closeModalStats();
      closeModalCapture();

      await criarPokemon(nome, hp, peso, altura, tipo, habilidade1, habilidade2, habilidade3, habilidade4, defesa, ataque, defesaEspecial, ataqueEspecial, velocidade, fotoUrl);
      
      await handleUpload();

      setModalFechado(true);

      setUuid(createId());
}

  return(
    <>
    {isShowingCapture &&
    <div className="overlay">
      <div className="modal-content">
      <div className="modal-container">
          <button onClick={closeModalCapture}>X</button>
        </div>

        <div className="overview-container">
        
        <form onSubmit={handleFormSubmit}>
        <div className="fotoFundo">
              <div className="fundoFoto">
                <label className="label-avatar">
                  <img src={fotoUrl} alt="foto do pokemon" />
                </label>
              </div>
              </div>

              <div className="modal-container-2">
              <h2 className="info-title">{nome}</h2>

              <br/>
              
              <div className="infos-div">
                <div className="label-infos">
                  <label className="info-label">HP</label>
                  <label className="info-label">ALTURA</label>
                  <label className="info-label">PESO</label>
                </div>
              <div className="h2-infos">
                <h2 className="info-title">{hp}</h2>
                <h2 className="info-title">{altura}</h2>
                <h2 className="info-title">{peso}</h2>
              </div>
              
              </div>

              <div className="div-separacao">
                <sub className="sub">TIPO</sub>
              </div>
              <div className="div-imagem-tipo">
                {tipo === 'planta' &&
                  <img className="img-tipo" src={Planta} />
                }
                {tipo === 'eletrico' &&
                  <img className="img-tipo" src={Eletrico} />
                }
                {tipo === 'fantasma' &&
                  <img className="img-tipo" src={Fantasma} />
                }
                {tipo === 'fogo' &&
                  <img className="img-tipo" src={Fogo} />
                }
                </div>
              
              <div className="div-separacao">
                <sub className="sub">HABILIDADES</sub> <br/>
              </div>

              <div className="habilidades">
                <label className="info-label">{habilidade1} </label>
                <label className="info-label">{habilidade2} </label>
                <label className="info-label">{habilidade3} </label>
                <label className="info-label">{habilidade4}</label>
              </div>
              </div>

              <div className="btnPokebola">
                <button type="submit" onClick={closeModalStats}>
                  <img className="pokebola" src={Pokebola}/>
                </button>
              </div>
            <br/>
        </form>
        </div>
        </div>

       
      </div>
      }  
      </>
  )
}

export default ModalCapture;