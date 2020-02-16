import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [maxVote, setMaxVote] = useState({ value: 0, index: 0})

    
    //selecting a random number and choosing an item from the list
    const selectRandom = () => {
        const randomValue = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomValue)
    }


    //copying current votes adding 1 at the selected index. Check if votes higher than current max
    const handleVote = () => {
        let copyOfVotes = [...votes]
        copyOfVotes[selected] += 1
        setVotes(copyOfVotes)

        // Set new max if number is higher than current maximum votes
        if (copyOfVotes[selected] > maxVote['value']) {
            const newMax = {
                value: copyOfVotes[selected],
                index: selected
            }
            setMaxVote(newMax)
        }
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]} <br></br>has {votes[selected]} votes</p>
            <button onClick={() => handleVote()}>
                vote
            </button>   
            <button onClick={() => selectRandom()}>
                next anecdote
            </button>  
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[maxVote['index']]} <br></br> has {maxVote['value']} votes</p>           
        </div>
    )
}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));



