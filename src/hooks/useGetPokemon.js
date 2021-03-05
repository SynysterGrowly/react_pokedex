import { useState, useEffect } from "react";
import { getPokemon } from "../api";

export const useGetPokemon = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState();
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (search) {
      GetPokemonFromInput();
    }
  }, [search]);

  const GetPokemonFromInput = async () => {
    const resp = await getPokemon({
      pokemonName: pokemon,
    });

    console.log(resp);

    setPokemonInfo(resp);
    setSearch(false);
  };

  return [pokemon, pokemonInfo, setPokemon, setSearch];
};
