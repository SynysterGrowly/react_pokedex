import React from "react";
import { useGetPokemon } from "../../hooks/useGetPokemon";
import style from "./style.sass";

export const Home = () => {
  const [pokemon, pokemonInfo, setPokemon, setSearch] = useGetPokemon();

  return (
    <>
      <input
        value={pokemon}
        onChange={(event) => setPokemon(event.target.value)}
        type='text'
        placeholder='Escribe el nombre del pokemonaqui'
        width='200px'
      />
      <br />
      {pokemonInfo ? (
        <img src={pokemonInfo.sprites.front_default} />
      ) : (
        "Elige un Pokemon"
      )}
      <br />
      <strong>Habilidades</strong>
      <br />
      <ul>
        {pokemonInfo ? (
          pokemonInfo.abilities.map((value, index) => {
            return <li key={`poke-${index}`}>{value.ability.name}</li>;
          })
        ) : (
          <li>Sin habilidades</li>
        )}
      </ul>
      <br />
      <button onClick={() => setSearch(true)}>Buscar</button>
    </>
  );
};
