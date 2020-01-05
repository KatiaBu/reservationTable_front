import React from 'react';

class ContactForm extends React.Component {
  
    render() {
      return (
          <form className="form-container">
              <div className="form-item">
                  <p>Name:</p>                    
                  <input type="text" name='name' value={this.props.name} onChange={this.props.onChange} />                 
              </div>
              <div className="form-item">
                  <p>Surname:</p>                    
                  <input type="text" name='surname' value={this.props.surname} onChange={this.props.onChange} />
              </div>
              <div className="form-item">
                  <p>Phone number:</p>                    
                  <input type="text" name='phone' value={this.props.phone} onChange={this.props.onChange} />
              </div>
              <div className="form-item">
                  <p>E-mail:</p>                    
                  <input type="text" name='mail' value={this.props.mail} onChange={this.props.onChange} />
              </div>
          </form>
      );
    }
  }

  export default ContactForm