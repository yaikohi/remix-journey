export type PokemonEvolutionChain = {
  baby_trigger_item: null | any;
  chain: Chain;
  id: number;
};

export type Chain = {
  evolution_details: EvolutionDetails[] | any[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
};

export type EvolutionDetails = {
  [key: string]: any;
  gender?: null | any;
  held_item?: null | any;
  item?: null | any;
  known_move?: null | any;
  known_move_type?: null | any;
  location?: null | any;
  min_affection?: null | any;
  min_beauty?: null | any;
  min_happiness?: null | any;
  min_level?: number;
  needs_overworld_rain?: boolean;
  party_species?: null | any;
  party_type?: null | any;
  relative_physical_stats?: null | any;
  time_of_day?: string;
  trade_species?: null | any;
  trigger?: any;
  turn_upside_down?: boolean;
  length?: number;
};

export type Species = {
  name: string;
  url: string;
};
