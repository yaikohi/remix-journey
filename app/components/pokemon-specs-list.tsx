import { BaseHeader3 } from "./styled-components/base-headers"

const Container = ({ children }: any) => (
    <div className="max-w-md p-2">{children}</div>
)

const StyledDescriptionList = ({ children }: any) => (
    <dl className="grid grid-cols-2 mx-2 text-ctp-subtext0">{children}</dl>
)

const StyledDescriptionTitle = ({ children }: any) => (
    <dd className="font-bold">{children}</dd>
)

const StyledDescriptionDetails = ({ children }: any) => (
    <dd className="font-bold">{children}</dd>
)

type PokemonSpecsListProps = {
    title: string
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}
export const PokemonSpecsList = ({
    title,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed
}: PokemonSpecsListProps) => {
    return (
        <Container>
            <BaseHeader3 className="text-xl">{title}</BaseHeader3>
            <StyledDescriptionList>
                <StyledDescriptionTitle>hp:</StyledDescriptionTitle>
                <StyledDescriptionDetails>{hp}</StyledDescriptionDetails>
                <StyledDescriptionTitle>attack:</StyledDescriptionTitle>
                <StyledDescriptionDetails>{attack}</StyledDescriptionDetails>
                <StyledDescriptionTitle>defense:</StyledDescriptionTitle>
                <StyledDescriptionDetails>{defense}</StyledDescriptionDetails>
                <StyledDescriptionTitle>special attack:</StyledDescriptionTitle>
                <StyledDescriptionDetails>
                    {specialAttack}
                </StyledDescriptionDetails>
                <StyledDescriptionTitle>
                    special defense:
                </StyledDescriptionTitle>
                <StyledDescriptionDetails>
                    {specialDefense}
                </StyledDescriptionDetails>
                <StyledDescriptionTitle>speed:</StyledDescriptionTitle>
                <StyledDescriptionDetails>{speed}</StyledDescriptionDetails>
            </StyledDescriptionList>
        </Container>
    )
}
