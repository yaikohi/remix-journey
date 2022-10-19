import { Link } from "@remix-run/react"
import {
    GridContainer,
    GridElementBL,
    GridElementBR
} from "~/components/styled-components/grid-elements"
import { pokemonTypes } from "~/utils/pokemonTypeColorMap"
import {
    BaseSectionHeader,
    BaseSectionParagraphContainer
} from "~/components/styled-components/base-section"
import { BaseTag } from "~/components/styled-components/base-tags"

export default function InsightsIndexRoute() {
    // const data = useOutletContext() as any
    return (
        <>
            <GridContainer>
                <GridElementBL>
                    <div className="grid items-center max-w-lg grid-cols-3 text-center rounded-xl ">
                        {pokemonTypes.map((type, idx) => (
                            <BaseTag to={type} key={idx}>
                                {type}
                            </BaseTag>
                        ))}
                    </div>
                </GridElementBL>
                <GridElementBR>
                    <section className="ml-4">
                        <BaseSectionHeader>Insights per type</BaseSectionHeader>
                        <BaseSectionParagraphContainer>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Tempora nostrum aperiam at
                                rerum, labore recusandae id quaerat cum animi
                                corporis velit provident modi suscipit eius
                                explicabo quae illo eveniet odio?
                            </p>
                        </BaseSectionParagraphContainer>
                    </section>
                </GridElementBR>
            </GridContainer>
        </>
    )
}
