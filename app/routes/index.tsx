import { BaseHeader } from "~/components/styled-components/base-headers"
import { BaseSection, BaseSectionHeader, BaseSectionParagraphContainer } from "~/components/styled-components/base-section"
import {
    GridElementBL,
    GridElementBR,
    GridElementTR
} from "~/components/styled-components/grid-elements"


const TRSpacing = `ml-4`

export default function Index() {
    return (
        <>
            <GridElementTR>
                <BaseHeader css={TRSpacing}>Title of website</BaseHeader>
            </GridElementTR>
            <GridElementBR css={TRSpacing}>
                <BaseSection>
                    <BaseSectionHeader>
                        This is a header that tells the visitor what is
                        happening on this page and stuff
                    </BaseSectionHeader>
                    <BaseSectionParagraphContainer>
                        <p>
                            Honestly there is not much to do here. I guess I am
                            figuring out whether I should use this index page at
                            all since I cannot create outlets for the
                            `routes/index.tsx` file anyway(?).
                        </p>
                    </BaseSectionParagraphContainer>
                </BaseSection>
            </GridElementBR>
            <GridElementBL>
                Maybe put some nav here
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png"
                    alt=""
                />
                no, image, for ideation
            </GridElementBL>
        </>
    )
}
