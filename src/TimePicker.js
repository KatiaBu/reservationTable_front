import React from 'react';

class TimePicker extends React.Component {
   
  render(){
    return(     
      <div className="hours-container" >{
            this.props.hours.map(hour => (
              <button className="hour-tile" onClick={this.props.click} key={hour.toString()} value={hour}>
                {hour}
              </button>
            ))
          }
            </div>
          )
        }
      }

export default TimePicker