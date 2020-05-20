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
    };
  }

  notFound = () => {
    return <h1>not found</h1>;
  };

  startTransaction = () => {
    //this function make the faded background appear behind modals
    this.setState({ coverSite: true });
  };

  endTransaction = () => {
    //this function make the faded background disappear
    this.setState({ coverSite: false });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className={this.state.coverSite ? "modalBack" : null}></div>
          <Navbar></Navbar>
          <div class="bg-gray-100 canvas">
            <div class="content">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <UserProfile
                      {...props}
                      startTransaction={this.startTransaction}
                      endTransaction={this.endTransaction}
                    ></UserProfile>
                  )}
                ></Route>
                <Route
                  exact
                  path="/userdetails"
                  render={(props) => <UserDetails {...props}></UserDetails>}
                ></Route>
                <Route
                  exact
                  path="/tickets"
                  render={(props) => <Tickets {...props}></Tickets>}
                ></Route>

                {/* For testing the component */}
                <Route
                  exact
                  path="/contact"
                  render={(props) => <Contact {...this.props}></Contact>}
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
