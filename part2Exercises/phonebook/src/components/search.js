import React from 'react'

const Search = (props) => {

    return (
    <div>
        filter shown with <input value={props.filter} onChange={props.handler}/>
    </div>)
}

export default Search