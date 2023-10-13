const randomColorForTwoPlayer = (idPlayer1: string, idPlayer2: string) => {
    if (Math.random() < 0.5) {
        return {
            idPlayer1: 'white',
            idPlayer2: 'black',
        }
    } else {
        return {
            idPlayer1: 'black',
            idPlayer2: 'white',
        }
    }
}
const formatArray = (arr: string[]) => {
    const result = []

    const countMap: any = {}

    for (const item of arr) {
        if (countMap[item]) {
            countMap[item]++
        } else {
            countMap[item] = 1
        }
    }

    for (const piece in countMap) {
        result.push({ piece: piece, quantity: countMap[piece] })
    }

    return result
}
