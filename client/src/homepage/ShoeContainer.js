import React from 'react';

export default function ShoeContainer(props) {
    return (    
        <div className="shoe-container">
            <img className="shoe-image" src={require("./fotu/shoe1.png")} />          
            <p style={{textAlign:"center"}}>{props.shoename}</p>
        </div>
    );
}
