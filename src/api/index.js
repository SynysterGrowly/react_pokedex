import axios from "axios";
const URL = "https://pokeapi.co/api/v2/";

export const getPokemon = async ({ pokemonName }) => {
  try {
    const resp = await axios.get(`${URL}pokemon/${pokemonName}`);

    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
