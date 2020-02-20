import React from 'react'

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
        <div key={course.id}>
            <Header course={course['name']} />
            <Content parts={course['parts']} />
            <Total parts={course['parts']} />
        </div>
    )
}


export default Course;