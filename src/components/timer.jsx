import React from 'react'
import './timer.css'


const Timer = (props) => {
    let seconds = '0'
    let minutes = '0'
    function minutesTimer() {
            if (seconds === 59) {
               setTimeout(()=> {
                minutes++
                
                if (minutes < 10) {
                    document.querySelector('.minutes').innerHTML = '0' + minutes + ':'
                } else {
                    document.querySelector('.minutes').innerHTML = minutes + ':'
                }
               }, 2000) 
            }
    }

    function secondsTimer() {
                if (seconds < 10 && props.hasWin === false) {
                    document.querySelector('.sec').innerHTML = '0' + seconds
                } else {
                    document.querySelector('.sec').innerHTML = seconds
                }
                    seconds++
                
                if (seconds === 60) {
                    seconds = 0
                }

                minutesTimer()
    }

    
    
    
    if (props.start) {
        let runningTime = () => setInterval(secondsTimer, 1000)
        runningTime()
    }

    
    return (
        <div className='timer'>
            <div className={`minutes ${props.hasWin ? 'removeItem' : ''} `}>00:</div>
            <div className={`sec ${props.hasWin ? 'removeItem' : ''}`}>     00</div>
            <div className={`minWin ${props.hasWin ? '' : 'removeItem'}`}>{props.minuteWin}</div>
            <div className={`secWin ${props.hasWin ? '' : 'removeItem'}`}>{props.secondWin}</div>
        </div>
    )
}

export default Timer