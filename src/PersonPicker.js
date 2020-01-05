import React from 'react';

function PersonPicker(props) {
    const amount = [1,2,3,4,5,6,7,8,9,10]
    //onChange={(e) => console.log(e.target.value)}
    return (
        <div className="person-container">
            <p>Guests number</p>
                <select onChange={props.event} value={props.value}>
                    {amount.map(person => (
                        <option className="person-tile" value={person} key={person.toString()} >
                            {person}
                        </option>
                    ))}
                </select>
        </div>
    );
  }
  
export default PersonPicker;