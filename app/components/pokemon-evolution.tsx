// take evolutiondata as a prop
// render component for pages

import { Link } from "@remix-run/react/dist/components";
import type { Pokemon } from "types/pokemon";

type PokemonEvolutionsProps = {
  evolutions: {
    second: null | Pokemon;
    third: null | Pokemon;
  };
};

const SpriteImage = (
  name: string,
  url: string
) => {
  return (
    <div className="p-2 m-2 rounded-md shadow-sm bg-ctp-overlay0 hover:bg-ctp-overlay1">
      <Link to={`/pokemon/${name}`}>
        <span>
          <h3>{name}</h3>
          <img src={url} alt={`${name}`} />
        </span>
      </Link>
    </div>
  );
};

// how to show evolution chain: https://github.com/PokeAPI/pokeapi/issues/337
export default function PokemonEvolutionChain({
  evolutions,
}: PokemonEvolutionsProps) {
  const second = evolutions.second;
  const third = evolutions.third;

  return (
    <>
      <h2 className="text-2xl bg-ctp-surface1">Evolution</h2>
      <div className="flex justify-center">
        {second && (
          <SpriteImage
          name={second?.name}
          url={second?.sprites?.front_default}
          />
        )}
        {third && (
          <div className="p-2 m-2 rounded-md shadow-sm bg-ctp-overlay0 hover:bg-ctp-overlay1">
            <Link to={`/pokemon/${third.name}`}>
              <span>
                <h3>{third?.name}</h3>
                <img src={third?.sprites.front_default} alt={`${third.name}`} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
