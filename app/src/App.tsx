import { PokemonContext, PokemonContextProvider } from './contexts/PokemonContext';

import Modal from './components/Modal';

import { useModal } from './hooks/useModal';
import ImagemItem from './components/ImagemItem';
import Start from './components/Start';
import { useContext, useEffect } from 'react';
import Ash from './components/Ash';

const App = () => {
  return (
     
      <PokemonContextProvider>
        <Start />
        <ImagemItem />
        <Ash />
      
      </PokemonContextProvider>
      
    )
}

export default App;
