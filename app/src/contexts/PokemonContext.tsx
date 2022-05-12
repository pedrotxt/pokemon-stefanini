import { useState, createContext, ReactNode, useEffect } from "react";
import firebase from '../services/firebaseConnection';
import { v4 as createId } from 'uuid';

import Camera from '../assets/camera-icon.png';
import { useModalStats } from "../hooks/useModalStats";
import { useModalCapture } from "../hooks/useModalCapture";

type PokemonContextProps = {
  children: ReactNode;
}

type PokemonContextType = {
  pokemons: any;
  setPokemons: (newState: any) => void;

  nome: string;
  setNome: (newState: string) => void;

  hp: string;
  setHp: (newState: string) => void;

  peso: string;
  setPeso: (newState: string) => void;

  altura: string;
  setAltura: (newState: string) => void;

  tipo: string;
  setTipo: (newState: string) => void;

  habilidade1: string;
  setHabilidade1: (newState: string) => void;

  habilidade2: string;
  setHabilidade2: (newState: string) => void;

  habilidade3: string;
  setHabilidade3: (newState: string) => void;

  habilidade4: string;
  setHabilidade4: (newState: string) => void;

  defesa: string,
  setDefesa: (newState: string) => void;

  ataque: string,
  setAtaque: (newState: string) => void;

  defesaEspecial: string,
  setDefesaEspecial: (newState: string) => void;

  ataqueEspecial: string,
  setAtaqueEspecial: (newState: string) => void;

  velocidade: string,
  setVelocidade: (newState: string) => void;

  fotoUrl: any,
  setFotoUrl: (newState: any) => void;
  imagePoke: any,
  setImagePoke: (newState: any) => void;

  loading: boolean;
  setLoading: (newState: boolean) => void;

  modalFechado: boolean;
  setModalFechado: (newState: boolean) => void;

  fotoEnviada: boolean,
  setFotoEnviada: (newState: boolean) => void;

  uuid: string;
  setUuid: (newState: string) => void;

  criarPokemon: any;
  handleUpload: any;
  deletarPokemon: any;
}

const initialValue = {
  pokemons: {},
  setPokemons: ()=> {},

  nome: '',
  setNome: ()=> {},

  hp: '',
  setHp: ()=> {},

  peso: '',
  setPeso: ()=> {},

  altura: '',
  setAltura: ()=> {},

  tipo: '',
  setTipo: ()=> {},

  habilidade1: '',
  setHabilidade1: ()=> {},

  habilidade2: '',
  setHabilidade2: ()=> {},

  habilidade3: '',
  setHabilidade3: ()=> {},

  habilidade4: '',
  setHabilidade4: ()=> {},

  defesa: '',
  setDefesa: ()=> {},

  ataque: '',
  setAtaque: ()=> {},

  defesaEspecial: '',
  setDefesaEspecial: ()=> {},

  ataqueEspecial: '',
  setAtaqueEspecial: ()=> {},

  velocidade: '',
  setVelocidade: ()=> {},

  fotoUrl: null,
  setFotoUrl: ()=> {},
  imagePoke: null,
  setImagePoke: ()=> {},

  loading: true,
  setLoading: ()=> {},

  modalFechado: false,
  setModalFechado: ()=> {},

  fotoEnviada: false,
  setFotoEnviada: ()=> {},

  uuid: '',
  setUuid: ()=> {},

  criarPokemon: {},
  handleUpload: {},
  deletarPokemon: {},
}

export const PokemonContext = createContext<PokemonContextType>(initialValue);

