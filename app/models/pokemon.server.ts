export async function getAllPokemons() {
    const res = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    ).then((res) => res.json());
  
    return res.results;
  }

export async function getPokemonByName(name: string | undefined) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = await res.json()

    return {
        pokemon
    }
}