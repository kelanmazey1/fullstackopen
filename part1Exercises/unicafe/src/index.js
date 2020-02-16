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
//Display statistics

const Statistics = ({ goodValue, badValue, neutralValue, allValue, averageValue, percentValue }) => {
    
    if (allValue === 0) {
        return (<p>No feedback given</p>)
    }
    
    return (
        <div>
            <p>good {goodValue}</p>
            <p>neutral {neutralValue}</p>
            <p>bad {badValue}</p>
            <p>all {allValue}</p>1
            <p>average {averageValue}</p>
            <p>percentage {percentValue}</p>
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
            <Statistics goodValue={good} badValue={bad} neutralValue={neutral} allValue={all}
                averageValue={isNaN(percent) ? 0 : (good - bad)/all} 
                percentValue={isNaN(average) ? '0 %' : (good/all)*100 + ' %'}
             />
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
