export async function getAllBerries() {
  const res = await fetch("https://pokeapi.co/api/v2/berry?limit=64&offset=0");
  const data = await res.json();
  const berries = data.results;

  return {
    berries,
  };
}

export async function getBerryByName(name: string | undefined) {
    const res = await fetch(`https://pokeapi.co/api/v2/berry/${name}`)
    const berry = await res.json()

    return {
        berry
    }
}