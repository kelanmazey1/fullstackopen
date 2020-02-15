import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//Create components to be used in app
//Headers
const Headings = ({text}) => <h1>{text}</h1>

//Buttons
const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}
//Displays
const Display = ({ text, value }) => {
        return (
            <div>
                <p>{text} {value}</p>
            </div>
        )
    
}



const App = () => {
    //save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    //handlers for button clicks
    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(all + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    const percent = (good - bad)/all;
    const average = good/all;

   //Render buttons and states, account for NaN with percent and average
    return (
        <div>
            <Headings text='give feedback'/>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral'/>
            <Button onClick={handleBadClick} text='bad'/>
            <Headings text='statistics' />
            <Display text='good' value={good} />
            <Display text='neutral' value={neutral} />
            <Display text='bad' value={bad} />
            <Display text='all' value={all} />
            <Display text='average' value={isNaN(percent) ? 0 : (good - bad)/all} />
            <Display text='percentage' value={isNaN(average) ? '0 %' : (good/all)*100 + ' %'} />
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
