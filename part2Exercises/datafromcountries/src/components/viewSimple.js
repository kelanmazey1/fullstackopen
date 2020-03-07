import React from 'react'

const ViewSimple = (props) => {
    
    // if (props.results.length === 1) {
    //     return (
    //         <div>
    //             <h2>{props.country.name}</h2>
    //             <div>
    //                 <p>capital {props.country.capital}</p>
    //                 <p>population {props.country.population}</p>
    //             </div>
    //             <h3>languages</h3>
    //                 {props.country.languages.map(language =>
    //             <li key={language.isu639_1}>{language.name}</li>)}
    //         </div>
    //     )
    // }

    return (
        <div>{props.country.name}</div>
    )
    

    
    

}

export default ViewSimple