export const PokemonContextProvider = ({ children }: PokemonContextProps) =>{

  const [pokemons, setPokemons] = useState({});
  const [nome, setNome] = useState('');
  const [hp, setHp] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [tipo, setTipo] = useState('');
  const [habilidade1, setHabilidade1] = useState('');
  const [habilidade2, setHabilidade2] = useState('');
  const [habilidade3, setHabilidade3] = useState('');
  const [habilidade4, setHabilidade4] = useState('');
  const [defesa, setDefesa] = useState('');
  const [ataque, setAtaque] = useState('');
  const [defesaEspecial, setDefesaEspecial] = useState('');
  const [ataqueEspecial, setAtaqueEspecial] = useState('');
  const [velocidade, setVelocidade] = useState('');

  const [fotoUrl, setFotoUrl] = useState<any>(null);
  const [imagePoke, setImagePoke] = useState<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [fotoEnviada, setFotoEnviada] = useState(false);
  const [modalFechado, setModalFechado] = useState(false);

  const [uuid, setUuid] = useState('');

  useEffect(() => {
    function loadStorage(){
      
      const storagePokemon = localStorage.getItem('SistemaPokemon');
      
      if(storagePokemon){
        setPokemons(JSON.parse(storagePokemon));
        setLoading(false);
      }
      setLoading(false);
    }

    setUuid(createId());
    loadStorage();
  }, []);

  const [ showModalStats, viewModalStats, closeModalStats ] = useModalStats();
  const [ showModalCapture, viewModalCapture, closeModalCapture ] = useModalCapture();

  async function handleUpload() {
    const currentUid = uuid;
    setLoading(true);
    
      await firebase.storage()
      .ref(`images/${currentUid}/${imagePoke.name}`)
      .put(imagePoke)
      .then(async () => {
        console.log('FOTO ENVIADA COM SUCESSO');
        closeModalCapture();
        closeModalStats();
        
        setFotoEnviada(true);
        setLoading(false);
        await firebase.storage().ref(`images/${currentUid}`)
          .child(imagePoke.name).getDownloadURL()
          .then(async (url) => {
            let urlFoto = url;

            await firebase.firestore().collection('pokes')
              .doc(currentUid)
              .update({
                fotoUrl: urlFoto
              })
              .then(() => {
                let data = {
                  ...pokemons,
                  fotoUrl: urlFoto
                };
                setPokemons(data);
              })
          })
      })
  }

  async function criarPokemon(
    nome: string,
    hp: number,
    peso: number,
    altura: number,
    tipo: string,
    habilidade1: string,
    habilidade2: string,
    habilidade3: string,
    habilidade4: string,
    defesa: number,
    ataque: number,
    defesaEspecial: number,
    ataqueEspecial: number,
    velocidade: number)
    {
    await firebase.auth().signInAnonymously()
    .then( async (value)=> {
      //setUuid(createId());
      await firebase.firestore().collection('pokes')
      .doc(""+uuid).set({
        nome: nome,
        hp: hp,
        peso: peso,
        altura: altura,
        tipo: tipo,
        habilidade1: habilidade1,
        habilidade2: habilidade2,
        habilidade3: habilidade3,
        habilidade4: habilidade4,
        defesa: defesa,
        ataque: ataque,
        defesaEspecial: defesaEspecial,
        ataqueEspecial: ataqueEspecial,
        velocidade: velocidade,
        fotoUrl: null,
        created: new Date
      })
      .then( () => {
        let data: any[] = [{
          uid: uuid,
          nome: nome,
          hp: hp,
          peso: peso,
          altura: altura,
          tipo: tipo,
          habilidade1: habilidade1,
          habilidade2: habilidade2,
          habilidade3: habilidade3,
          habilidade4: habilidade4,
          defesa: defesa,
          ataque: ataque,
          defesaEspecial: defesaEspecial,
          ataqueEspecial: ataqueEspecial,
          velocidade: velocidade,
          fotoUrl: null,
          created: new Date
        }];
    
        setPokemons(data);
        storagePokemon({data, ...pokemons});
        setNome(''); setHp(''); setPeso(''); setAltura(''); setTipo(''); setHabilidade1(''); setHabilidade2(''); setHabilidade3(''); setHabilidade4(''); setDefesa(''); setAtaque(''); setDefesaEspecial(''); setAtaqueEspecial(''); setVelocidade(''); setFotoUrl(Camera);
      })
      .catch((error)=> {
        console.log(error);
      })
    })
  }

  async function deletarPokemon() {
    await firebase.firestore().doc(""+uuid).delete();

    setPokemons({});
    storagePokemon(null);
  }

  function storagePokemon(data: any){
    localStorage.setItem('SistemaPokemon', JSON.stringify(data));
  }
 
  return (
    <PokemonContext.Provider value={{ 
      pokemons, 
      setPokemons,

      loading,
      setLoading,

      modalFechado,
      setModalFechado,

      fotoEnviada,
      setFotoEnviada,

      uuid,
      setUuid,

      criarPokemon,
      handleUpload,
      deletarPokemon,
      

      nome,
      setNome,
      hp,
      setHp,
      peso,
      setPeso,
      altura,
      setAltura,
      tipo,
      setTipo,
      habilidade1,
      setHabilidade1,
      habilidade2,
      setHabilidade2,
      habilidade3,
      setHabilidade3,
      habilidade4,
      setHabilidade4,
      defesa,
      setDefesa,
      ataque,
      setAtaque,
      defesaEspecial,
      setDefesaEspecial,
      ataqueEspecial, 
      setAtaqueEspecial,
      velocidade,
      setVelocidade,
      fotoUrl,
      setFotoUrl,
      imagePoke,
      setImagePoke,
      }}>
      {children}
    </PokemonContext.Provider>
  )
}