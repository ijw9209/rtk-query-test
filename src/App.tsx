import React, {useState} from 'react';
import { useGetPokemonByNameQuery } from './service/pokemon';

const pokemon = ['bulbasaur', 'pikachu', 'ditto', 'bulbasaur'];

function App() {

  const [pollingInterval, setPollingInterval] = useState(0)
 
  return (
    <div className="App">
    <select
      onChange={(change) => setPollingInterval(Number(change.target.value))}
    >
      <option value={0}>Off</option>
      <option value={1000}>1s</option>
      <option value={5000}>5s</option>
    </select>
    <div>
      {pokemon.map((poke, index) => (
        <Pokemon key={index} name={poke} pollingInterval={pollingInterval} />
      ))}
    </div>
  </div>
  );
}

export default App;




export const Pokemon = ({
  name,
  pollingInterval,
}: {
  name: string
  pollingInterval: number
}) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(
    name,
    {
      pollingInterval,
    }
  )

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isFetching ? '...' : ''}
          </h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </>
  )
}
