import React, {Component} from 'react';
// denne 
class Contact extends Component {

	containerStyle = {
        backgroundColor: "grey",
        padding: "10px 25px",
      
    };
    
    nameStyle = {
        whiteSpace: "nowrap",
        overflow: "hidden",

        // Does not work..
        textverflow: "ellipsis",
    };

    contactInfoStyle = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        marginBottom: "5px",

        // Does not work..
        textverflow: "ellipsis"
       
    };

	render() {
		
			return (
				<div class="flex" style={this.containerStyle} >

                    {/* Contact picture */}
                    <div class="w-1/4 mx-4" style={{backgroundColor: "red", width: "35px", height: "35px", borderRadius: "50%"}}>
                        {/* TODO: Add rounded img */}
                    </div>

                   
                    <div class="w-1/2">
                        {/* Contact name */}
                        <p class="text-500 font-bold" style={this.nameStyle}>
                            Navn Navnesen asd asd asd 
                        </p>
                        {/* Contact info */}
                        <p class="text-black text-opacity-75" style={this.contactInfoStyle}>
                            +47 490 92 421
                        </p>
                    </div>

                    {/* Checkbox */}
                    <div class="w-1/4 pl-4 mt-4">
                        <input type="checkbox"></input>
                    </div>

                </div>
            )
	}
}

export default Contact;