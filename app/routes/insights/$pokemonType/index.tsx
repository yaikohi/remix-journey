import { BaseTag } from "~/components/styled-components/base-tags"

const StyledList = ({ children }: any) => (
    <ul className="flex flex-col gap-4 pl-8">{children}</ul>
)

const StyledListItem = ({ children }: any) => (
    <li className="text-xl ">{children}</li>
)

export default function PokemonTypeStatOverview() {
    return (
        <div className="h-full max-h-full min-h-full col-span-2 ">
            <div className="h-full">
                <StyledList>
                    <StyledListItem>
                        <BaseTag to="max">Max</BaseTag>
                    </StyledListItem>
                    <StyledListItem>
                        <BaseTag to="min">Min</BaseTag>
                    </StyledListItem>
                    <StyledListItem>
                        <BaseTag to="average">Average</BaseTag>
                    </StyledListItem>
                </StyledList>
            </div>
        </div>
    )
}
