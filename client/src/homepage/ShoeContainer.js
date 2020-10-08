import React from 'react';
import './home.css'

//use react-keyboard-event-handler for using arrow keys
export default function ShoeContainer(props) {
    const {shoe1,shoe2,leftClick,rightClick} = props;

    return (    
        <div className="holy-div" >
            <div className="shoe-container" onClick={leftClick}>
                <img className="shoe-image" src={shoe1.image_url}/>          
                <p style={{textAlign:"center"}}>{shoe1.name}</p>
            </div>
            <div className="shoe-container" onClick={rightClick}>
                <img className="shoe-image" src={shoe2.image_url} />          
                <p style={{textAlign:"center"}}>{shoe2.name}</p>
            </div>
        </div>
    );
}
