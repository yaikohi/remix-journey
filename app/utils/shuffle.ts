/**
 * From https://stackoverflow.com/a/46545530
 * @param arr
 */
export function shuffleArray(arr: any[]): any[] {
    const shuffledArr = arr
        .map((val) => ({ val, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ val }) => val)
    return shuffledArr
}
