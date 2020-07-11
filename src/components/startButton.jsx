import React from 'react'
import './startButton.css'


const StartGame = (props) => {


    return (
        <div className={`content ${props.started ? 'removeContent' : ''}`}> 
            <div className='contentStart'>
                
                <div onClick={props.start} 
                 className="wrap">
    <div className="circle">
    </div>
</div>
           
            </div>
        </div>

    )
}

export default StartGame