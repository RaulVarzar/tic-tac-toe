export default function GameOver({winner, onRestart}) {
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner ? <p>{winner} won. Congratulations!</p> : <p>DRAW</p>}
            <p>
                <button onClick={onRestart}>Rematch</button>
            </p>
        </div>
    )
}