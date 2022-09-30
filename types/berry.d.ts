export type Berry = {
  firmness: any[];
  flavors: Flavors;
  growth_time: number;
  id: number;
  item: Item;
  max_harvest: number;
  name: string;
  natural_gift_power: number;
  natural_gift_type: NaturalGiftType;
  size: number;
  smoothness: number;
  soil_dryness: number;
};

export type Flavor = {
  flavor: string;
  url: string;
};

export type Firmness = { name: string; url: string };

export type Flavors = {
//   any: Array<{ potency: number; flavor: Flavor }>;
  growth_time: number;
  id: number;
};

export type Item = { name: string; url: string };
export type NaturalGiftType = { name: string; url: string };
