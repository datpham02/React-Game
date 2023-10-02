export default class Engine {
    stockfish: Worker
    onMessage: (callback: (bestMove: string) => void) => void

    constructor() {
        this.stockfish = new Worker('./stockfish.js')
        this.onMessage = (callback) => {
            this.stockfish.addEventListener('message', (e) => {
                const bestMove: string = e.data?.match(/bestmove\s+(\S+)/)?.[1]

                callback(bestMove)
            })
        }

        this.stockfish.postMessage('uci')
        this.stockfish.postMessage('isready')
    }

    evaluatePosition(fen: string, depth = 2) {
        if (depth > 24) depth = 24

        this.stockfish.postMessage(`position fen ${fen}`)
        this.stockfish.postMessage(`go depth ${depth}`)
    }

    stop() {
        this.stockfish.postMessage('stop')
    }
    quit() {
        this.stockfish.postMessage('quit')
    }
}
