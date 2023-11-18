import { useState } from "react"

export default function Player ({initialName, symbol, isActive, onChangeName}) {

    const [playerName, setPlayerName] = useState(initialName);
    
    function handleChange(event) {
            setPlayerName(event.target.value);
    }

    let currentPlayerName = <span className='player-name'>{playerName}</span>;

    const [isEditing, setIsEditing] = useState(false);

    function handleEdit () {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    if (isEditing) {
        currentPlayerName = (
            <input type="text" required value={playerName} onChange={handleChange} />
        )
    }

    return(
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                 {currentPlayerName}   {/* arata numele playerului sau un input */}
              <span className='player-symbol'> {symbol} </span>
            </span>
            <button onClick={handleEdit}> {isEditing ? 'SAVE' : "EDIT"} </button>  {/* arata EDIT sau Save in functie de isEditing */}
        </li>
    )
}