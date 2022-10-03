type BerryInfoProps = {
  berry: Berry;
};
interface Berry {
  firmness: any;
  name: string;
  flavors: Flavors;
  growth_time: number;
  item: Item;
  max_harvest: number;
  natural_gift_power: number;
  natural_gift_type: NaturalGiftType;
  size: number;
  smoothness: number;
  soil_dryness: number;
}
type Flavor = {
  flavor: {
    name: string;
    url: string;
  };
  potency: number;
};
type Flavors = Flavor[];

type NaturalGiftType = {
  name: string;
  url: string;
};
type Item = NaturalGiftType;

type FlavorTagsProps = {
  flavors: Flavors;
};
export const FlavorTags = ({ flavors }: FlavorTagsProps) => {
  return (
    <>
      {flavors.map((flavor, idx) => {
        if (flavor.potency)
          return (
            <span
              key={idx}
              className="p-2 mx-1 text-white bg-blue-300 shadow-md rounded-xl first:mx-0"
            >
              {flavor.flavor.name}
            </span>
          );
      })}
    </>
  );
};

export const BerryInfo = ({ berry }: BerryInfoProps) => {
  return (
    <div className="max-w-sm pt-6 mx-8 mb-8 text-white shadow-md w-80 bg-gradient-to-r from-indigo-300 via-red-200 to-yellow-100 rounded-xl hover:shadow-lg">
      <div className="min-w-full px-6 pt-4 pb-12 my-4">
        <h3 className="py-2 text-4xl font-extrabold capitalize">
          {berry.name}
        </h3>
        <div className="px-1 pt-4">
          <FlavorTags flavors={berry.flavors} />
        </div>
      </div>

      <dl className="grid min-h-full grid-cols-2 gap-2 px-6 py-4 capitalize bg-white rounded-xl">
        <dt className="font-light text-slate-700">smoothness</dt>
        <dd className="text-black">{berry.smoothness}</dd>

        <dt className="font-light text-slate-700">Firmness</dt>
        <dd className="text-black">{berry.firmness.name}</dd>

        <dt className="font-light text-slate-700">size</dt>
        <dd className="text-black">{berry.size}</dd>

        <dt className="font-light text-slate-700">growth time</dt>
        <dd className="text-black">{berry.growth_time}</dd>

        <dt className="font-light text-slate-700">natural gift type</dt>
        {/* 
        TODO:
        - Add different color tag for every berry-type.
         */}
        <dd className="text-black">{berry.natural_gift_type.name}</dd>

        <dt className="font-light text-slate-700">natural gift power</dt>
        <dd className="text-black">{berry.natural_gift_power}</dd>

        <dt className="font-light text-slate-700">soil dryness</dt>
        <dd className="text-black">{berry.soil_dryness}</dd>
      </dl>
    </div>
  );
};
