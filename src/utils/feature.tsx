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
