import React, { Component } from 'react';
import Contact from './components/Contact';
import {Link} from 'react-router-dom';
import AddNewContact from './components/AddNewContact';

class ContactList extends Component {
    state = { 
        contactList: '',
        addNewContact: false
     }

     componentDidMount(){
         this.fetchContactList();
     }

     fetchContactList = async () => {
        try{
          const response = await fetch("https://localhost:5001/contacts");
          const payload = await response.json();
          this.setState({contactList: payload})  
          console.log(payload);
        } catch(err){console.log(err);}
      }

      addNewContactToAPI = async () => {
        const url = 'https://localhost:5001/contacts';
		const payload = this.state.contactList[this.state.contactList.length-1];
        
        try{
                await fetch(url, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch (err) {
			console.log(err);
		}
      }

      addNewContactToState = (name,lastName,email,phone) => {
            let listBeforeUpdate = this.state.contactList;
            listBeforeUpdate.push({firstName: name, lastName: lastName, email: email,  phoneNumber: phone})
            this.setState({contactList: listBeforeUpdate})
            this.addNewContactToAPI();
            console.log(this.state.contactList);
      }

     renderNewContact = () => {
         let addNewContact = this.state.addNewContact;
         this.setState({addNewContact: !addNewContact})
     }

    render() {
         let inhold = this.state.contactList ? 
            <div>
                <h3>Kontakt Liste</h3>
                <Link to={'/'}>Tilbake</Link>
                <button onClick={this.renderNewContact}>Add ny kontakt</button>
                {this.state.contactList.map((item,index) => {
                    return(
                            <Contact
                                key={index}
                                id={item.id}
                                name={item.firstName}
                                phone={item.phoneNumber}
                            ></Contact>
                    )
                })}
            
                <div style={{display: this.state.addNewContact ? 'block' : 'none'}}>
                    <AddNewContact add={this.addNewContactToState}></AddNewContact>
                </div> 
            </div> : <div>is loading</div>
        return (
            <div>
                {inhold}

            </div>
           
        );
    }
}

export default ContactList;