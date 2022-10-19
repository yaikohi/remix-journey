import type { LoaderFunction } from "@remix-run/node"
import { Link, useOutletContext, useParams } from "@remix-run/react"

import { PokemonSpecsList } from "~/components/pokemon-specs-list"
import { BaseTag } from "~/components/styled-components/base-tags"
const StyledList = ({ children }: any) => (
    <ul className="flex flex-row my-4">{children}</ul>
)

const StyledListItem = ({ children }: any) => (
    <li className="text-xl hover:scale-105">{children}</li>
)
export default function PokemonTypeMetric() {
    const data = useOutletContext() as any
    const params = useParams()
    const pokemonTypeParam = params.pokemonType
    const metricParam = params.metric
    console.log(data.metrics[`${metricParam}`])
    console.log(data.metrics)

    const metrics = data.metrics[`${metricParam}`]
    const { hp, attack, defense, specialAttack, specialDefense, speed } =
        metrics

    return (
        <div className="col-span-2">
            <StyledList>
                <StyledListItem>
                    <BaseTag to={`/insights/${pokemonTypeParam}/max`}>
                        Max
                    </BaseTag>
                </StyledListItem>
                <StyledListItem>
                    <BaseTag to={`/insights/${pokemonTypeParam}/min`}>
                        Min
                    </BaseTag>
                </StyledListItem>
                <StyledListItem>
                    <BaseTag to={`/insights/${pokemonTypeParam}/average`}>
                        Average
                    </BaseTag>
                </StyledListItem>
            </StyledList>
            <div className="mx-4">
                <PokemonSpecsList
                    title={`${metricParam}`}
                    hp={hp}
                    attack={attack}
                    defense={defense}
                    specialAttack={specialAttack}
                    specialDefense={specialDefense}
                    speed={speed}
                />
            </div>
        </div>
    )
}
