import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    return (    
        <div>
            <h1>{props.course}</h1>
        </div>
    )}



const Content = (props) => {
    return (
    <ul>
        {props.parts.map(part => 
            <li key={part.id}>
                {part.name} {part.exercises}
            </li>)}        
    </ul>
)}

const Total = (props) => {

    let totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0)

    return (
        <div>
            Number of exercises {totalExercises}
        </div>
    )
}

const Course = (props) => {
    const { course } = props

    return (
        <div>
            <Header course={course['name']} />
            <Content parts={course['parts']} />
            <Total parts={course['parts']} />
        </div>
    )
}

const App = () => {

    const course =  {
        name: 'Half Stack application development',
        parts : [
        {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
        },   
        {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
        }
        ,    
        {
            name: 'State of a component',
            exercises: 14,
            id: 3
        }    
    
        ]
    }
    return (
        <div>
            <Course course={course}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

