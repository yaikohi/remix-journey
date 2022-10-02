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
        if (flavor.potency) return (
          <span
            key={idx}
            className="p-2 bg-blue-300 shadow-md text-white rounded-xl mx-1 first:mx-0"
          >
            {flavor.flavor.name}
          </span>
        );
      })}
    </>
  );
};

export const BerryInfo = ({
  //   name,
  //   firmness,
  //   flavors,
  //   growth_time,
  //   max_harvest,
  //   natural_gift_power,
  //   size,
  //   smoothness,
  //   soil_dryness,
  berry,
}: BerryInfoProps) => {
  console.log(berry);

  return (
    <div className="bg-gradient-to-r from-indigo-300 via-red-200 to-yellow-100 text-white max-w-sm pt-6 rounded-xl mb-8 mx-8 shadow-md hover:shadow-lg">
      <div className="my-4  min-w-full px-6 pb-12 pt-4">
        <h3 className="text-4xl py-2 capitalize font-extrabold">
          {berry.name}
        </h3>
        <div className="pt-4 px-1">
          <FlavorTags flavors={berry.flavors} />
        </div>
      </div>

      <dl className="grid grid-cols-2 py-4 rounded-xl gap-2 capitalize px-6 bg-white min-h-full">
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
