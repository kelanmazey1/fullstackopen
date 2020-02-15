import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//Create components to be used in app
//Headers
const Headings = ({text}) => <h1>{text}</h1>

//Buttons
const Button = ({ onClick, text }) => {
    <button onClick={onClick}>
        {text}
    </button>
}
//Displays
const Display = ({ text, value }) => <p>{text} {value}</p>





const App = () => {
    //save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setNBad] = useState(0)

    return (
        <div>
            <Headings text='give feedback'/>
            <Button onClick={handleGoodClick} />
            <Button onClick={handleBadClick} />
            <Button onClick={handleNeutralClick} />
            <Headings text='statistics' />
            <Display text='good' value={good} />
            <Display text='good' value={good} />
            <Display text='good' value={good} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
