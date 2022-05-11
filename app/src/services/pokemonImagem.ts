
import { Imagem } from '../types/Imagem';
import { Pokemon } from '../types/Pokemon';

import firebase from './firebaseConnection';

import { v4 as createId } from 'uuid';
import { useContext, useEffect } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';


  const { pokemons, setPokemons, loading, setLoading, uuid, setUuid } = useContext(PokemonContext);

  useEffect(() => {
    function loadStorage(){
      
      const storagePokemon = localStorage.getItem('SistemaPokemon')
      
      if(storagePokemon){
        setPokemons(JSON.parse(storagePokemon));
        setLoading(false);
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  export async function criarPokemon(nome: string,
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
    velocidade: number) {
    await firebase.auth().signInAnonymously()
    .then( async (value)=> {
      setUuid(createId());
      await firebase.firestore().collection('pokes')
      .doc(uuid as string).set({
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
        fotoUrl: null
      })
      .then( () => {
        let data = {
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
          fotoUrl: null
        };

        setPokemons(data);
        storagePokemon(data);

      })
      .catch((error)=> {
        console.log('oiiii');
      })
    })
  }

  function storagePokemon(data: any){
    localStorage.setItem('SistemaPokemon', JSON.stringify(data));
  }



// Imagens
/*
export const getAll = async () => {
  let list: Imagem[] = [];

  const imagesFolder = ref(storage, "images");
  const photoList = await listAll(imagesFolder);

  for(let i in photoList.items){
    let photoUrl = await getDownloadURL(photoList.items[i]);

    list.push({
      name: photoList.items[i].name,
      url: photoUrl
    });
  }

  return list;
}

// Firestore
  // Pegas os dados do firestore
  export const getPokemons = async () => {
    let pokes: Pokemon[] = [];

    const data = await getDocs(pokemonCollection);
    let pokemonsProfile = await (data.docs.map((doc) => ({ ...doc.data(), id: pokes[1]})))
    
  }

  export const insertPokemon = async (file: File) =>{
    
  }

export const insert = async (file: File) => {
  if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){

    let randomName = createId();

    let newFile = ref(storage, `images/${randomName}`)

    let upload = await uploadBytes(newFile, file);
    let photoUrl = await getDownloadURL(upload.ref);

    return {
      name: upload.ref.name,
      url: photoUrl
    } as Imagem;

  } else {
    return new Error('Tipo de arquivo não permitido!')
  }
}


*/