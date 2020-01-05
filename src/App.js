import React, {Component} from 'react';
import './App.css';
import Calendar from 'react-calendar';
import './custom-style.css'
import TimePicker from './TimePicker'
import PersonPicker from './PersonPicker'
import ContactForm from './Form'
import helpers from './Helper';



const initialState =  {
  date: new Date(),
  person:1,
  hours:[],
  hour: 1,
  name: '',
  surname: '',
  phone: '',
  mail: '',
  text:'',
  hide: false,
  display: false
};

class App extends Component {
  
  state = initialState

  personChange = (e) => {
    this.setState({person: Number(e.target.value)});
  }
  hourChange = (e) => {
    this.setState({hour: Number(e.target.value)});
    e.target.style.backgroundColor = "blue"
  }
  onChange = date => {
    this.setState({ date })
  }
  handleChange=(e) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  messOK=()=>{
    this.setState({ display: false })
  }
  backToMainPage=()=> {
    this.setState(initialState)
  }

  checkAvailability = (date, person) => {
    date = this.state.date
    person = this.state.person

    const formatted_date = date.getFullYear() + "-" + helpers.appendLeadingZeroes((date.getMonth() + 1)) + "-" + helpers.appendLeadingZeroes(date.getDate())
    console.log(formatted_date, person)

    const reserv = {}
    reserv.date = formatted_date
    reserv.personCount = person
    console.log(reserv)

    fetch(process.env.GETRESERVATION_URL, {
      method: 'POST',
      headers: new Headers({
      'Access-Control-Allow-Origin':'*',
      "Content-Type": "application/json"
      }),
      body: JSON.stringify(reserv) 
      }).then(response => {return response.json()})
      .then(body => {this.setState({ hours: body.hours})})        
  }
  makeReservation = (date, person, hour) => {
    date = this.state.date
    person = this.state.person
    hour = this.state.hour

    const formatted_date = date.getFullYear() + "-" + helpers.appendLeadingZeroes((date.getMonth() + 1)) + "-" + helpers.appendLeadingZeroes(date.getDate())
    console.log(formatted_date, person)

    const reserv = {}
    reserv.date = formatted_date
    reserv.personCount = person
    reserv.hour = hour

    fetch(process.env.ADDRESERVATION_URL, {
      method: 'POST',
      headers: new Headers({
      'Access-Control-Allow-Origin':'*',
      "Content-Type": "application/json"
      }),
      body: JSON.stringify(reserv)
      })
      .then(response => {
        if (!response.ok) {
          response.json().then(body => {this.setState({ text:body.message, display:true}
          )
          });
        }
        else {this.setState({ hide: true })
          console.log(this.state.hide)}
      })      
  }

  render() {    
    return ( 
    <div className='main'>
      <h1 className="header">BOOK A TABLE</h1>
      <div className={"confirmation " + (!this.state.hide? "hidden":"")}>
        <h2>YOUR RESERVATION IS CONFIRMED</h2>
        <button onClick={this.backToMainPage}>RETURN</button>
      </div>
      <div className={"reservation " + (this.state.hide? "hidden":"")}>
        <div className="date-picker">
          <h2>DATE SELECTION</h2>
          <Calendar
          onChange={this.onChange}
          value={this.state.date}/>       
        </div>
        <div className="contain">         
          <div className="person-picker">
            <h2>PERSON SELECTION</h2>
            <PersonPicker event={this.personChange} value={this.state.person}/>
          </div>
          <button className="availability" onClick={this.checkAvailability}>CHECK AVAILABILITY</button>
          <div className="time-picker">
            <h2>HOUR SELECTION</h2>
              <TimePicker hours={this.state.hours} click={this.hourChange}/> 
          </div>
        </div>
        <div className="form-picker">
          <h2>CONTACT FORM</h2>
            <ContactForm name={this.state.name} surname={this.state.surname} phone={this.state.phone} mail={this.state.mail} onChange={this.handleChange}/>
        </div>
      </div>
      <div className={"messWarning " + (!this.state.display? "hidden":"")}>
        <p>{this.state.text}</p>
        <button onClick={this.messOK}>OK</button>
      </div>
      <button onClick={this.makeReservation} className={"confirm " + (this.state.hide? "hidden":"")}>MAKE RESERVATION</button>
      {console.log(this.state)}  
    </div>      
    );    
  }  
}

export default App;
