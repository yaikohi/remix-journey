import type { FlavorNames} from "~/utils/berryFlavorColorMap";
import { getColorFromMap } from "~/utils/berryFlavorColorMap";

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
    name: FlavorNames;
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
        if (flavor.potency) {
          return (
            <span
              key={idx}
              className={`p-2 text-black mx-1 bg-ctp-${getColorFromMap(
                flavor.flavor.name
              )} shadow-md rounded-xl first:mx-0`}
            >
              {flavor.flavor.name}
            </span>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

const DataList = ({ children }: { children: any }) => {
  return (
    <dl className="grid min-h-full grid-cols-2 gap-2 px-6 py-4 capitalize bg-ctp-mantle rounded-b-xl">
      {children}
    </dl>
  );
};

const DataItem = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => {
  return (
    <>
      <dt className="font-light text-ctp-subtext1">{title}</dt>
      <dd className="text-ctp-text">{`${content}`}</dd>
    </>
  );
};

export const BerryInfo = ({ berry }: BerryInfoProps) => {
  return (
    <div className="max-w-sm pt-6 mx-8 mb-8 shadow-md text-ctp-text w-80 bg-gradient-to-r from-ctp-blue via-ctp-red to-ctp-yellow rounded-xl hover:shadow-lg">
      <div className="min-w-full px-6 pt-4 pb-8 my-4 bg-opacity-40 rounded-xl bg-ctp-overlay0 ">
        <h3 className="py-2 text-4xl font-extrabold text-black capitalize max-w-min">
          {berry.name}
        </h3>
        <div className="px-1 pt-4">
          <FlavorTags flavors={berry.flavors} />
        </div>
      </div>

      <DataList>
        <DataItem title={"firmness"} content={berry.firmness.name} />
        <DataItem title={"size"} content={berry.size} />
        <DataItem title={"growth time"} content={berry.growth_time} />
        <DataItem
          title={"natural gift type"}
          content={berry.natural_gift_type.name}
        />
        <DataItem
          title={"natural gift power"}
          content={berry.natural_gift_power}
        />
        <DataItem title={"soil dryness"} content={berry.soil_dryness} />
      </DataList>
    </div>
  );
};
