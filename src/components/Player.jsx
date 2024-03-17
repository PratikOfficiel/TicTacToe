import React, { useState } from 'react'

function Player({gname, symbol, isActive, onChangePlayer}) {

    const [buttonText,setButtonText] = useState("Edit");
    const [name,setName] = useState(gname);

    console.log(name);
    function handleClick() {

        if(buttonText==='Edit'){

            setButtonText('Save');
        }
        else {
            setButtonText('Edit');
            onChangePlayer(symbol, name);
        }

    }

  return (
    <li className={isActive?'active': undefined}>
    <span className="player">
        {buttonText==="Save"? <input type='text' value={name}  onChange={(e)=>setName(e.target.value)}/>
        :<span className="palyer-name">{name}</span>
        }
        <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleClick}>{buttonText}</button>
    </li>
  )
}

export default Player