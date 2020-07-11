import React, {useState, useEffect} from 'react';
import './App.css';
import Timer from './components/timer'
import StartGame from './components/startButton'
import WinnerInfo from './components/WinnerInfo'


function App() {

  const [canvas, setCanvas] = useState(null)
  const [gameStart, setGameStart] = useState(false)
  const [win, setWin] = useState(false)


  useEffect(() => {
    setCanvas(document.querySelector('.canvas'))
  }, [])



  if (canvas !== null) {
    const img = new Image();   // Create new img element
    img.addEventListener('load', () => {
      canvas.width = img.width
      canvas.height = img.height
      const context = canvas.getContext('2d')
      context.drawImage(img, 0, 0)
    }, false);
    img.src = 'wheres-waldo.jpg'; // Set source path
  }

  const canvasDraw = (posX, posY) => {
    const context = canvas.getContext('2d')
    context.beginPath();
    context.arc(posX, posY, 5, 0, 2 * Math.PI);
    context.lineWidth=3;
    context.strokeStyle = 'red'
    context.stroke()
  }

  let newCount = 0

  const mouseClick = (e) => {
    newCount++
    document.querySelector('.clickNum').innerHTML = 'Erros: ' + newCount
    const rect = canvas.getBoundingClientRect()
    let xPos = e.clientX - rect.left
    let yPos = e.clientY - rect.top
    if (xPos > 505 && xPos < 549 && yPos > 544 && yPos < 627) {
      console.log('Você ganhou!')
      
      setGameStart(false)
      document.querySelector('.clickNum').innerHTML = 'Você venceu depois de ' + newCount + ' tentativas'
      setWin(true)
    }
     canvasDraw(xPos, yPos)
   // console.log('eixo X: ' + xPos,'eixo Y: ' + yPos) LOGS POSITION CLICKED
  }




  const start = () => {
    setGameStart(true)
    console.log('Cliquei no inicio')
  }


  const Start = () => {
    return (
      <StartGame
        start={start}
        started={gameStart}
      />
    )
  }



  function startChecker (e) {
    if (gameStart) {
      mouseClick(e)
    }
  }

  let currentSec
  let currentMin

  if (win) {
    currentSec = document.querySelector('.sec').innerText
    currentMin = document.querySelector('.minutes').innerText
    console.log(currentMin, currentSec)
}




  const StartTimer = () => {

      return (
        <Timer
          hasWin={win}
          start={gameStart}
          minuteWin={currentMin}
          secondWin={currentSec}
        />
      )
  }

  const finalTime = currentMin + currentSec

  const RenderForm = () => {
    if (win) {
      const errorCount = document.querySelector('.clickNum').innerHTML
      let errorNum = errorCount.replace(/\D/g,'')
      return (
        <WinnerInfo 
          misses={errorNum}
          time={finalTime }
        />
      )
    } else {
      return null
    }
  }





  return (
    <div className="App disable-select">
      <header className="App-header disable-select"> 
        <StartTimer/>
        <div>Ajude a encontrar o Waldo</div>
        <div className='clickNum'></div>        
      </header>
      {/*   <div className={`App-body disable-select ${win ? 'hideItem' : ''}`}>     Linha original, usando a de baixo só para desenvolvimento       */}  
      <RenderForm/>
      <div className={`App-body disable-select ${win ? 'hideItem ' : ''}`}>
        
          <div div='content disable-select'>
          <div className='info-bar disable-select'>
            <img className='waldo' alt='waldo' src='waldo.png'></img>
            <Start/>
            <p className='waldoDesc'>Waldo se perdeu durante sua ida a praia, ajude a encontrá-lo clicando na imagem. Você tem dois minutos!</p>
            <canvas onClick={startChecker} className={`canvas ${gameStart ? 'removeCanvasBlur' : 'addCanvasBlur'}`}> 
            </canvas>
          </div>
          </div>
      </div>
    </div>
  );
}

export default App;
