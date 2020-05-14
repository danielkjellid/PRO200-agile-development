import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from 'react-router-dom';



class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        };
    }

    notFound = () => {
        return(
            <H1>not found</H1>
        )
    }

    render() {
        return(

            <BrowserRouter>
                <div>
                    <HeaderBar></HeaderBar>
                    <Switch>
                        <Route exact path="/" 
                        render={props => <Home {...props}></Home>}>
                        </Route>
                        <Route exact path="/login" 
                        render={props => <Login {...props}></Login>}>
                        </Route>
                        <Route exact path="/signup" 
                        render={props => <SignUp {...props}></SignUp>}>
                        </Route>
                        <Route exact path="/userprofile" 
                        render={props => <UserProfile {...props}></UserProfile>}>
                        </Route>
                        <Route exact path="/userdetails" 
                        render={props => <UserDetails {...props}></UserDetails>}>
                        </Route>
                        <Route exact path="/tickets" 
                        render={props => <Tickets {...props}></Tickets>}>
                        </Route>
                        <Route component={this.notFound}>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(<App></App>, document.getElementById("root"));