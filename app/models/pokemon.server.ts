import type { Pokemon } from "types/pokemon";
import type { PokemonEvolutionChain } from "types/pokemonEvolutionChain";

/**
 * Fetches all the pokemons given the url's parameters.
 *
 * @returns An array of all pokemons with name and url.
 */
export async function getAllPokemons() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const data = await res.json();

  return data.results;
}

/**
 * Returns the Pokemon object given the desired pokemon's name.
 *
 * @param name
 * @returns Pokemon
 */
export async function getPokemonByName(name: string | undefined) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon: Pokemon = await res.json();

  return pokemon;
}

/**
 * Fetches the url from a pokemon that links to the evolution chain of that pokemon's species.
 *
 * @param url
 * @returns string
 */
async function getPokemonEvolutionChainUrl(url: Pokemon["species"]["url"]) {
  const res = await fetch(url);
  const data = await res.json();

  return data.evolution_chain.url;
}

/**
 * Fetches the evolution_chain (EvolutionChain) of a pokemon given the `pokemon.species.url`.
 *
 * @param url
 * @returns EvolutionChain
 */
export async function getPokemonEvolutionChain(url: Pokemon["species"]["url"]) {
  const URL = await getPokemonEvolutionChainUrl(url);
  const res = await fetch(URL);
  const evolutionChain: PokemonEvolutionChain = await res.json();

  return evolutionChain;
}

/**
 *  Fetches the second and third (if exists) evolution of a pokemon.
 *
 * @param url
 * @returns { second: Pokemon | null, third: Pokemon | null}
 */
export async function getNextEvolutions(url: Pokemon["species"]["url"]) {
  const evolutionChain = await getPokemonEvolutionChain(url);

  // If the pokemon has no evolutions, return null
  if (evolutionChain.chain.evolves_to.length === 0) {
    return { second: null, third: null };
  }

  const secondEvolutionName = evolutionChain.chain.evolves_to[0].species.name;
  const secondEvolutionPokemon = await getPokemonByName(secondEvolutionName);

  if (evolutionChain.chain.evolves_to[0].evolves_to[0].species.name) {
    const thirdEvolutionName =
      evolutionChain.chain.evolves_to[0].evolves_to[0].species.name;
    const thirdEvolutionPokemon = await getPokemonByName(thirdEvolutionName);
    console.log({
      second: secondEvolutionPokemon,
      third: thirdEvolutionPokemon,
    });
    return { second: secondEvolutionPokemon, third: thirdEvolutionPokemon };
  }

  return { second: secondEvolutionPokemon, third: null };
}
