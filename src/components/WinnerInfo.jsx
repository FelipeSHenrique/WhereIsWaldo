import React, {useState, useEffect} from 'react'
import './WinnerInfo.css'
import firebase from '../firebase'



function useWinners() {
    const [winner, setWinners] = useState([])

    useEffect(()=> {
        const unsubscribe = firebase
            .firestore()
            .collection('winners')
            .onSnapshot((snap) => {
                const newWinner = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                console.log(newWinner)
                setWinners(newWinner)
            })

            return () => unsubscribe()
    }, [])
    return winner
}


const WinnerInfo = (props) => {
    const [formName, setFormName] = useState('')

    let winners = new useWinners()

    const handleSubmit = (e) => {
        e.preventDefault()

        firebase
            .firestore()
            .collection('winners')
            .add({
                name: formName,
                tries: props.misses,
                time: props.time
            })
            .then(
                setFormName('')
            )



        console.log(formName)
        console.log('Formulário enviado')
    }
    
    const handleName = (e) => {
        setFormName(e.target.value)
    }

    return (
        <div className='container'>
            <div className='contentWin'>
                <h1>Você encontrou Waldo!</h1>
                <div>Seu tempo foi de: {props.time}</div>
                <br></br>
                <div>Você precisou de {props.misses} tentativas.</div>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fname">Informe seu nome para ser incluido na lista de vencedores.
                    <input onChange={handleName} type="text" id="fname" name="fname"></input>
                    </label>
                    <input type="submit" value="Salvar" />
                </form>
                <h2>Lista de vencedores</h2>
                
                <div className='winnerList'>
                    <div className='listHeader'>
                        <ul>
                        <li className='titleList'>
                                <div>
                                    Nome
                                </div>
                                <div>
                                   Tentativas
                                </div>
                               <div>
                                  Tempo
                               </div>
                            </li>
                        </ul>
                    </div>
                    <ol>
                        {winners.map((winner) => 
                            <li key={winner.id}>
                                <div>
                                    {winner.name}
                                </div>
                                <div>
                                   {winner.tries}
                                </div>
                                <div>
                                   {winner.time}
                                </div>
                            </li>
                        )}
                        
                    </ol>
                </div>
            </div>
        </div>
    )
}


export default WinnerInfo