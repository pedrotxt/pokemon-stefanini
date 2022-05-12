import { PokemonContextProvider } from './contexts/PokemonContext';

import ImagemItem from './components/ImagemItem';
import Start from './components/Start';
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
