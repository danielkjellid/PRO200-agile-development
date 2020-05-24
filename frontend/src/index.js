import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Tickets from "./Tickets";
import UserDetails from "./UserDetails";
import UserProfile from "./UserProfile";
import Navbar from "./components/navbar";
import Contact from "./components/Contact";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coverSite: false,
      loadUser: true,
      user: '',
      contactList: ''
    };
  }

    componentDidMount() {
    this.fetchUserInfo();
    this.fetchContactList();
  }

  fetchUserInfo = async () => { 
    try{
      const response = await fetch("https://localhost:5001/users");
      const payload = await response.json();
      this.setState({user: payload, loadUser: false})  
    } catch(err){console.log(err);}
  }

  fetchContactList = async () => {
    try{
      const response = await fetch("https://localhost:5001/contacts");
      const payload = await response.json();
      this.setState({contactList: payload})  
      console.log(payload);
    } catch(err){console.log(err);}
  }


  notFound = () => {
    return <h1>not found</h1>;
  };

  fadeBackground = () => {
    //this function make the faded background appear behind modals
    this.setState({ coverSite: true });
  };

  endTransaction = () => {
    //this function make the faded background disappear
    this.setState({ coverSite: false });
  };

  sendUser = () => {
    if(this.state.user){
      return this.state.user
    } else {
      return 'empty'
    }
  }

  searchContat = (id) => {
    if(this.state.contactList){
      let contact = this.state.contactList.find((item) => item.id===id)
      console.log(contact);
    } 
  }

  render() {
    console.log(this.state.contactList);
    return (
      <BrowserRouter>
        <div>
          <div className={this.state.coverSite ? "modalBack" : null}></div>
          <Navbar></Navbar>
          <div className="bg-gray-100 canvas">
            <div className="content">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <UserProfile
                      {...props}
                      fadeBackground={this.fadeBackground}
                      endTransaction={this.endTransaction}
                      user={this.state.user}
                    ></UserProfile>
                  )}
                ></Route>
                <Route
                  exact
                  path="/userdetails"
                  render={(props) => <UserDetails {...props}></UserDetails>}
                ></Route>
                <Route
                  exact path="/tickets"
                  render={(props) => 
                    <Tickets 
                    {...props}
                    searchContact={this.state.contactList}
                    ></Tickets>}
                ></Route>

                {/* For testing the component */}
                <Route
                  exact
                  path="/contact"
                  render={(props) => <Contact {...props}></Contact>}
                ></Route>

                <Route component={this.notFound}></Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App></App>, document.getElementById("root"));
