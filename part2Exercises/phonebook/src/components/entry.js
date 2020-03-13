import  React from 'react'

const Entry = ({person, deleteName}) => {
    return (
        <div>{person.name} {person.number} 
            <button onClick={deleteName}>delete</button>
        </div>
    )
}

export default Entry