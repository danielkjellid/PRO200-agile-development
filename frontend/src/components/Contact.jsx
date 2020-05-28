import React, {Component} from 'react';

class Contact extends Component {
  constructor(props){
      super(props)
      this.state = {active: false};

      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.checkIfTicketAssigned();
  }

  checkIfTicketAssigned = () => {
    if(this.props.state){
      this.setState({active: true})
    }
  }

  changeState = (truthy) => {
    if(truthy){
      this.setState({active: true})
    }
  }

  handleClick() {
      this.setState( prevState => {
    return {active: !prevState.active};
      });
      if(!this.state.active){
          console.log(this.props.id);
          this.props.addToActives(this.props.id);
      } else {
          this.props.removeFromActives(this.props.id);
      }
  }


	render() {
    
    return (
      <div className="flex flex-row justify-between items-center py-4 border-b border-gray-300" >
        <div className="flex flex-row ml-5">
          {/* Contact picture */}
          <div className="rounded-full bg-gray-400 w-10 h-10 mr-3">
              {/* TODO: Add rounded img */}
          </div>
          <div>
              {/* Contact name */}
              <p class="text-gray-900 text-base">
                  {this.props.name} 
              </p>
              {/* Contact info */}
              <p className="text-gray-700 text-sm">
                  +47 {this.props.phone} 
              </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="mr-5">
          <button onClick={this.handleClick} className="w-6 h-6 rounded-full p-0 border border-gray-400">
            {this.state.active
              ? <svg className="w-full h-full text-green-700" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"/></svg>
              : '' 
            }
          </button>
        </div>
      </div>
    )
	}
}

export default Contact;