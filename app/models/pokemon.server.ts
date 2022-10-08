import type { Pokemon } from "types/pokemon";

export async function getAllPokemons() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const data = await res.json();
  console.log(data.results);

  return data.results;
}

export async function getPokemonByName(name: string | undefined) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon: Pokemon = await res.json();

  return {
    pokemon,
  };
}
