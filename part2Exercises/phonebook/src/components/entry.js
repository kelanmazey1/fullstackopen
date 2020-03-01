import  React from 'react'

const Entry = ( {person} ) => {
    return (
        <div>{person.name} {person.number}</div>
    )
}

export default Entry