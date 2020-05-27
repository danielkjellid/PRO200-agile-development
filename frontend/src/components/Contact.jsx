import React, {Component} from 'react';
// denne 
class Contact extends Component {
    constructor(props){
        super(props)
        this.state = {active: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState( prevState => {
			return {active: !prevState.active};
		});
    }

	

	render() {
		
			return (
				<div className="flex flex-row justify-between items-center px-5 py-4 border-b border-gray-300" >

                    <div className="flex flex-row">

                        {/* Contact picture */}
                        <div className="rounded-full bg-gray-400 w-10 10-8 mr-2">
                            {/* TODO: Add rounded img */}
                        </div>

        
                        <div>
                            {/* Contact name */}
                            <p class="text-black font-base">
                                {this.props.name} 
                            </p>
                            {/* Contact info */}
                            <p className="text-black text-gray-700" style={{fontSize: "10px"}}>
                                {this.props.phone} +47 1337 420 1738
                            </p>
                        </div>

                    </div>

                    {/* Checkbox */}
                    <div>
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