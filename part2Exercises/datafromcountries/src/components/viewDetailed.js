import React from 'react'
// import Display from './display'


const ViewDetailed = (props) => {
    return (
            <div>
            <h2>{props.country.name}</h2>
            <div>
                <p>capital {props.country.capital}</p>
                <p>population {props.country.population}</p>
            </div>
            <h3>languages</h3>
            <div>
                {props.country.languages.map((language, index) =>
                    <li key={index}>{language.name}</li>)}
            </div>
            <div>
                <img src={props.country.flag} alt='Countries flag'/>
            </div>
                
        </div>
    )
    
}

export default ViewDetailed


