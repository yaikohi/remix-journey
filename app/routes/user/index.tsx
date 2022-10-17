import { useOutletContext } from "@remix-run/react"

export default function UserOverview() {
    const { pokemon, user } = useOutletContext() as any
    console.log(pokemon)

    return (
        <div>
            <h2 className="text-xl">
                it's{" "}
                <span className="text-2xl italic text-ctp-peach">
                    {user.username}!
                </span>
            </h2>
            <p>what's up</p>
        </div>
    )
}
