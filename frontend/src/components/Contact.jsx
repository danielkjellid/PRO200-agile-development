import React, {Component} from 'react';

class Contact extends Component {

	testStyle = {
        backgroundColor: "grey",
        padding: "10px 25px",
      
    };
    
    nameStyle = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textverflow: "ellipsis",

    };

    valueStyle = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textverflow: "ellipsis",
        marginBottom: "5px"
    };

	render() {
		
			return (
				<div style={this.testStyle}>

                    <div style={{backgroundColor: "red", width: "35px", height: "35px", borderRadius: "50%"}}>
                        {/* TODO: Add rounded img */}
                    </div>

                    <div>
                    <p style={this.nameStyle}>
                        Navn Navnesen
                    </p>
                    <p style={this.valueStyle}>
                        +47 490 92 421
                    </p>
                    </div>

                    <div>
                        <input type="checkbox"></input>
                    </div>

                </div>
            )
	}
}

export default Contact;